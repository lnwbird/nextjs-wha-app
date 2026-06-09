import FeaturesCourse from "@/components/features-course";
import { courseService } from "@/services/course.service";

// http://localhost:3000/course
export default async function CoursePage() {
  const courses = await courseService.getCourses();

  return (
    <main>
      {
        courses && courses.length > 0 && <FeaturesCourse courses={courses} />
      }
    </main>
  );
}