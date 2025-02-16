import { client } from '@/lib/sanity'
import CourseCard from './CourseCard'

async function getCourses() {
  const query = `*[_type == "course"] {
    _id,
    title,
    slug,
    description,
    "thumbnailUrl": thumbnail.asset->url,
    youtubePlaylistUrl,
    duration,
    difficulty,
    topics
  }`
  
  const courses = await client.fetch(query)
  return courses
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Programming Courses
        </h1>
        <p className="text-purple-200 text-center mb-12 max-w-2xl mx-auto">
          Master web development with our comprehensive courses. From Python to Next.js, HTML, CSS, 
          TypeScript, and Frontend development - enhance your programming skills with hands-on projects 
          and practical examples.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
} 