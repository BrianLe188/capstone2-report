import { Column, Entity, ManyToMany } from "typeorm";
import { SubjectBlocks } from "./SubjectBlocks";

@Entity("subjects", { schema: "capstone2-core" })
export class Subjects {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @ManyToMany(() => SubjectBlocks, (subjectBlocks) => subjectBlocks.subjects)
  subjectBlocks: SubjectBlocks[];
}
