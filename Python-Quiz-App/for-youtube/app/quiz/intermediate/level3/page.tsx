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

const intermediateLevel3Questions: Question[] = [
  {
    id: 1,
    text: "What is a module in Python?",
    options: ["A class definition", "A file containing Python code", "A loop structure", "A data type"],
    correctAnswer: "A file containing Python code",
    explanation: "A module is a `.py` file containing Python definitions and statements, reusable in other programs."
  },
  {
    id: 2,
    text: "How do you import a module in Python?",
    options: ["include module", "import module", "require module", "use module"],
    correctAnswer: "import module",
    explanation: "The `import` statement is used to bring a module into the current namespace."
  },
  {
    id: 3,
    text: "What is the output of this code?\n```python\nimport math\nprint(math.sqrt(16))\n```",
    options: ["4.0", "16", "None", "Error"],
    correctAnswer: "4.0",
    explanation: "`math.sqrt(16)` calculates the square root of 16, returning 4.0 (a float)."
  },
  {
    id: 4,
    text: "What is a package in Python?",
    options: ["A single Python file", "A collection of modules", "A built-in function", "A data structure"],
    correctAnswer: "A collection of modules",
    explanation: "A package is a directory containing multiple modules and an `__init__.py` file."
  },
  {
    id: 5,
    text: "What is the purpose of the `__init__.py` file in a package?",
    options: ["To execute the package", "To mark a directory as a package", "To define classes", "To store data"],
    correctAnswer: "To mark a directory as a package",
    explanation: "The `__init__.py` file indicates that a directory is a Python package, enabling module imports."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nfrom random import randint\nprint(randint(1, 5))\n```",
    options: ["A number between 1 and 5", "None", "Error", "5"],
    correctAnswer: "A number between 1 and 5",
    explanation: "`randint(1, 5)` returns a random integer between 1 and 5 (inclusive)."
  },
  {
    id: 7,
    text: "How do you import a specific function from a module?",
    options: ["import module.function", "from module import function", "use module.function", "include module.function"],
    correctAnswer: "from module import function",
    explanation: "`from module import function` imports only the specified function from the module."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\nfrom datetime import datetime\nprint(datetime.now().year)\n```",
    options: ["Current year", "None", "Error", "2023"],
    correctAnswer: "Current year",
    explanation: "`datetime.now().year` returns the current year from the system’s date and time."
  },
  {
    id: 9,
    text: "What does the `as` keyword do in an import statement?",
    options: ["Renames a module", "Imports all functions", "Defines a module", "Executes a module"],
    correctAnswer: "Renames a module",
    explanation: "The `as` keyword allows you to assign a different name to a module for convenience."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nimport numpy as np\nprint(np.array([1, 2]).sum())\n```",
    options: ["3", "None", "Error", "[1, 2]"],
    correctAnswer: "3",
    explanation: "`np.array([1, 2]).sum()` creates an array and sums its elements: `1 + 2 = 3`."
  },
  {
    id: 11,
    text: "What is the purpose of the `sys` module?",
    options: ["To handle file operations", "To access system-specific parameters", "To perform math operations", "To create classes"],
    correctAnswer: "To access system-specific parameters",
    explanation: "The `sys` module provides access to system-specific parameters and functions, like `sys.argv`."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\nimport sys\nprint(len(sys.argv))\n```",
    options: ["Number of command-line arguments", "0", "1", "Error"],
    correctAnswer: "Number of command-line arguments",
    explanation: "`sys.argv` is a list of command-line arguments, and `len(sys.argv)` returns its length."
  },
  {
    id: 13,
    text: "What is the `os` module used for?",
    options: ["Mathematical operations", "Operating system interactions", "String manipulations", "Network requests"],
    correctAnswer: "Operating system interactions",
    explanation: "The `os` module provides functions for interacting with the operating system, like file operations."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\nimport os\nprint(os.name)\n```",
    options: ["Operating system name", "None", "Error", "os"],
    correctAnswer: "Operating system name",
    explanation: "`os.name` returns the name of the operating system, like 'posix' or 'nt'."
  },
  {
    id: 15,
    text: "What does the `if __name__ == '__main__':` check do?",
    options: ["Checks if a module is imported", "Checks if a function is defined", "Checks if a class exists", "Checks if a file exists"],
    correctAnswer: "Checks if a module is imported",
    explanation: "It checks if the module is run directly or imported, executing code only if run directly."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nif __name__ == '__main__':\n    print('Direct')\nelse:\n    print('Imported')\n```",
    options: ["Direct", "Imported", "None", "Error"],
    correctAnswer: "Direct",
    explanation: "When run directly, `__name__` is `'__main__'`, so 'Direct' is printed."
  },
  {
    id: 17,
    text: "What is the `pip` tool used for?",
    options: ["Running Python scripts", "Installing Python packages", "Debugging code", "Creating modules"],
    correctAnswer: "Installing Python packages",
    explanation: "`pip` is the package installer for Python, used to install and manage packages."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nimport time\nprint(time.time())\n```",
    options: ["Current timestamp", "None", "Error", "0"],
    correctAnswer: "Current timestamp",
    explanation: "`time.time()` returns the current time as a floating-point number (Unix timestamp)."
  },
  {
    id: 19,
    text: "What is a third-party package in Python?",
    options: ["A built-in module", "A package installed via pip", "A core library", "A private module"],
    correctAnswer: "A package installed via pip",
    explanation: "Third-party packages are external libraries installed using `pip`, like `numpy` or `requests`."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nimport requests\nresponse = requests.get('https://api.github.com')\nprint(response.status_code)\n```",
    options: ["200", "None", "Error", "404"],
    correctAnswer: "200",
    explanation: "If the request to 'https://api.github.com' succeeds, `response.status_code` returns 200 (OK)."
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
    const isCorrect = answer === intermediateLevel3Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: intermediateLevel3Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < intermediateLevel3Questions.length) {
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
    const percentage = ((score / intermediateLevel3Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Modules and Packages
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {intermediateLevel3Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {intermediateLevel3Questions.map((question, index) => {
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
          Python Quiz: Modules and Packages
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {intermediateLevel3Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {intermediateLevel3Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {intermediateLevel3Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === intermediateLevel3Questions[currentQuestion].correctAnswer
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
              {intermediateLevel3Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < intermediateLevel3Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {intermediateLevel3Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;