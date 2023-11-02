import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Candidates } from "./Candidates";

@Entity("application_for_admission_assessment_test_result", {
  schema: "capstone2-admission",
})
export class ApplicationForAdmissionAssessmentTestResult {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("enum", {
    name: "status",
    enum: ["pending", "denied", "confirm"],
    default: () => "'pending'",
  })
  status: "pending" | "denied" | "confirm";

  @Column("varchar", { name: "examRegistrationApplicationCode", length: 9 })
  examRegistrationApplicationCode: string;

  @Column("varchar", {
    name: "nameOfTheUniversityOrganizingTheExam",
    length: 255,
  })
  nameOfTheUniversityOrganizingTheExam: string;

  @Column("int", { name: "resultOfExam" })
  resultOfExam: number;

  @Column("text", { name: "attachPriorityDocument", nullable: true })
  attachPriorityDocument: string | null;

  @Column("text", { name: "attachOtherDocument", nullable: true })
  attachOtherDocument: string | null;

  @Column("timestamp", {
    name: "submitedAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  submitedAt: Date;

  @Column("timestamp", {
    name: "updatedAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @Column("varchar", { name: "majorId", length: 255 })
  majorId: string;

  @Column("varchar", { name: "subMajorId", length: 255 })
  subMajorId: string;

  @OneToOne(
    () => Candidates,
    (candidates) => candidates.applicationForAdmissionAssessmentTestResult,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "candidateId", referencedColumnName: "id" }])
  candidate: Candidates;
}
