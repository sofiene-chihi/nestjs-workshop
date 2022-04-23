import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/user/getUser.decorator';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/CreateCourse.dto';

@Controller('course')
export class CourseController {

    constructor(private readonly courseService : CourseService) {}

    @Get('all')
    findAll(): Promise<Course[]> {
        return this.courseService.findCourses()
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createCourse(@Body() course : CreateCourseDto, @GetUser() user) : Promise<Course>{
        return this.courseService.createCourse(course, user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCourseById(@GetUser() user) : Promise<Course> {
        return this.courseService.getCourse(user.id)
    }
}
