import { DataSource, DataSourceOptions } from "typeorm";
import { MemberSchools } from "./core/entities/MemberSchools";
import { Majors } from "./core/entities/Majors";
import { Subjects } from "./core/entities/Subjects";
import { SubjectBlocks } from "./core/entities/SubjectBlocks";
import { Files } from "./core/entities/Files";
import { SubMajors } from "./core/entities/SubMajors";
import { Modules } from "./core/entities/Modules";
import { Candidates } from "./admission/entities/Candidates";
import { Genders } from "./admission/entities/Genders";
import { ApplicationForAdmissionAssessmentTestResult } from "./admission/entities/ApplicationForAdmissionAssessmentTestResult";
import { ApplicationForAdmissionWithAHighSchoolScript } from "./admission/entities/ApplicationForAdmissionWithAHighSchoolScript";
import { ApplicationAdmissionRegistration } from "./admission/entities/ApplicationAdmissionRegistration";
import { ApplicationForStraightAdmissionAndPriorityConsideration } from "./admission/entities/ApplicationForStraightAdmissionAndPriorityConsideration";
import { Areas } from "./admission/entities/Areas";
import { Priorities } from "./admission/entities/Priorities";
import { Nations } from "./admission/entities/Nations";
import { ObjectAdmission } from "./admission/entities/ObjectAdmission";
import { MajorStatistic } from "./report/major-statistics";
import { Rules } from "./core/entities/Rules";
import { Rule } from "./report/Rules";

export const CoreDB = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "capstone2-core",
  synchronize: false,
  logging: false,
  entities: [
    Modules,
    MemberSchools,
    Majors,
    Subjects,
    SubjectBlocks,
    Files,
    SubMajors,
    Rules,
  ],
  subscribers: [],
  migrations: [],
} as DataSourceOptions);

export const AdmissionDB = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "capstone2-admission",
  synchronize: false,
  logging: false,
  entities: [
    Candidates,
    Genders,
    ApplicationForAdmissionAssessmentTestResult,
    ApplicationForAdmissionWithAHighSchoolScript,
    ApplicationAdmissionRegistration,
    ApplicationForStraightAdmissionAndPriorityConsideration,
    Areas,
    Priorities,
    Nations,
    ObjectAdmission,
  ],
  subscribers: [],
  migrations: [],
} as DataSourceOptions);

export const ReportDB = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "capstone2-report",
  synchronize: true,
  logging: false,
  entities: [MajorStatistic, Rule],
  subscribers: [],
  migrations: [],
} as DataSourceOptions);
