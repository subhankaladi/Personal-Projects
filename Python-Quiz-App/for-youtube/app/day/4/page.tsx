import { client } from '@/lib/sanity'
import QuizCard from '@/app/components/QuizCard'
import { Toaster } from 'react-hot-toast'

async function getQuizData() {
  const query = `*[_type == "quiz" && day == 4][0]`
  return client.fetch(query)
}

export default async function Day3() {
    const quizData = await getQuizData()
    
    if (!quizData || !quizData.quizzes || quizData.quizzes.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 animate-bounce">No quizzes available for this day </h2>
                </div>
            </div>
        )
    }
  
    return (
      <div className="container mt-24 mx-auto py-8">
        <Toaster position="top-center" />
        <h1 className="text-3xl font-bold text-center mb-8">
          Day 4: Python Basics Quiz
        </h1>
        <QuizCard quizzes={quizData.quizzes} day={4} />
      </div>
    )
}
