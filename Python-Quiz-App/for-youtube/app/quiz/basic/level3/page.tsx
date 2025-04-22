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

const basicLevel3Questions: Question[] = [
  {
    id: 1,
    text: "What is the correct way to define a function in Python?",
    options: ["function my_func():", "def my_func():", "my_func():", "func my_func():"],
    correctAnswer: "def my_func():",
    explanation: "In Python, functions are defined using the `def` keyword followed by the function name and parentheses."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\ndef greet():\n    return 'Hello'\nprint(greet())\n```",
    options: ["Hello", "greet", "None", "Error"],
    correctAnswer: "Hello",
    explanation: "The function `greet` returns the string 'Hello', which is printed by `print(greet())`."
  },
  {
    id: 3,
    text: "What is a default parameter in a function?",
    options: ["A parameter that is required", "A parameter with a preset value", "A parameter that cannot be changed", "A parameter passed by reference"],
    correctAnswer: "A parameter with a preset value",
    explanation: "Default parameters have a preset value in the function definition, used if no argument is provided."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\ndef add(a, b=2):\n    return a + b\nprint(add(3))\n```",
    options: ["5", "3", "2", "Error"],
    correctAnswer: "5",
    explanation: "The function `add` uses a default value `b=2`. Calling `add(3)` uses `a=3` and `b=2`, returning `3 + 2 = 5`."
  },
  {
    id: 5,
    text: "Which keyword is used to pass a variable number of arguments to a function?",
    options: ["*args", "&args", "#args", "@args"],
    correctAnswer: "*args",
    explanation: "`*args` allows a function to accept any number of positional arguments as a tuple."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\ndef my_func(*args):\n    return sum(args)\nprint(my_func(1, 2, 3))\n```",
    options: ["6", "123", "None", "Error"],
    correctAnswer: "6",
    explanation: "`*args` collects arguments into a tuple. `sum(args)` adds `1 + 2 + 3 = 6`."
  },
  {
    id: 7,
    text: "What does the `**kwargs` parameter do in a function?",
    options: ["Accepts keyword arguments as a dictionary", "Accepts positional arguments as a tuple", "Returns a list", "Defines a default parameter"],
    correctAnswer: "Accepts keyword arguments as a dictionary",
    explanation: "`**kwargs` collects keyword arguments into a dictionary."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\ndef info(**kwargs):\n    return kwargs['name']\nprint(info(name='Subhan', age=20))\n```",
    options: ["Subhan", "20", "{'name': 'Subhan', 'age': 20}", "Error"],
    correctAnswer: "Subhan",
    explanation: "`**kwargs` creates a dictionary. `kwargs['name']` accesses the value 'Subhan'."
  },
  {
    id: 9,
    text: "What is the return value of a function without a `return` statement?",
    options: ["0", "None", "False", "Error"],
    correctAnswer: "None",
    explanation: "A function without a `return` statement implicitly returns `None`."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\ndef square(num):\n    num * num\nprint(square(4))\n```",
    options: ["16", "None", "4", "Error"],
    correctAnswer: "None",
    explanation: "The function `square` calculates `num * num` but doesn't return it, so it returns `None`."
  },
  {
    id: 11,
    text: "Which method converts a string to uppercase?",
    options: [".upper()", ".lower()", ".title()", ".capitalize()"],
    correctAnswer: ".upper()",
    explanation: "The `.upper()` method converts all characters in a string to uppercase."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\ntext = 'hello'\nprint(text.upper())\n```",
    options: ["HELLO", "hello", "Hello", "Error"],
    correctAnswer: "HELLO",
    explanation: "`text.upper()` converts 'hello' to 'HELLO'."
  },
  {
    id: 13,
    text: "What does the `.strip()` method do to a string?",
    options: ["Removes leading and trailing whitespace", "Removes all whitespace", "Splits the string", "Replaces whitespace"],
    correctAnswer: "Removes leading and trailing whitespace",
    explanation: "`.strip()` removes whitespace from the start and end of a string."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\ntext = '  hi  '\nprint(text.strip())\n```",
    options: ["hi", "  hi  ", "hi  ", "Error"],
    correctAnswer: "hi",
    explanation: "`text.strip()` removes leading and trailing spaces, resulting in 'hi'."
  },
  {
    id: 15,
    text: "What does the `.replace()` method do?",
    options: ["Replaces all occurrences of a substring", "Replaces the first character", "Replaces the last character", "Splits the string"],
    correctAnswer: "Replaces all occurrences of a substring",
    explanation: "`.replace(old, new)` replaces all instances of `old` with `new` in a string."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\ntext = 'hello world'\nprint(text.replace('world', 'Karachi'))\n```",
    options: ["hello Karachi", "hello world", "Karachi world", "Error"],
    correctAnswer: "hello Karachi",
    explanation: "`text.replace('world', 'Karachi')` replaces 'world' with 'Karachi', resulting in 'hello Karachi'."
  },
  {
    id: 17,
    text: "What is a docstring in Python?",
    options: ["A string literal used for documentation", "A comment in a function", "A return statement", "A parameter name"],
    correctAnswer: "A string literal used for documentation",
    explanation: "A docstring is a string (often triple-quoted) at the start of a function used to document its purpose."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\ndef add(a, b):\n    '''Adds two numbers'''\n    return a + b\nprint(add.__doc__)\n```",
    options: ["Adds two numbers", "None", "add(a, b)", "Error"],
    correctAnswer: "Adds two numbers",
    explanation: "`add.__doc__` accesses the function's docstring, which is 'Adds two numbers'."
  },
  {
    id: 19,
    text: "Which function call is correct for a function defined as `def calc(x, y=10):`?",
    options: ["calc()", "calc(5)", "calc(5, 20)", "calc(y=15)"],
    correctAnswer: "calc(5)",
    explanation: "`calc` requires at least one argument (`x`). `calc(5)` uses the default `y=10`. `calc()` would raise an error."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\ntext = 'python'\nprint(text.capitalize())\n```",
    options: ["Python", "PYTHON", "python", "Error"],
    correctAnswer: "Python",
    explanation: "`.capitalize()` makes the first character uppercase and the rest lowercase, so 'python' becomes 'Python'."
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
    const isCorrect = answer === basicLevel3Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: basicLevel3Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < basicLevel3Questions.length) {
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
    const percentage = ((score / basicLevel3Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Functions and Basic Methods
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {basicLevel3Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {basicLevel3Questions.map((question, index) => {
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
    <div className="flex items-center mt-20 justify-center min-h-screen ">
      <motion.div
        className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Python Quiz: Functions and Basic Methods
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {basicLevel3Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {basicLevel3Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {basicLevel3Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === basicLevel3Questions[currentQuestion].correctAnswer
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
              {basicLevel3Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < basicLevel3Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {basicLevel3Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;