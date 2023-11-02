import "reflect-metadata";
import { AdmissionDB, CoreDB, ReportDB } from "./data-source";
import express from "express";
import { Majors } from "./core/entities/Majors";
import { ApplicationAdmissionRegistration } from "./admission/entities/ApplicationAdmissionRegistration";
import { SubMajors } from "./core/entities/SubMajors";
import { MajorStatistic } from "./report/major-statistics";
import { MoreThan } from "typeorm";
import { Rules } from "./core/entities/Rules";
import { Rule } from "./report/Rules";

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
      console.log(`Admission database available`);
    })
    .catch((error) => {
      console.log(error);
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

  app.get("/", async (req, res) => {
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

  app.listen(1111, () => {});
}

main();
