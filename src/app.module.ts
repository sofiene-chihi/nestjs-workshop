import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Course } from './course/course.entity';
import { CourseModule } from './course/course.module';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sofiene',
      database: 'nest_app',
      entities: [Course, Lesson,User],
      synchronize: true,
    }),
    CourseModule,
    LessonModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
