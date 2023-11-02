import { Column, Entity, OneToMany } from "typeorm";
import { Candidates } from "./Candidates";

@Entity("priorities", { schema: "capstone2-admission" })
export class Priorities {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => Candidates, (candidates) => candidates.priority)
  candidates: Candidates[];
}
