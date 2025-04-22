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

const basicLevel5Questions: Question[] = [
  {
    id: 1,
    text: "Which mode is used to open a file for reading in Python?",
    options: ["'w'", "'r'", "'a'", "'x'"],
    correctAnswer: "'r'",
    explanation: "The `'r'` mode opens a file for reading. It's the default mode if no mode is specified."
  },
  {
    id: 2,
    text: "What is the output of this code if 'data.txt' exists?\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\nprint(type(content))\n```",
    options: ["<class 'list'>", "<class 'str'>", "<class 'file'>", "<class 'dict'>"],
    correctAnswer: "<class 'str'>",
    explanation: "`file.read()` returns the file's content as a string, so `type(content)` is `<class 'str'>`."
  },
  {
    id: 3,
    text: "Which mode creates a new file or overwrites an existing file?",
    options: ["'r'", "'w'", "'a'", "'r+'"],
    correctAnswer: "'w'",
    explanation: "The `'w'` mode creates a new file or overwrites an existing file for writing."
  },
  {
    id: 4,
    text: "What happens if you try to open a non-existent file in 'r' mode?",
    options: ["Creates a new file", "Raises FileNotFoundError", "Returns None", "Opens an empty file"],
    correctAnswer: "Raises FileNotFoundError",
    explanation: "Opening a non-existent file in `'r'` mode raises a `FileNotFoundError`."
  },
  {
    id: 5,
    text: "What is the purpose of the `with` statement when opening files?",
    options: ["To rename the file", "To automatically close the file", "To copy the file", "To lock the file"],
    correctAnswer: "To automatically close the file",
    explanation: "The `with` statement ensures the file is properly closed after operations, even if an error occurs."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\ntry:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Error')\n```",
    options: ["Error", "1", "0", "None"],
    correctAnswer: "Error",
    explanation: "Dividing by zero raises a `ZeroDivisionError`, so the `except` block prints 'Error'."
  },
  {
    id: 7,
    text: "Which keyword is used to handle exceptions in Python?",
    options: ["catch", "except", "try", "handle"],
    correctAnswer: "except",
    explanation: "The `except` keyword defines a block to handle specific exceptions raised in a `try` block."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\ntry:\n    print(int('abc'))\nexcept ValueError:\n    print('Invalid')\n```",
    options: ["abc", "Invalid", "Error", "None"],
    correctAnswer: "Invalid",
    explanation: "Converting 'abc' to an integer raises a `ValueError`, so the `except` block prints 'Invalid'."
  },
  {
    id: 9,
    text: "What does the `finally` block do in a try-except structure?",
    options: ["Executes only if no exception occurs", "Executes only if an exception occurs", "Always executes", "Prevents exceptions"],
    correctAnswer: "Always executes",
    explanation: "The `finally` block executes regardless of whether an exception occurs or not."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\ntry:\n    x = 5\nexcept:\n    x = 10\nfinally:\n    print(x)\n```",
    options: ["5", "10", "None", "Error"],
    correctAnswer: "5",
    explanation: "No exception occurs, so `x = 5` is set, and the `finally` block prints 5."
  },
  {
    id: 11,
    text: "Which method reads a file line by line?",
    options: [".read()", ".readline()", ".readlines()", ".lines()"],
    correctAnswer: ".readline()",
    explanation: "`.readline()` reads one line at a time from a file."
  },
  {
    id: 12,
    text: "What is the output of this code if 'data.txt' contains 'Hello\\nWorld'?\n```python\nwith open('data.txt', 'r') as file:\n    line = file.readline()\nprint(line.strip())\n```",
    options: ["Hello", "World", "Hello World", "Error"],
    correctAnswer: "Hello",
    explanation: "`file.readline()` reads the first line ('Hello\\n'), and `strip()` removes the newline, yielding 'Hello'."
  },
  {
    id: 13,
    text: "What does the `'a'` mode do when opening a file?",
    options: ["Reads the file", "Overwrites the file", "Appends to the file", "Creates an empty file"],
    correctAnswer: "Appends to the file",
    explanation: "The `'a'` mode opens a file for appending, adding new content to the end."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\ntry:\n    my_list = [1, 2]\n    print(my_list[2])\nexcept IndexError:\n    print('Out of range')\n```",
    options: ["1", "2", "Out of range", "Error"],
    correctAnswer: "Out of range",
    explanation: "Accessing index 2 in a list with only 2 elements raises an `IndexError`, so 'Out of range' is printed."
  },
  {
    id: 15,
    text: "Which exception is raised when a key is not found in a dictionary?",
    options: ["KeyError", "IndexError", "ValueError", "TypeError"],
    correctAnswer: "KeyError",
    explanation: "A `KeyError` is raised when trying to access a non-existent key in a dictionary."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nmy_dict = {'a': 1}\ntry:\n    print(my_dict['b'])\nexcept KeyError:\n    print('Key not found')\n```",
    options: ["1", "Key not found", "None", "Error"],
    correctAnswer: "Key not found",
    explanation: "Accessing the non-existent key 'b' raises a `KeyError`, so 'Key not found' is printed."
  },
  {
    id: 17,
    text: "What does the `.write()` method do when writing to a file?",
    options: ["Reads a line", "Writes a string to the file", "Appends a line", "Closes the file"],
    correctAnswer: "Writes a string to the file",
    explanation: "`.write()` writes a string to the file in the specified mode."
  },
  {
    id: 18,
    text: "What is the output of this code if 'output.txt' is empty?\n```python\nwith open('output.txt', 'w') as file:\n    file.write('Hello')\nwith open('output.txt', 'r') as file:\n    print(file.read())\n```",
    options: ["Hello", "None", "Error", "Empty"],
    correctAnswer: "Hello",
    explanation: "`file.write('Hello')` writes 'Hello' to 'output.txt', which is then read and printed."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\ntry:\n    x = 'text' + 5\nexcept TypeError:\n    print('Type mismatch')\n```",
    options: ["text5", "Type mismatch", "None", "Error"],
    correctAnswer: "Type mismatch",
    explanation: "Adding a string and an integer raises a `TypeError`, so 'Type mismatch' is printed."
  },
  {
    id: 20,
    text: "What does the `.readlines()` method return?",
    options: ["A single string", "A list of lines", "The first line", "The last line"],
    correctAnswer: "A list of lines",
    explanation: "`.readlines()` returns a list where each element is a line from the file."
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
    const isCorrect = answer === basicLevel5Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: basicLevel5Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < basicLevel5Questions.length) {
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
    const percentage = ((score / basicLevel5Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: File Operations and Error Handling
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {basicLevel5Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {basicLevel5Questions.map((question, index) => {
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
    <div className="flex items-center mt-20 justify-center min-h-screen bg-gradient-to-b">
      <motion.div
        className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Python Quiz: File Operations and Error Handling
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {basicLevel5Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {basicLevel5Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {basicLevel5Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === basicLevel5Questions[currentQuestion].correctAnswer
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
              {basicLevel5Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < basicLevel5Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {basicLevel5Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;