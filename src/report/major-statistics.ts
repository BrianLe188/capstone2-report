import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "major_statistics" })
export class MajorStatistic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  majorName: string;

  @Column({ type: "integer" })
  year: number;

  @Column({ type: "integer" })
  tuition: number;

  @Column({ type: "float" })
  cutoffPoint: number;

  @Column({ type: "integer" })
  admissionCriteria: number;

  @Column({ type: "integer" })
  numberOfApplicationsApplied: number;

  @Column({ type: "integer" })
  numberOfRejectedApplicationsApplied: number;

  @Column({ type: "integer" })
  numberOfAcceptedApplicationsApplied: number;

  @Column({ type: "float", default: 0 })
  acceptanceRate: number;

  @Column({ type: "text" })
  graduationRequirements: string;
}
