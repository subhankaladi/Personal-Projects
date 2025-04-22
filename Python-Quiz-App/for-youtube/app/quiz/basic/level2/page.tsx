
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Answer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

const basicLevel2Questions: Question[] = [
  {
    id: 1,
    text: "What is the output of the following code?\n```python\nx = 5\nif x > 3:\n    print('Yes')\nelse:\n    print('No')\n```",
    options: ["Yes", "No", "Error", "None"],
    correctAnswer: "Yes",
    explanation: "Since `x` is 5, which is greater than 3, the condition `x > 3` is true, so the code prints 'Yes'."
  },
  {
    id: 2,
    text: "Which keyword is used to exit a loop prematurely in Python?",
    options: ["stop", "exit", "break", "continue"],
    correctAnswer: "break",
    explanation: "The `break` keyword exits the loop immediately, stopping further iterations."
  },
  {
    id: 3,
    text: "What does the `else` clause in a loop do in Python?",
    options: ["Executes if the loop is interrupted", "Executes if the loop completes normally", "Executes if an error occurs", "Skips the loop"],
    correctAnswer: "Executes if the loop completes normally",
    explanation: "In Python, the `else` clause in a loop executes when the loop completes without hitting a `break` statement."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\nfor i in range(3):\n    print(i)\n```",
    options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "Error"],
    correctAnswer: "0, 1, 2",
    explanation: "`range(3)` generates numbers from 0 to 2, so the loop prints 0, 1, 2."
  },
  {
    id: 5,
    text: "Which loop is used to iterate until a condition is met?",
    options: ["for", "while", "do-while", "until"],
    correctAnswer: "while",
    explanation: "A `while` loop continues iterating as long as its condition remains true."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nx = 1\nwhile x < 4:\n    print(x)\n    x += 1\n```",
    options: ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2", "Error"],
    correctAnswer: "1, 2, 3",
    explanation: "The loop prints `x` and increments it until `x < 4` is false, so it prints 1, 2, 3."
  },
  {
    id: 7,
    text: "What does the `continue` statement do in a loop?",
    options: ["Exits the loop", "Skips the current iteration", "Restarts the loop", "Pauses the loop"],
    correctAnswer: "Skips the current iteration",
    explanation: "The `continue` statement skips the rest of the current loop iteration and moves to the next one."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)\n```",
    options: ["0, 1, 2", "0, 1, 2, 3", "0, 1, 2, 3, 4", "3"],
    correctAnswer: "0, 1, 2",
    explanation: "The loop prints `i` until `i == 3`, where `break` exits the loop, so it prints 0, 1, 2."
  },
  {
    id: 9,
    text: "Which condition will make this loop infinite?\n```python\nwhile x > 0:\n    print(x)\n```",
    options: ["x = 0", "x = -1", "x = 1", "x = None"],
    correctAnswer: "x = 1",
    explanation: "If `x = 1`, the condition `x > 0` is always true, causing an infinite loop."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nif 10 > 5 > 2:\n    print('True')\nelse:\n    print('False')\n```",
    options: ["True", "False", "Error", "None"],
    correctAnswer: "True",
    explanation: "The chained comparison `10 > 5 > 2` is true, so the code prints 'True'."
  },
  {
    id: 11,
    text: "What is the output of this code?\n```python\nfor i in range(2, 5):\n    print(i)\n```",
    options: ["2, 3, 4", "2, 3, 4, 5", "1, 2, 3, 4", "3, 4, 5"],
    correctAnswer: "2, 3, 4",
    explanation: "`range(2, 5)` generates numbers from 2 to 4, so the loop prints 2, 3, 4."
  },
  {
    id: 12,
    text: "Which keyword is NOT used in Python control structures?",
    options: ["if", "elif", "else", "elseif"],
    correctAnswer: "elseif",
    explanation: "Python uses `elif` for else-if conditions, not `elseif`."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\nx = 10\nif x < 5:\n    print('Small')\nelif x < 15:\n    print('Medium')\nelse:\n    print('Large')\n```",
    options: ["Small", "Medium", "Large", "Error"],
    correctAnswer: "Medium",
    explanation: "Since `x = 10`, the condition `x < 15` is true, so it prints 'Medium'."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\nfor i in range(6):\n    if i % 2 == 0:\n        continue\n    print(i)\n```",
    options: ["1, 3, 5", "0, 2, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5"],
    correctAnswer: "1, 3, 5",
    explanation: "The `continue` statement skips even numbers (`i % 2 == 0`), so only odd numbers 1, 3, 5 are printed."
  },
  {
    id: 15,
    text: "What is the correct syntax for a nested if statement?",
    options: ["if x > 0: if y > 0: print('Both positive')", "if x > 0: { if y > 0: print('Both positive') }", "if x > 0 then if y > 0: print('Both positive')", "if x > 0; if y > 0: print('Both positive')"],
    correctAnswer: "if x > 0: if y > 0: print('Both positive')",
    explanation: "Python uses colons and indentation for nested `if` statements, with no braces or keywords like 'then'."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nwhile False:\n    print('Loop')\nprint('End')\n```",
    options: ["Loop", "End", "Loop End", "Error"],
    correctAnswer: "End",
    explanation: "The `while False` condition is never true, so the loop doesn't execute, and only 'End' is printed."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\nfor i in [1, 2, 3]:\n    print(i, end='')\n```",
    options: ["123", "1 2 3", "1, 2, 3", "Error"],
    correctAnswer: "123",
    explanation: "The `end=''` parameter in `print` prevents newlines, so the numbers 1, 2, 3 are printed without spaces."
  },
  {
    id: 18,
    text: "Which loop will NOT cause an infinite loop?\n```python\nx = 5\nwhile x > 0:\n    x -= 1\n```",
    options: ["x = 5; while x > 0: x += 1", "x = 5; while x > 0: pass", "x = 5; while x > 0: x -= 1", "x = 5; while True: pass"],
    correctAnswer: "x = 5; while x > 0: x -= 1",
    explanation: "The loop `x -= 1` decreases `x` until `x > 0` is false, so it terminates after 5 iterations."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\nif not True:\n    print('False')\nelse:\n    print('True')\n```",
    options: ["False", "True", "Error", "None"],
    correctAnswer: "True",
    explanation: "`not True` is `False`, so the `else` block executes, printing 'True'."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nfor i in range(0, 10, 2):\n    print(i)\n```",
    options: ["0, 2, 4, 6, 8", "0, 1, 2, 3, 4", "2, 4, 6, 8, 10", "0, 2, 4, 6, 8, 10"],
    correctAnswer: "0, 2, 4, 6, 8",
    explanation: "`range(0, 10, 2)` generates numbers from 0 to 8 with a step of 2, so it prints 0, 2, 4, 6, 8."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    const isCorrect = answer === basicLevel2Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: basicLevel2Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < basicLevel2Questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = ((score / basicLevel2Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Control Structures
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {basicLevel2Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {basicLevel2Questions.map((question, index) => {
              const userAnswer = answers.find((ans) => ans.questionId === question.id);
              return (
                <motion.div
                  key={question.id}
                  className="p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="text-gray-900 font-semibold">
                    Q{question.id}: {question.text}
                  </p>
                  <p className={`mt-2 ${userAnswer?.isCorrect ? "text-green-600" : "text-red-600"}`}>
                    Your Answer: {userAnswer?.selectedAnswer || "Not answered"}
                  </p>
                  <p className="text-gray-600">
                    Correct Answer: {question.correctAnswer}
                  </p>
                  <p className="text-blue-700 mt-2">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <motion.button
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            onClick={resetQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Restart Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <motion.div
        className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Python Quiz: Control Structures
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {basicLevel2Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {basicLevel2Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {basicLevel2Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === basicLevel2Questions[currentQuestion].correctAnswer
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : "bg-gray-50 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {showExplanation && (
          <motion.div
            className="mt-6 p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-blue-700">
              <strong>Explanation:</strong>{" "}
              {basicLevel2Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < basicLevel2Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {basicLevel2Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;