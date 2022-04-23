import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCourseDto } from 'src/course/dto/CreateCourse.dto';
import { CreateLessonDto } from './dto/CreateLesson.dto';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {


    constructor(private readonly lessonService: LessonService){}

    @Get('all')
    getLessons(): Promise<Lesson[]> {
        return this.lessonService.findAllLessons()
    }

    @Get(':id')
    getLesson(@Param('id') id): Promise<Lesson> {
        return this.lessonService.getLesson(id)
    }

    @Post('create/:id')
    createLesson(@Body() lesson : CreateLessonDto, @Param('id') id): Promise<Lesson>{

        return this.lessonService.createLesson(lesson,id)
    }

}
