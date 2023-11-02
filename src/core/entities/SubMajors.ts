import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Majors } from "./Majors";

@Entity("sub_majors", { schema: "capstone2-core" })
export class SubMajors {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "tuition" })
  tuition: number;

  @Column("float", { name: "cutoffPoint", precision: 12 })
  cutoffPoint: number;

  @Column("int", { name: "admissionCriteria" })
  admissionCriteria: number;

  @ManyToOne(() => Majors, (majors) => majors.subMajors, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "majorId", referencedColumnName: "id" }])
  major: Majors;
}
