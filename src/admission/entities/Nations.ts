import { Column, Entity, OneToMany } from "typeorm";
import { Candidates } from "./Candidates";

@Entity("nations", { schema: "capstone2-admission" })
export class Nations {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => Candidates, (candidates) => candidates.nation)
  candidates: Candidates[];
}
