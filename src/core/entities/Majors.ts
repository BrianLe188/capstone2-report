import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { SubjectBlocks } from "./SubjectBlocks";
import { MemberSchools } from "./MemberSchools";
import { SubMajors } from "./SubMajors";

@Index("IDX_8b287db61b00b45e58c854f19d", ["code"], { unique: true })
@Entity("majors", { schema: "capstone2-core" })
export class Majors {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("enum", {
    name: "educationalLevel",
    enum: ["university", "after_university"],
    default: () => "'university'",
  })
  educationalLevel: "university" | "after_university";

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "code", unique: true, length: 255 })
  code: string;

  @ManyToMany(() => SubjectBlocks, (subjectBlocks) => subjectBlocks.majors)
  subjectBlocks: SubjectBlocks[];

  @ManyToMany(() => SubjectBlocks, (subjectBlocks) => subjectBlocks.majors2)
  @JoinTable({
    name: "majors_based_on_high_school_transcripts_subject_blocks",
    joinColumns: [{ name: "majorsId", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "subjectBlocksId", referencedColumnName: "id" },
    ],
    schema: "capstone2-core",
  })
  subjectBlocks2: SubjectBlocks[];

  @ManyToMany(() => MemberSchools, (memberSchools) => memberSchools.majors)
  @JoinTable({
    name: "majors_member_schools_member_schools",
    joinColumns: [{ name: "majorsId", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "memberSchoolsId", referencedColumnName: "id" },
    ],
    schema: "capstone2-core",
  })
  memberSchools: MemberSchools[];

  @OneToMany(() => SubMajors, (subMajors) => subMajors.major)
  subMajors: SubMajors[];
}
