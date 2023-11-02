import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Majors } from "./Majors";
import { Subjects } from "./Subjects";

@Entity("subject_blocks", { schema: "capstone2-core" })
export class SubjectBlocks {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 3 })
  name: string;

  @ManyToMany(() => Majors, (majors) => majors.subjectBlocks)
  @JoinTable({
    name: "majors_based_on_high_school_exam_results_subject_blocks",
    joinColumns: [{ name: "subjectBlocksId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "majorsId", referencedColumnName: "id" }],
    schema: "capstone2-core",
  })
  majors: Majors[];

  @ManyToMany(() => Majors, (majors) => majors.subjectBlocks2)
  majors2: Majors[];

  @ManyToMany(() => Subjects, (subjects) => subjects.subjectBlocks)
  @JoinTable({
    name: "subject_blocks_subjects_subjects",
    joinColumns: [{ name: "subjectBlocksId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "subjectsId", referencedColumnName: "id" }],
    schema: "capstone2-core",
  })
  subjects: Subjects[];
}
