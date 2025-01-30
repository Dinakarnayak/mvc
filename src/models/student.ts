import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column()
  age: number;

  @Column({ name: "major" })
  major: string;

  @Column()
  gpa: number;

  @Column({ name: "date_of_birth" })
  dateOfBirth: Date;

  @Column()
  state: string;

  @Column({ name: "university_name" })
  universityName: string;

  @Column({ name: "date_enrolled" })
  dateEnrolled: Date;
}
