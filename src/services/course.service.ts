import { courseRepository, Course } from "@/repositories/course.repository";

export class CourseService {
  async getCourses() {
    try {
      return await courseRepository.getAllCourses();
    } catch (error) {
      console.error("Error fetching courses in CourseService:", error);
      throw error;
    }
  }
}

export const courseService = new CourseService();
