import { Column, Entity, ManyToMany } from "typeorm";
import { Majors } from "./Majors";

@Entity("member_schools", { schema: "capstone2-core" })
export class MemberSchools {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "link", length: 255 })
  link: string;

  @Column("tinyint", { name: "university", default: () => "'1'" })
  university: number;

  @Column("tinyint", { name: "afterUniversity", default: () => "'0'" })
  afterUniversity: number;

  @Column("text", { name: "thumbnail", nullable: true })
  thumbnail: string | null;

  @Column("text", { name: "logo", nullable: true })
  logo: string | null;

  @ManyToMany(() => Majors, (majors) => majors.memberSchools)
  majors: Majors[];
}
