// 'use client'
// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import toast from 'react-hot-toast'

// interface Quiz {
//   question: string;
//   options: string[];
//   correctAnswer: number;
// }

// interface QuizCardProps {
//   quizzes: Quiz[]; // Define quizzes prop
// }

// const QuizCard = ({ quizzes }: QuizCardProps) => {
//   const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
//   const [score, setScore] = useState(0)
//   const [showResult, setShowResult] = useState(false)
//   const [answers, setAnswers] = useState<boolean[]>([])

//   useEffect(() => {
//     // Load saved progress from local storage
//     const savedScore = localStorage.getItem('quizScore')
//     const savedAnswers = localStorage.getItem('quizAnswers')
//     if (savedScore && savedAnswers) {
//       setScore(parseInt(savedScore))
//       setAnswers(JSON.parse(savedAnswers))
//     }
//   }, [])

//   const handleAnswer = (selectedIndex: number) => {
//     const isCorrect = selectedIndex === quizzes[currentQuizIndex].correctAnswer
    
//     // Store the answer result
//     const newAnswers = [...answers]
//     newAnswers[currentQuizIndex] = isCorrect
//     setAnswers(newAnswers)
    
//     if (isCorrect) {
//       toast.success('Correct Answer! 🎉')
//       setScore(score + 1)
//     } else {
//       const correctOption = quizzes[currentQuizIndex].options[quizzes[currentQuizIndex].correctAnswer]
//       toast.error(`Wrong! Correct answer was: ${correctOption}`)
//     }

//     // Save progress to local storage
//     localStorage.setItem('quizScore', (score + (isCorrect ? 1 : 0)).toString())
//     localStorage.setItem('quizAnswers', JSON.stringify(newAnswers))

//     // Move to next quiz immediately
//     if (currentQuizIndex < quizzes.length - 1) {
//       setCurrentQuizIndex(currentQuizIndex + 1)
//     } else {
//       setShowResult(true)
//     }
//   }

//   if (showResult) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
//         <div className="mb-6">
//           <p className="text-xl mb-2 text-center">
//             Final Score: {score} out of {quizzes.length}
//           </p>
//           <p className="text-lg text-center text-purple-600 font-semibold">
//             Percentage: {((score / quizzes.length) * 100).toFixed(1)}%
//           </p>
//         </div>
        
//         <div className="space-y-4">
//           {quizzes.map((quiz, idx) => (
//             <div 
//               key={idx} 
//               className={`p-4 rounded-lg ${
//                 answers[idx] ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
//               }`}
//             >
//               <p className="font-medium mb-2">{quiz.question}</p>
//               <p className="text-sm">
//                 Correct Answer: {quiz.options[quiz.correctAnswer]}
//               </p>
//               <p className={`text-sm ${answers[idx] ? 'text-green-600' : 'text-red-600'}`}>
//                 {answers[idx] ? '✓ Correct' : '✗ Incorrect'}
//               </p>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     )
//   }

//   const quiz = quizzes[currentQuizIndex]

//   return (
//     <motion.div 
//       key={currentQuizIndex}
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="max-w-2xl mx-auto"
//     >
//       <div className="mb-4 text-center">
//         <span className="text-sm text-gray-500">
//           Quiz {currentQuizIndex + 1} of {quizzes.length}
//         </span>
//       </div>
//       <div className="p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
//         <div className="space-y-3">
//           {quiz.options.map((option, optionIndex) => (
//             <motion.button
//               key={optionIndex}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleAnswer(optionIndex)}
//               className="w-full p-4 text-left border rounded-lg hover:bg-purple-50 hover:border-purple-500 transition-colors"
//             >
//               {option}
//             </motion.button>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default QuizCard