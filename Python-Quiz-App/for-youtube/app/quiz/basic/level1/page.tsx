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

const basicLevel1Questions: Question[] = [
  {
    id: 1,
    text: "Which of the following is a valid variable name in Python?",
    options: ["1variable", "variable_1", "variable-1", "variable@1"],
    correctAnswer: "variable_1",
    explanation: "Variable names in Python can contain letters, numbers, and underscores, but cannot start with a number or contain special characters like @ or -."
  },
  {
    id: 2,
    text: "What is the output of `print(type(42))`?",
    options: ["<class 'str'>", "<class 'int'>", "<class 'float'>", "<class 'bool'>"],
    correctAnswer: "<class 'int'>",
    explanation: "The `type()` function returns the data type of the object. The number 42 is an integer, so the output is `<class 'int'>`."
  },
  {
    id: 3,
    text: "Which of these is NOT a basic data type in Python?",
    options: ["int", "float", "list", "str"],
    correctAnswer: "list",
    explanation: "Basic data types in Python include int, float, str, bool, etc. A list is a compound data type, not a basic one."
  },
  {
    id: 4,
    text: "What is the result of `3 + 2 * 2` in Python?",
    options: ["10", "7", "12", "8"],
    correctAnswer: "7",
    explanation: "Python follows PEMDAS. First, `2 * 2 = 4`, then `3 + 4 = 7`."
  },
  {
    id: 5,
    text: "How do you create a string in Python?",
    options: ["'Hello'", "[Hello]", "{Hello}", "(Hello)"],
    correctAnswer: "'Hello'",
    explanation: "Strings in Python are created using single quotes ('') or double quotes (\"\")."
  },
  {
    id: 6,
    text: "What is the output of `bool(0)`?",
    options: ["True", "False", "None", "0"],
    correctAnswer: "False",
    explanation: "In Python, `0` is considered falsy, so `bool(0)` returns `False`."
  },
  {
    id: 7,
    text: "Which operator is used for exponentiation in Python?",
    options: ["^", "**", "*", "//"],
    correctAnswer: "**",
    explanation: "The `**` operator is used for exponentiation in Python, e.g., `2 ** 3 = 8`."
  },
  {
    id: 8,
    text: "What is the output of `print('Hello' + 'World')`?",
    options: ["Hello World", "HelloWorld", "Hello+World", "Error"],
    correctAnswer: "HelloWorld",
    explanation: "The `+` operator concatenates strings in Python, resulting in `HelloWorld`."
  },
  {
    id: 9,
    text: "Which of these is a float?",
    options: ["42", "42.0", "'42'", "[42]"],
    correctAnswer: "42.0",
    explanation: "A float is a number with a decimal point, so `42.0` is a float."
  },
  {
    id: 10,
    text: "What is the output of `type('')`?",
    options: ["<class 'str'>", "<class 'int'>", "<class 'list'>", "<class 'NoneType'>"],
    correctAnswer: "<class 'str'>",
    explanation: "An empty string is still a string, so `type('')` returns `<class 'str'>`."
  },
  {
    id: 11,
    text: "How do you comment a single line in Python?",
    options: ["//", "#", "/* */", "--"],
    correctAnswer: "#",
    explanation: "Single-line comments in Python start with the `#` symbol."
  },
  {
    id: 12,
    text: "What is the output of `5 // 2`?",
    options: ["2.5", "2", "3", "2.0"],
    correctAnswer: "2",
    explanation: "The `//` operator performs floor division, so `5 // 2` returns `2`."
  },
  {
    id: 13,
    text: "Which of these is a valid way to declare a boolean in Python?",
    options: ["true", "True", "TRUE", "tRue"],
    correctAnswer: "True",
    explanation: "Booleans in Python are `True` and `False`, with the first letter capitalized."
  },
  {
    id: 14,
    text: "What is the output of `len('Python')`?",
    options: ["5", "6", "7", "4"],
    correctAnswer: "6",
    explanation: "The `len()` function returns the number of characters in the string, so `len('Python')` is `6`."
  },
  {
    id: 15,
    text: "Which of these is NOT a valid Python identifier?",
    options: ["my_var", "MyVar", "2var", "_var"],
    correctAnswer: "2var",
    explanation: "Identifiers cannot start with a number, so `2var` is invalid."
  },
  {
    id: 16,
    text: "What is the output of `int('123')`?",
    options: ["123", "'123'", "123.0", "Error"],
    correctAnswer: "123",
    explanation: "The `int()` function converts a string of digits to an integer, so `int('123')` returns `123`."
  },
  {
    id: 17,
    text: "Which operator checks for equality in Python?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "==",
    explanation: "The `==` operator checks for equality between two values."
  },
  {
    id: 18,
    text: "What is the output of `str(42)`?",
    options: ["42", "'42'", "42.0", "[42]"],
    correctAnswer: "'42'",
    explanation: "The `str()` function converts a number to a string, so `str(42)` returns `'42'`."
  },
  {
    id: 19,
    text: "Which of these is a valid way to create a tuple?",
    options: ["(1, 2)", "[1, 2]", "{1, 2}", "<1, 2>"],
    correctAnswer: "(1, 2)",
    explanation: "Tuples in Python are created using parentheses, e.g., `(1, 2)`."
  },
  {
    id: 20,
    text: "What is the output of `type(None)`?",
    options: ["<class 'NoneType'>", "<class 'null'>", "<class 'str'>", "<class 'bool'>"],
    correctAnswer: "<class 'NoneType'>",
    explanation: "`None` is a special type in Python, and `type(None)` returns `<class 'NoneType'>`."
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
    const isCorrect = answer === basicLevel1Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: basicLevel1Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < basicLevel1Questions.length) {
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
    const percentage = ((score / basicLevel1Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Basic Syntax & Data Types
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {basicLevel1Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {basicLevel1Questions.map((question, index) => {
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
          Python Quiz: Basic Syntax & Data Types
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {basicLevel1Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold">
            {basicLevel1Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {basicLevel1Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === basicLevel1Questions[currentQuestion].correctAnswer
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
              {basicLevel1Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < basicLevel1Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {basicLevel1Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;