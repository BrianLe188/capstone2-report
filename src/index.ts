import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { AdmissionDB, CoreDB, ReportDB } from "./data-source";
import express from "express";
import { Majors } from "./core/entities/Majors";
import { ApplicationAdmissionRegistration } from "./admission/entities/ApplicationAdmissionRegistration";
import { SubMajors } from "./core/entities/SubMajors";
import { MajorStatistic } from "./report/major-statistics";
import { MoreThan } from "typeorm";
import { Rules } from "./core/entities/Rules";
import { Rule } from "./report/rules";
import { client } from "./mongodb";
import multer from "multer";
import xlsx from "xlsx";

const upload = multer();
const majorRepo = CoreDB.getRepository(Majors);
const subMajorRepo = CoreDB.getRepository(SubMajors);
const registrationRepo = AdmissionDB.getRepository(
  ApplicationAdmissionRegistration
);
const majorStatisticRepo = ReportDB.getRepository(MajorStatistic);
const ruleCoreRepo = CoreDB.getRepository(Rules);
const ruleReportRepo = ReportDB.getRepository(Rule);

async function main() {
  const app = express();
  const mongodb = client.db("capstone2-message");
  const QACollection = mongodb.collection("qa");

  CoreDB.initialize()
    .then(() => {
      console.log(`Core database available`);
    })
    .catch((error) => {
      console.log(error);
    });
  AdmissionDB.initialize()
    .then(() => {
      console.log(`Admission database available`);
    })
    .catch((error) => {
      console.log(error);
    });
  ReportDB.initialize()
    .then(() => {
      console.log(`Report database available`);
    })
    .catch((error) => {
      console.log(error);
    });

  app.get("/rules", async (req, res) => {
    try {
      const rules = await ruleReportRepo.find();
      if (rules) {
        res.status(200).json(rules);
      }
    } catch (error) {}
  });

  app.get("/statistics", async (req, res) => {
    try {
      const statistics = await majorStatisticRepo.find();
      if (statistics) {
        res.status(200).json(statistics);
      }
    } catch (error) {}
  });

  app.get("/status", async (req, res) => {
    const subMajors = await subMajorRepo.find();
    Promise.all(
      subMajors.map(async (sub) => {
        const registrations = await registrationRepo.find({
          where: {
            subMajorId: sub.id,
            total: MoreThan(sub.cutoffPoint),
          },
          order: {
            total: "DESC",
          },
          take: sub.admissionCriteria,
        });
        for (const reg of registrations) {
          reg.status = "confirm";
          registrationRepo.save(reg);
        }
      })
    );
    res.send(true);
  });

  app.get("/statistic-submajor", async (req, res) => {
    const subMajors = await subMajorRepo.find();
    Promise.all(
      subMajors.map(async (sub) => {
        const majorstatistic = new MajorStatistic();
        majorstatistic.year = 2022;
        majorstatistic.majorName = sub.name;
        majorstatistic.tuition = sub.tuition;
        majorstatistic.cutoffPoint = sub.cutoffPoint;
        majorstatistic.admissionCriteria = sub.admissionCriteria;
        const [applications, numberOfApplicationsApplied] =
          await registrationRepo.findAndCount({
            where: {
              subMajorId: sub.id,
            },
          });
        majorstatistic.numberOfApplicationsApplied =
          numberOfApplicationsApplied;
        majorstatistic.numberOfAcceptedApplicationsApplied =
          applications.filter((item) => item.status === "confirm").length;
        majorstatistic.numberOfRejectedApplicationsApplied =
          applications.filter((item) => item.status !== "confirm").length;
        majorstatistic.acceptanceRate =
          Number(
            majorstatistic.numberOfAcceptedApplicationsApplied /
              numberOfApplicationsApplied
          ) || 0;
        majorStatisticRepo.save(majorstatistic);
      })
    );
    res.send(true);
  });

  app.get("/update-submajor", async () => {
    const submajors = await subMajorRepo.find({
      relations: {
        certificates: true,
      },
    });
    Promise.all(
      submajors.map(async (item) => {
        const majorstatistic = await majorStatisticRepo.findOne({
          where: {
            majorName: item.name,
          },
        });
        if (majorstatistic && item.certificates?.length > 0) {
          majorstatistic.graduationRequirements = item.certificates.reduce(
            (prev, next, index) => {
              let result = prev + next.name;
              if (index !== item.certificates.length - 1) {
                result += " hoặc ";
              }
              return result;
            },
            ""
          );
          await majorStatisticRepo.save(majorstatistic);
        }
      })
    );
    return true;
  });

  app.get("/import-rule", async (req, res) => {
    const rules = await ruleCoreRepo.find();
    Promise.all(
      rules.map(async (rule) => {
        const _rule = new Rule();
        _rule.name = rule.name;
        _rule.content = rule.content;
        ruleReportRepo.save(_rule);
      })
    );
    res.send(true);
  });

  app.get("/qa", async (req, res) => {
    try {
      const qa = await QACollection.find().toArray();
      res.status(200).json(qa);
    } catch (error) {}
  });

  app.post("/import-qa", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      const workbook = xlsx.read(file?.buffer, { type: "buffer" });
      const worksheet = workbook.Sheets["Sheet1"];
      const data: { question: string; answer: string }[] =
        xlsx.utils.sheet_to_json(worksheet, { header: 0 });
      QACollection.insertMany(data);
      res.status(200).json("Done");
    } catch (error) {}
  });

  app.listen(1111, () => {});
}

main();
