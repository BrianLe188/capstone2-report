import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rules" })
export class Rule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "text",
  })
  content: string;
}
