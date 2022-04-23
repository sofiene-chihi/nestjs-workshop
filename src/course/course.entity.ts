import { Lesson } from 'src/lesson/lesson.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @ManyToMany(() => User, (user) => user.courses)
  users: User[];

}
