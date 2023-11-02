import { Column, Entity } from "typeorm";

@Entity("files", { schema: "capstone2-core" })
export class Files {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "path" })
  path: string;

  @Column("enum", {
    name: "extension",
    enum: ["docx", "pdf", "txt", "xlsx"],
    default: () => "'txt'",
  })
  extension: "docx" | "pdf" | "txt" | "xlsx";
}
