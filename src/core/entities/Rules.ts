import { Column, Entity } from "typeorm";

@Entity("rules", { schema: "capstone2-core" })
export class Rules {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "content" })
  content: string;
}
