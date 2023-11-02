import { Column, Entity } from "typeorm";

@Entity("modules", { schema: "capstone2-core" })
export class Modules {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "key", length: 20 })
  key: string;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @Column("varchar", { name: "path", nullable: true, length: 255 })
  path: string | null;

  @Column("text", { name: "icon", nullable: true })
  icon: string | null;
}
