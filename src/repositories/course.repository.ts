export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
}

export class CourseRepository {
  async getAllCourses(): Promise<Course[]> {
    const response = await fetch('https://api.codingthailand.com/api/course');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data.data;
  }
}

export const courseRepository = new CourseRepository();
