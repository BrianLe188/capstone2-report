import { Column, Entity, OneToMany } from "typeorm";
import { ApplicationForStraightAdmissionAndPriorityConsideration } from "./ApplicationForStraightAdmissionAndPriorityConsideration";

@Entity("object_admission", { schema: "capstone2-admission" })
export class ObjectAdmission {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(
    () => ApplicationForStraightAdmissionAndPriorityConsideration,
    (applicationForStraightAdmissionAndPriorityConsideration) =>
      applicationForStraightAdmissionAndPriorityConsideration.objectAdmission
  )
  applicationForStraightAdmissionAndPriorityConsiderations: ApplicationForStraightAdmissionAndPriorityConsideration[];
}
