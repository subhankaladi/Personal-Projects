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

const intermediateLevel4Questions: Question[] = [
  {
    id: 1,
    text: "What is an exception in Python?",
    options: ["A syntax error", "A runtime error", "A logical error", "A compilation error"],
    correctAnswer: "A runtime error",
    explanation: "An exception is an error that occurs during program execution, like division by zero."
  },
  {
    id: 2,
    text: "Which keyword is used to catch exceptions in Python?",
    options: ["try", "except", "catch", "handle"],
    correctAnswer: "except",
    explanation: "The `except` keyword defines a block to handle specific exceptions raised in a `try` block."
  },
  {
    id: 3,
    text: "What is the output of this code?\n```python\ntry:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\n```",
    options: ["Cannot divide by zero", "Error", "None", "1"],
    correctAnswer: "Cannot divide by zero",
    explanation: "Dividing by zero raises a `ZeroDivisionError`, caught by the `except` block, printing the message."
  },
  {
    id: 4,
    text: "What does the `try` block do?",
    options: ["Catches exceptions", "Raises exceptions", "Contains code that might raise an exception", "Ignores exceptions"],
    correctAnswer: "Contains code that might raise an exception",
    explanation: "The `try` block contains code that is monitored for potential exceptions."
  },
  {
    id: 5,
    text: "What is the output of this code?\n```python\ntry:\n    print(int('abc'))\nexcept ValueError:\n    print('Invalid input')\n```",
    options: ["Invalid input", "abc", "None", "Error"],
    correctAnswer: "Invalid input",
    explanation: "Converting 'abc' to an integer raises a `ValueError`, caught by `except`, printing 'Invalid input'."
  },
  {
    id: 6,
    text: "What does the `finally` block do?",
    options: ["Catches exceptions", "Always executes", "Raises exceptions", "Skips exceptions"],
    correctAnswer: "Always executes",
    explanation: "The `finally` block executes regardless of whether an exception occurs or is caught."
  },
  {
    id: 7,
    text: "What is the output of this code?\n```python\ntry:\n    x = 5\nexcept:\n    x = 10\nfinally:\n    print(x)\n```",
    options: ["5", "10", "None", "Error"],
    correctAnswer: "5",
    explanation: "No exception occurs, so `x = 5` is set, and `finally` prints 5."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\ntry:\n    lst = [1]\n    print(lst[2])\nexcept IndexError:\n    print('Index out of range')\n```",
    options: ["Index out of range", "1", "None", "Error"],
    correctAnswer: "Index out of range",
    explanation: "Accessing index 2 in a list with one element raises an `IndexError`, printing the message."
  },
  {
    id: 9,
    text: "Which exception is raised when accessing a non-existent dictionary key?",
    options: ["KeyError", "IndexError", "ValueError", "TypeError"],
    correctAnswer: "KeyError",
    explanation: "A `KeyError` is raised when a dictionary key is not found."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\ntry:\n    d = {'a': 1}\n    print(d['b'])\nexcept KeyError:\n    print('Key not found')\n```",
    options: ["Key not found", "1", "None", "Error"],
    correctAnswer: "Key not found",
    explanation: "Accessing the non-existent key 'b' raises a `KeyError`, printing 'Key not found'."
  },
  {
    id: 11,
    text: "What is the output of this code?\n```python\ntry:\n    x = 'a' + 5\nexcept TypeError:\n    print('Type mismatch')\n```",
    options: ["Type mismatch", "a5", "None", "Error"],
    correctAnswer: "Type mismatch",
    explanation: "Adding a string and integer raises a `TypeError`, printing 'Type mismatch'."
  },
  {
    id: 12,
    text: "What does the `raise` keyword do?",
    options: ["Catches an exception", "Ignores an exception", "Throws an exception", "Handles an exception"],
    correctAnswer: "Throws an exception",
    explanation: "The `raise` keyword is used to manually trigger an exception."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\ntry:\n    raise ValueError('Invalid value')\nexcept ValueError as e:\n    print(e)\n```",
    options: ["Invalid value", "ValueError", "None", "Error"],
    correctAnswer: "Invalid value",
    explanation: "The raised `ValueError` with message 'Invalid value' is caught, and `print(e)` outputs the message."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\ntry:\n    open('nonexistent.txt')\nexcept FileNotFoundError:\n    print('File not found')\n```",
    options: ["File not found", "None", "Error", "File"],
    correctAnswer: "File not found",
    explanation: "Opening a non-existent file raises a `FileNotFoundError`, printing 'File not found'."
  },
  {
    id: 15,
    text: "What is an `else` block used for in a try-except structure?",
    options: ["Executes if an exception occurs", "Executes if no exception occurs", "Always executes", "Raises an exception"],
    correctAnswer: "Executes if no exception occurs",
    explanation: "The `else` block runs only if no exceptions are raised in the `try` block."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\ntry:\n    x = 10\nexcept:\n    x = 5\nelse:\n    print('No error')\n```",
    options: ["No error", "5", "None", "Error"],
    correctAnswer: "No error",
    explanation: "No exception occurs, so the `else` block executes, printing 'No error'."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\ntry:\n    x = 1 / 0\nexcept Exception as e:\n    print(type(e).__name__)\n```",
    options: ["ZeroDivisionError", "Exception", "None", "Error"],
    correctAnswer: "ZeroDivisionError",
    explanation: "Dividing by zero raises a `ZeroDivisionError`, and `type(e).__name__` prints its name."
  },
  {
    id: 18,
    text: "What is the purpose of catching `Exception` instead of a specific exception?",
    options: ["To catch all exceptions", "To catch only one exception", "To raise an exception", "To ignore exceptions"],
    correctAnswer: "To catch all exceptions",
    explanation: "`Exception` is a base class, so catching it handles all exception types."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\ntry:\n    import nonexistent\nexcept ImportError:\n    print('Module not found')\n```",
    options: ["Module not found", "None", "Error", "nonexistent"],
    correctAnswer: "Module not found",
    explanation: "Importing a non-existent module raises an `ImportError`, printing 'Module not found'."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\ntry:\n    x = undefined_var\nexcept NameError:\n    print('Variable not defined')\n```",
    options: ["Variable not defined", "None", "Error", "undefined_var"],
    correctAnswer: "Variable not defined",
    explanation: "Accessing an undefined variable raises a `NameError`, printing 'Variable not defined'."
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
    const isCorrect = answer === intermediateLevel4Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: intermediateLevel4Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < intermediateLevel4Questions.length) {
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
    const percentage = ((score / intermediateLevel4Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Exception Handling
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {intermediateLevel4Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {intermediateLevel4Questions.map((question, index) => {
              const userAnswer = answers.find((ans) => ans.questionId === question.id);
              return (
                <motion.div
                  key={question.id}
                  className="p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="text-gray-900 font-semibold whitespace-pre-wrap">
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
          Python Quiz: Exception Handling
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {intermediateLevel4Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {intermediateLevel4Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {intermediateLevel4Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === intermediateLevel4Questions[currentQuestion].correctAnswer
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
              {intermediateLevel4Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < intermediateLevel4Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {intermediateLevel4Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;