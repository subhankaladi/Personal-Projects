import { client } from '@/lib/sanity'
import QuizCard from '@/app/components/QuizCard'
import { Toaster } from 'react-hot-toast'

async function getQuizData() {
  const query = `*[_type == "quiz" && day == 1][0]`
  return client.fetch(query)
}

export default async function Day1() {
    const quizData = await getQuizData()
    
    if (!quizData) {
        return <div>No quiz data found.</div>
    }
  
    if (!quizData.quizzes || quizData.quizzes.length === 0) {
        return <div>No quizzes available for this day.</div>
    }
  
    return (
      <div className="container mt-24 mx-auto py-8">
        <Toaster position="top-center" />
        <h1 className="text-3xl font-bold text-center mb-8">
          Day 1: Python Basics Quiz
        </h1>
        <QuizCard 
                quizzes={quizData.quizzes} day={1}        />
      </div>
    )
}