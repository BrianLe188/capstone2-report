import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ObjectAdmission } from "./ObjectAdmission";
import { Candidates } from "./Candidates";

@Entity("application_for_straight_admission_and_priority_consideration", {
  schema: "capstone2-admission",
})
export class ApplicationForStraightAdmissionAndPriorityConsideration {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("text", { name: "attachDocument", nullable: true })
  attachDocument: string | null;

  @Column("varchar", { name: "majorId", length: 255 })
  majorId: string;

  @Column("enum", {
    name: "status",
    enum: ["pending", "denied", "confirm"],
    default: () => "'pending'",
  })
  status: "pending" | "denied" | "confirm";

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

  @Column("varchar", { name: "subMajorId", length: 255 })
  subMajorId: string;

  @ManyToOne(
    () => ObjectAdmission,
    (objectAdmission) =>
      objectAdmission.applicationForStraightAdmissionAndPriorityConsiderations,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "objectAdmissionId", referencedColumnName: "id" }])
  objectAdmission: ObjectAdmission;

  @OneToOne(
    () => Candidates,
    (candidates) =>
      candidates.applicationForStraightAdmissionAndPriorityConsideration,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "candidateId", referencedColumnName: "id" }])
  candidate: Candidates;
}
