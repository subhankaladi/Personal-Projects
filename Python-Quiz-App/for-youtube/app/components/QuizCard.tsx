'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { client } from '@/lib/sanity'
import { useRouter } from 'next/navigation'

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCardProps {
  quizzes: Question[];
  day : number
}

const QuizCard = ({ quizzes, day }: QuizCardProps) => {
  const [userName, setUserName] = useState('')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<{ selected: number, isCorrect: boolean }[]>([])
  const router = useRouter()

  const handleStartQuiz = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (userName.trim()) {
      setQuizStarted(true)
    }
  }

  const saveUserDataToSanity = async (userName: string, score: number, day: number) => {
    const userData = {
      _type: 'userData',
      userName: userName,
      score: score,
      day: day,
      timestamp: new Date().toISOString(),
    }

    await client.create(userData)
  }

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === quizzes[currentQuizIndex].correctAnswer

    // Store the answer result
    const newAnswers = [...answers]
    newAnswers[currentQuizIndex] = { selected: selectedIndex, isCorrect }
    setAnswers(newAnswers)

    if (isCorrect) {
      toast.success('Correct Answer! 🎉')
      setScore(score + 1)
    } else {
      const correctOption = quizzes[currentQuizIndex].options[quizzes[currentQuizIndex].correctAnswer]
      toast.error(`Wrong! Correct answer was: ${correctOption}`)
    }

    // Move to next quiz immediately
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
    } else {
      setShowResult(true)
      saveUserDataToSanity(userName, score, day)
    }
  }

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Enter Your Name to Start the Quiz</h2>
        <form onSubmit={handleStartQuiz}>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start Quiz
          </button>
        </form>
      </motion.div>
    )
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
        <div className="mb-6">
          <p className="text-xl mb-2 text-center">
            Final Score: {score} out of {quizzes.length}
          </p>
          <p className="text-lg text-center text-purple-600 font-semibold">
            Percentage: {((score / quizzes.length) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="space-y-4">
          {quizzes.map((q, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${
                answers[idx]?.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className="font-medium mb-2">{q.question}</p>
              <p className="text-sm">
                Correct Answer: {q.options[q.correctAnswer]}
              </p>
              <p className={`text-sm ${answers[idx]?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {answers[idx]?.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </p>
              <p className="text-sm text-gray-600">
                Your Answer: {q.options[answers[idx]?.selected]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mb-4">Want to see how you rank?</p>
          <button
            onClick={() => router.push('/leaderboard')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition"
          >
            Go to Leaderboard
          </button>
        </div>
      </motion.div>
    )
  }

  const quiz = quizzes[currentQuizIndex]

  return (
    <motion.div
      key={currentQuizIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-4 text-center">
        <span className="text-sm text-gray-500">
          Question {currentQuizIndex + 1} of {quizzes.length}
        </span>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
        <div className="space-y-3">
          {quiz.options.map((option, optionIndex) => (
            <motion.button
              key={optionIndex}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(optionIndex)}
              className="w-full p-4 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-500 transition-colors"
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default QuizCard