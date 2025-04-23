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

const intermediateLevel1Questions: Question[] = [
  {
    id: 1,
    text: "What is a lambda function in Python?",
    options: ["A named function", "An anonymous function", "A recursive function", "A built-in function"],
    correctAnswer: "An anonymous function",
    explanation: "A lambda function is an anonymous (unnamed) function defined using the `lambda` keyword, often used for short, simple operations."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\nf = lambda x: x * 2\nprint(f(5))\n```",
    options: ["10", "5", "None", "Error"],
    correctAnswer: "10",
    explanation: "The lambda function `f` multiplies its input `x` by 2. So, `f(5)` returns `5 * 2 = 10`."
  },
  {
    id: 3,
    text: "Which of these is a valid lambda function syntax?",
    options: ["lambda x: x + 1", "lambda x = x + 1", "lambda: x + 1", "def lambda x: x + 1"],
    correctAnswer: "lambda x: x + 1",
    explanation: "Lambda syntax is `lambda arguments: expression`. `lambda x: x + 1` is correct."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\nnums = [1, 2, 3]\nresult = list(map(lambda x: x ** 2, nums))\nprint(result)\n```",
    options: ["[1, 4, 9]", "[1, 2, 3]", "[2, 4, 6]", "Error"],
    correctAnswer: "[1, 4, 9]",
    explanation: "`map()` applies the lambda function `x ** 2` to each element in `nums`, squaring them to `[1, 4, 9]`."
  },
  {
    id: 5,
    text: "What does the `filter()` function do when used with a lambda?",
    options: ["Transforms elements", "Removes elements based on a condition", "Sorts elements", "Joins elements"],
    correctAnswer: "Removes elements based on a condition",
    explanation: "`filter()` uses a lambda to keep only elements where the lambda returns `True`."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nnums = [1, 2, 3, 4]\nresult = list(filter(lambda x: x % 2 == 0, nums))\nprint(result)\n```",
    options: ["[2, 4]", "[1, 3]", "[1, 2, 3, 4]", "Error"],
    correctAnswer: "[2, 4]",
    explanation: "The lambda keeps even numbers (`x % 2 == 0`), so `filter()` returns `[2, 4]`."
  },
  {
    id: 7,
    text: "What is a higher-order function in Python?",
    options: ["A function with no arguments", "A function that takes or returns a function", "A function with multiple returns", "A recursive function"],
    correctAnswer: "A function that takes or returns a function",
    explanation: "Higher-order functions accept functions as arguments or return them, like `map()` or `filter()`."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\ndef apply_func(func, x):\n    return func(x)\nprint(apply_func(lambda x: x + 10, 5))\n```",
    options: ["15", "5", "10", "Error"],
    correctAnswer: "15",
    explanation: "The lambda adds 10 to `x`. `apply_func` calls it with `x=5`, returning `5 + 10 = 15`."
  },
  {
    id: 9,
    text: "What is the output of this code?\n```python\nsorted_names = sorted(['Subhan', 'Ali', 'Zain'], key=lambda x: x[-1])\nprint(sorted_names)\n```",
    options: ["['Zain', 'Subhan', 'Ali']", "['Subhan', 'Ali', 'Zain']", "['Ali', 'Subhan', 'Zain']", "Error"],
    correctAnswer: "['Zain', 'Subhan', 'Ali']",
    explanation: "The lambda `x: x[-1]` sorts by the last letter: 'n' (Subhan), 'i' (Ali), 'n' (Zain). Alphabetical order gives ['Zain', 'Subhan', 'Ali']."
  },
  {
    id: 10,
    text: "What is the scope of a variable defined inside a function?",
    options: ["Global", "Local", "Module", "Class"],
    correctAnswer: "Local",
    explanation: "Variables defined inside a function are local to that function unless declared `global`."
  },
  {
    id: 11,
    text: "What is the output of this code?\n```python\ndef outer():\n    x = 10\n    def inner():\n        return x\n    return inner()\nprint(outer())\n```",
    options: ["10", "None", "Error", "inner"],
    correctAnswer: "10",
    explanation: "The inner function accesses `x` from the outer function's scope, returning 10."
  },
  {
    id: 12,
    text: "What is a closure in Python?",
    options: ["A function with no arguments", "A function that retains access to outer scope variables", "A recursive function", "A lambda function"],
    correctAnswer: "A function that retains access to outer scope variables",
    explanation: "A closure is a nested function that remembers variables from its enclosing scope."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\ndef make_multiplier(n):\n    return lambda x: x * n\nf = make_multiplier(3)\nprint(f(4))\n```",
    options: ["12", "7", "None", "Error"],
    correctAnswer: "12",
    explanation: "The closure retains `n=3`. The lambda multiplies `x=4` by `n`, giving `4 * 3 = 12`."
  },
  {
    id: 14,
    text: "What does the `nonlocal` keyword do in a nested function?",
    options: ["Declares a global variable", "Accesses a variable from the enclosing scope", "Creates a new variable", "Prevents variable access"],
    correctAnswer: "Accesses a variable from the enclosing scope",
    explanation: "`nonlocal` allows a nested function to modify a variable in its enclosing scope."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\ndef outer():\n    count = 0\n    def inner():\n        nonlocal count\n        count += 1\n        return count\n    return inner\nf = outer()\nprint(f())\n```",
    options: ["1", "0", "None", "Error"],
    correctAnswer: "1",
    explanation: "`nonlocal count` allows `inner` to increment `count`. The first call returns `0 + 1 = 1`."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nlst = [1, 2, 3, 4]\nresult = list(map(lambda x: x if x % 2 == 0 else x * 2, lst))\nprint(result)\n```",
    options: ["[2, 2, 6, 4]", "[1, 4, 3, 8]", "[2, 4, 6, 8]", "Error"],
    correctAnswer: "[2, 2, 6, 4]",
    explanation: "The lambda doubles odd numbers and keeps even numbers: 1→2, 2→2, 3→6, 4→4."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\nfrom functools import reduce\nnums = [1, 2, 3]\nresult = reduce(lambda x, y: x + y, nums)\nprint(result)\n```",
    options: ["6", "123", "None", "Error"],
    correctAnswer: "6",
    explanation: "`reduce()` applies the lambda to pairs, summing: `(1 + 2) + 3 = 6`."
  },
  {
    id: 18,
    text: "What is the purpose of the `sorted()` function's `key` parameter?",
    options: ["To filter elements", "To specify a sorting criterion", "To reverse the sort", "To limit the sort"],
    correctAnswer: "To specify a sorting criterion",
    explanation: "The `key` parameter accepts a function (like a lambda) to determine the sorting order."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\npairs = [(1, 'one'), (3, 'three'), (2, 'two')]\nsorted_pairs = sorted(pairs, key=lambda x: x[1])\nprint(sorted_pairs)\n```",
    options: ["[(1, 'one'), (2, 'two'), (3, 'three')]", "[(3, 'three'), (1, 'one'), (2, 'two')]", "[(1, 'one'), (3, 'three'), (2, 'two')]", "Error"],
    correctAnswer: "[(1, 'one'), (3, 'three'), (2, 'two')]",
    explanation: "The lambda sorts by the second element (strings): 'one', 'three', 'two'."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\ndef compose(f, g):\n    return lambda x: f(g(x))\nf = compose(lambda x: x + 1, lambda x: x * 2)\nprint(f(3))\n```",
    options: ["7", "6", "None", "Error"],
    correctAnswer: "7",
    explanation: "The composition applies `g(x) = x * 2` then `f(x) = x + 1`. For `x=3`: `g(3) = 6`, `f(6) = 7`."
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
    const isCorrect = answer === intermediateLevel1Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: intermediateLevel1Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < intermediateLevel1Questions.length) {
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
    const percentage = ((score / intermediateLevel1Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Functions and Lambda
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {intermediateLevel1Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {intermediateLevel1Questions.map((question, index) => {
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
          Python Quiz: Functions and Lambda
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {intermediateLevel1Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {intermediateLevel1Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {intermediateLevel1Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === intermediateLevel1Questions[currentQuestion].correctAnswer
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
              {intermediateLevel1Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < intermediateLevel1Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {intermediateLevel1Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;