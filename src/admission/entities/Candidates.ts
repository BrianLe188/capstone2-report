import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { ApplicationAdmissionRegistration } from "./ApplicationAdmissionRegistration";
import { ApplicationForAdmissionAssessmentTestResult } from "./ApplicationForAdmissionAssessmentTestResult";
import { ApplicationForAdmissionWithAHighSchoolScript } from "./ApplicationForAdmissionWithAHighSchoolScript";
import { ApplicationForStraightAdmissionAndPriorityConsideration } from "./ApplicationForStraightAdmissionAndPriorityConsideration";
import { Nations } from "./Nations";
import { Areas } from "./Areas";
import { Genders } from "./Genders";
import { Priorities } from "./Priorities";

@Index("IDX_63bc42f4c0bc31ad914144ade0", ["cccd"], { unique: true })
@Index("IDX_c0de76a18c2a505ceb01674682", ["email"], { unique: true })
@Entity("candidates", { schema: "capstone2-admission" })
export class Candidates {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "fullName", length: 30 })
  fullName: string;

  @Column("text", { name: "avatar", nullable: true })
  avatar: string | null;

  @Column("date", { name: "birthday" })
  birthday: string;

  @Column("varchar", { name: "birthplace", nullable: true, length: 255 })
  birthplace: string | null;

  @Column("varchar", { name: "cccd", unique: true, length: 12 })
  cccd: string;

  @Column("text", { name: "highschoolAddress" })
  highschoolAddress: string;

  @Column("int", { name: "highschoolGraduateYear", nullable: true })
  highschoolGraduateYear: number | null;

  @Column("varchar", { name: "phonenumber", length: 10 })
  phonenumber: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", {
    name: "permanentResidence",
    nullable: true,
    length: 255,
  })
  permanentResidence: string | null;

  @Column("varchar", {
    name: "addressToReceiveAdmissionNotice",
    nullable: true,
    length: 255,
  })
  addressToReceiveAdmissionNotice: string | null;

  @OneToOne(
    () => ApplicationAdmissionRegistration,
    (applicationAdmissionRegistration) =>
      applicationAdmissionRegistration.candidate
  )
  applicationAdmissionRegistration: ApplicationAdmissionRegistration;

  @OneToOne(
    () => ApplicationForAdmissionAssessmentTestResult,
    (applicationForAdmissionAssessmentTestResult) =>
      applicationForAdmissionAssessmentTestResult.candidate
  )
  applicationForAdmissionAssessmentTestResult: ApplicationForAdmissionAssessmentTestResult;

  @OneToOne(
    () => ApplicationForAdmissionWithAHighSchoolScript,
    (applicationForAdmissionWithAHighSchoolScript) =>
      applicationForAdmissionWithAHighSchoolScript.candidate
  )
  applicationForAdmissionWithAHighSchoolScript: ApplicationForAdmissionWithAHighSchoolScript;

  @OneToOne(
    () => ApplicationForStraightAdmissionAndPriorityConsideration,
    (applicationForStraightAdmissionAndPriorityConsideration) =>
      applicationForStraightAdmissionAndPriorityConsideration.candidate
  )
  applicationForStraightAdmissionAndPriorityConsideration: ApplicationForStraightAdmissionAndPriorityConsideration;

  @ManyToOne(() => Nations, (nations) => nations.candidates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "nationId", referencedColumnName: "id" }])
  nation: Nations;

  @ManyToOne(() => Areas, (areas) => areas.candidates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "areaId", referencedColumnName: "id" }])
  area: Areas;

  @ManyToOne(() => Genders, (genders) => genders.candidates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "genderId", referencedColumnName: "id" }])
  gender: Genders;

  @ManyToOne(() => Priorities, (priorities) => priorities.candidates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "priorityId", referencedColumnName: "id" }])
  priority: Priorities;
}
