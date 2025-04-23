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

const intermediateLevel5Questions: Question[] = [
  {
    id: 1,
    text: "Which mode opens a file for both reading and writing in Python?",
    options: ["'r'", "'w'", "'r+'", "'a'"],
    correctAnswer: "'r+'",
    explanation: "The `'r+'` mode opens a file for both reading and writing without truncating it."
  },
  {
    id: 2,
    text: "What is the output of this code if 'data.txt' contains 'Hello'?\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\nprint(content)\n```",
    options: ["Hello", "None", "Error", "data.txt"],
    correctAnswer: "Hello",
    explanation: "`file.read()` reads the entire file content, which is 'Hello'."
  },
  {
    id: 3,
    text: "What does the `'a'` mode do when opening a file?",
    options: ["Reads the file", "Overwrites the file", "Appends to the file", "Creates a read-only file"],
    correctAnswer: "Appends to the file",
    explanation: "The `'a'` mode opens a file for appending, adding content to the end."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\nwith open('output.txt', 'w') as file:\n    file.write('Karachi')\nwith open('output.txt', 'r') as file:\n    print(file.read())\n```",
    options: ["Karachi", "None", "Error", "output.txt"],
    correctAnswer: "Karachi",
    explanation: "`file.write('Karachi')` writes 'Karachi' to the file, which is then read and printed."
  },
  {
    id: 5,
    text: "What does the `with` statement ensure when handling files?",
    options: ["File is renamed", "File is automatically closed", "File is copied", "File is locked"],
    correctAnswer: "File is automatically closed",
    explanation: "The `with` statement ensures the file is closed after operations, even if an error occurs."
  },
  {
    id: 6,
    text: "What is the output of this code if 'data.txt' contains 'Line1\\nLine2'?\n```python\nwith open('data.txt', 'r') as file:\n    lines = file.readlines()\nprint(len(lines))\n```",
    options: ["2", "1", "None", "Error"],
    correctAnswer: "2",
    explanation: "`file.readlines()` returns a list of lines, and there are 2 lines in the file."
  },
  {
    id: 7,
    text: "What is a regular expression in Python?",
    options: ["A file operation", "A pattern-matching tool", "A data structure", "A loop construct"],
    correctAnswer: "A pattern-matching tool",
    explanation: "Regular expressions (regex) are used to match and manipulate strings based on patterns."
  },
  {
    id: 8,
    text: "Which module is used for regular expressions in Python?",
    options: ["math", "re", "os", "sys"],
    correctAnswer: "re",
    explanation: "The `re` module provides functions for working with regular expressions."
  },
  {
    id: 9,
    text: "What is the output of this code?\n```python\nimport re\ntext = 'hello world'\nmatch = re.search(r'world', text)\nprint(match.group())\n```",
    options: ["world", "hello", "None", "Error"],
    correctAnswer: "world",
    explanation: "`re.search(r'world', text)` finds 'world', and `match.group()` returns the matched string."
  },
  {
    id: 10,
    text: "What does the `re.match()` function do?",
    options: ["Matches at the end of a string", "Matches anywhere in a string", "Matches at the start of a string", "Replaces a string"],
    correctAnswer: "Matches at the start of a string",
    explanation: "`re.match()` checks for a pattern match only at the beginning of the string."
  },
  {
    id: 11,
    text: "What is the output of this code?\n```python\nimport re\ntext = '123abc'\nmatch = re.match(r'\\d+', text)\nprint(match.group())\n```",
    options: ["123", "abc", "None", "Error"],
    correctAnswer: "123",
    explanation: "`r'\\d+'` matches one or more digits at the start, so `match.group()` returns '123'."
  },
  {
    id: 12,
    text: "What does the `re.findall()` function return?",
    options: ["First match", "All matches as strings", "All matches as match objects", "None"],
    correctAnswer: "All matches as strings",
    explanation: "`re.findall()` returns all non-overlapping matches of a pattern in a string as a list of strings."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\nimport re\ntext = 'a1b2c3'\nmatches = re.findall(r'\\d', text)\nprint(matches)\n```",
    options: ["['1', '2', '3']", "['a', 'b', 'c']", "['a1', 'b2', 'c3']", "[]"],
    correctAnswer: "['1', '2', '3']",
    explanation: "`r'\\d'` matches any digit, so `findall()` returns all digits in the string."
  },
  {
    id: 14,
    text: "What does the `re.sub()` function do?",
    options: ["Splits a string", "Replaces matches", "Finds matches", "Joins strings"],
    correctAnswer: "Replaces matches",
    explanation: "`re.sub()` replaces all occurrences of a pattern in a string with a replacement string."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\nimport re\ntext = 'Hello World'\nresult = re.sub(r'World', 'Python', text)\nprint(result)\n```",
    options: ["Hello Python", "Hello World", "Python World", "Error"],
    correctAnswer: "Hello Python",
    explanation: "`re.sub()` replaces 'World' with 'Python' in the string."
  },
  {
    id: 16,
    text: "What is a raw string in Python regex?",
    options: ["A string with 'r' prefix", "A string with 'raw' prefix", "A string with '\\' prefix", "A string with 's' prefix"],
    correctAnswer: "A string with 'r' prefix",
    explanation: "Raw strings (prefixed with 'r') treat backslashes as literal characters, useful in regex patterns."
  },
  {
    id: 17,
    text: "What does `\\d` represent in regex?",
    options: ["Any character", "Any digit", "Any letter", "Any space"],
    correctAnswer: "Any digit",
    explanation: "`\\d` matches any decimal digit (0-9) in regular expressions."
  },
  {
    id: 18,
    text: "What does `\\w` represent in regex?",
    options: ["Any word character", "Any whitespace", "Any digit", "Any special character"],
    correctAnswer: "Any word character",
    explanation: "`\\w` matches any word character (letters, digits, and underscore)."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\nimport re\ntext = 'abc123'\nmatch = re.search(r'\\d+$', text)\nprint(match.group())\n```",
    options: ["123", "abc", "None", "Error"],
    correctAnswer: "123",
    explanation: "`\\d+$` matches one or more digits at the end of the string."
  },
  {
    id: 20,
    text: "What does the `*` quantifier mean in regex?",
    options: ["Zero or one", "One or more", "Zero or more", "Exactly one"],
    correctAnswer: "Zero or more",
    explanation: "The `*` quantifier matches zero or more occurrences of the preceding element."
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
    const isCorrect = answer === intermediateLevel5Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: intermediateLevel5Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < intermediateLevel5Questions.length) {
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
    const percentage = ((score / intermediateLevel5Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: File Handling & Regular Expressions
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {intermediateLevel5Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {intermediateLevel5Questions.map((question, index) => {
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
                  <p className="text-gray-500 mt-2">
                    Explanation: {question.explanation}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <motion.div
        className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          File Handling & Regular Expressions Quiz
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 text-center">
            Question {currentQuestion + 1} of {intermediateLevel5Questions.length}
          </p>
        </div>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xl text-gray-800 mb-6">
            {intermediateLevel5Questions[currentQuestion].text}
          </p>
          <div className="space-y-3">
            {intermediateLevel5Questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  selectedAnswer === option
                    ? option === intermediateLevel5Questions[currentQuestion].correctAnswer
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => !selectedAnswer && handleAnswer(option)}
                disabled={!!selectedAnswer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 rounded-lg"
            >
              <p className="text-blue-800">
                {intermediateLevel5Questions[currentQuestion].explanation}
              </p>
            </motion.div>
          )}
          <div className="mt-6 flex justify-end">
            <button
              onClick={nextQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!selectedAnswer}
            >
              {currentQuestion + 1 === intermediateLevel5Questions.length ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Quiz;