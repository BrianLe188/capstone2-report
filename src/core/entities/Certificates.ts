import { Column, Entity, ManyToMany } from "typeorm";
import { SubMajors } from "./SubMajors";

@Entity("certificates", { schema: "capstone2-core" })
export class Certificates {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @ManyToMany(() => SubMajors, (subMajors) => subMajors.certificates)
  subMajors: SubMajors[];
}
