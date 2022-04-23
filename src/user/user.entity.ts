import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNumber } from 'class-validator';
import { RoleEnum } from "./role.enum";
import { Course } from "src/course/course.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string

    @Column({unique : true, length: 8})
    @IsNumber()
    phone:string;

    @Column({unique: true})
    @IsEmail()
    email: string

    @Column()
    password: string;

    @Column({ type: 'enum', default: RoleEnum.USER, enum:RoleEnum})
    role: string;

    @ManyToMany(() => Course, (course) => course.users)
    @JoinTable()
    courses: Course[];

}