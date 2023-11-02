import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Candidates } from "./Candidates";

@Entity("application_for_admission_with_a_high_school_script", {
  schema: "capstone2-admission",
})
export class ApplicationForAdmissionWithAHighSchoolScript {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("enum", {
    name: "status",
    enum: ["pending", "denied", "confirm"],
    default: () => "'pending'",
  })
  status: "pending" | "denied" | "confirm";

  @Column("double", { name: "subjectOneScore", precision: 22 })
  subjectOneScore: number;

  @Column("double", { name: "subjectTwoScore", precision: 22 })
  subjectTwoScore: number;

  @Column("double", { name: "subjectThreeScore", precision: 22 })
  subjectThreeScore: number;

  @Column("double", { name: "total", precision: 22 })
  total: number;

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

  @Column("varchar", { name: "subjectOne", length: 255 })
  subjectOne: string;

  @Column("varchar", { name: "subjectTwo", length: 255 })
  subjectTwo: string;

  @Column("varchar", { name: "subjectThree", length: 255 })
  subjectThree: string;

  @Column("varchar", { name: "subMajorId", length: 255 })
  subMajorId: string;

  @OneToOne(
    () => Candidates,
    (candidates) => candidates.applicationForAdmissionWithAHighSchoolScript,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "candidateId", referencedColumnName: "id" }])
  candidate: Candidates;
}
