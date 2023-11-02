import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Candidates } from "./Candidates";

@Entity("application_admission_registration", { schema: "capstone2-admission" })
export class ApplicationAdmissionRegistration {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "school", nullable: true, length: 255 })
  school: string | null;

  @Column("varchar", { name: "schoolCode", nullable: true, length: 255 })
  schoolCode: string | null;

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

  @Column("enum", {
    name: "status",
    enum: ["pending", "denied", "confirm"],
    default: () => "'pending'",
  })
  status: "pending" | "denied" | "confirm";

  @Column("varchar", { name: "majorId", length: 255 })
  majorId: string;

  @Column("double", { name: "subjectOneScore", precision: 22 })
  subjectOneScore: number;

  @Column("double", { name: "subjectTwoScore", precision: 22 })
  subjectTwoScore: number;

  @Column("double", { name: "subjectThreeScore", precision: 22 })
  subjectThreeScore: number;

  @Column("double", { name: "total", precision: 22 })
  total: number;

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
    (candidates) => candidates.applicationAdmissionRegistration,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "candidateId", referencedColumnName: "id" }])
  candidate: Candidates;
}
