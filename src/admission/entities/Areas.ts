import { Column, Entity, OneToMany } from "typeorm";
import { Candidates } from "./Candidates";

@Entity("areas", { schema: "capstone2-admission" })
export class Areas {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Candidates, (candidates) => candidates.area)
  candidates: Candidates[];
}
