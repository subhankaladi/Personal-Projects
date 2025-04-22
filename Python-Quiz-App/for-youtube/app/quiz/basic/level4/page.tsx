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

const basicLevel4Questions: Question[] = [
  {
    id: 1,
    text: "How do you create a list in Python?",
    options: ["[1, 2, 3]", "(1, 2, 3)", "{1, 2, 3}", "<1, 2, 3>"],
    correctAnswer: "[1, 2, 3]",
    explanation: "Lists in Python are created using square brackets `[ ]` with comma-separated elements."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\nmy_list = [1, 2, 3]\nprint(my_list[1])\n```",
    options: ["1", "2", "3", "Error"],
    correctAnswer: "2",
    explanation: "List indexing starts at 0, so `my_list[1]` accesses the second element, which is 2."
  },
  {
    id: 3,
    text: "Which method adds an element to the end of a list?",
    options: [".add()", ".append()", ".extend()", ".insert()"],
    correctAnswer: ".append()",
    explanation: "The `.append()` method adds a single element to the end of a list."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\nmy_list = [1, 2]\nmy_list.append(3)\nprint(my_list)\n```",
    options: ["[1, 2, 3]", "[1, 2]", "[3, 1, 2]", "Error"],
    correctAnswer: "[1, 2, 3]",
    explanation: "`my_list.append(3)` adds 3 to the end of the list, resulting in `[1, 2, 3]`."
  },
  {
    id: 5,
    text: "What does the `.pop()` method do to a list?",
    options: ["Removes and returns the last element", "Removes the first element", "Adds an element", "Clears the list"],
    correctAnswer: "Removes and returns the last element",
    explanation: "`.pop()` removes and returns the last element of a list by default."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nmy_list = [1, 2, 3]\nmy_list.pop()\nprint(my_list)\n```",
    options: ["[1, 2]", "[1, 2, 3]", "[2, 3]", "Error"],
    correctAnswer: "[1, 2]",
    explanation: "`my_list.pop()` removes the last element (3), leaving `[1, 2]`."
  },
  {
    id: 7,
    text: "How do you create a dictionary in Python?",
    options: ["{'key': 'value'}", "['key': 'value']", "('key': 'value')", "<'key': 'value'>"],
    correctAnswer: "{'key': 'value'}",
    explanation: "Dictionaries are created using curly braces `{}` with key-value pairs separated by colons."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\nmy_dict = {'name': 'Subhan', 'city': 'Karachi'}\nprint(my_dict['city'])\n```",
    options: ["Subhan", "Karachi", "name", "Error"],
    correctAnswer: "Karachi",
    explanation: "`my_dict['city']` accesses the value associated with the key 'city', which is 'Karachi'."
  },
  {
    id: 9,
    text: "Which method retrieves a value from a dictionary with a default if the key is not found?",
    options: [".get()", ".pop()", ".keys()", ".values()"],
    correctAnswer: ".get()",
    explanation: "`.get(key, default)` returns the value for `key` or `default` if the key is not found."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nmy_dict = {'a': 1}\nprint(my_dict.get('b', 0))\n```",
    options: ["1", "0", "None", "Error"],
    correctAnswer: "0",
    explanation: "Since 'b' is not a key, `my_dict.get('b', 0)` returns the default value 0."
  },
  {
    id: 11,
    text: "What does the `.keys()` method return for a dictionary?",
    options: ["A list of keys", "A list of values", "A list of key-value pairs", "The dictionary itself"],
    correctAnswer: "A list of keys",
    explanation: "`.keys()` returns a view of the dictionary's keys."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\nmy_dict = {'a': 1, 'b': 2}\nprint(list(my_dict.keys()))\n```",
    options: ["['a', 'b']", "[1, 2]", "['a': 1, 'b': 2]", "Error"],
    correctAnswer: "['a', 'b']",
    explanation: "`my_dict.keys()` returns a view of keys, and `list()` converts it to `['a', 'b']`."
  },
  {
    id: 13,
    text: "What does the `.extend()` method do to a list?",
    options: ["Adds multiple elements to the end", "Removes elements", "Replaces elements", "Sorts the list"],
    correctAnswer: "Adds multiple elements to the end",
    explanation: "`.extend()` adds all elements from an iterable to the end of a list."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\nmy_list = [1]\nmy_list.extend([2, 3])\nprint(my_list)\n```",
    options: ["[1, 2, 3]", "[1, [2, 3]]", "[2, 3]", "Error"],
    correctAnswer: "[1, 2, 3]",
    explanation: "`my_list.extend([2, 3])` adds 2 and 3 to the list, resulting in `[1, 2, 3]`."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\nmy_list = [3, 1, 2]\nmy_list.sort()\nprint(my_list)\n```",
    options: ["[1, 2, 3]", "[3, 1, 2]", "[2, 1, 3]", "Error"],
    correctAnswer: "[1, 2, 3]",
    explanation: "`my_list.sort()` sorts the list in ascending order, resulting in `[1, 2, 3]`."
  },
  {
    id: 16,
    text: "What does the `.items()` method return for a dictionary?",
    options: ["A list of key-value pairs", "A list of keys", "A list of values", "The dictionary itself"],
    correctAnswer: "A list of key-value pairs",
    explanation: "`.items()` returns a view of the dictionary's key-value pairs as tuples."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\nmy_dict = {'a': 1, 'b': 2}\nprint(list(my_dict.items()))\n```",
    options: ["[('a', 1), ('b', 2)]", "['a', 'b']", "[1, 2]", "Error"],
    correctAnswer: "[('a', 1), ('b', 2)]",
    explanation: "`my_dict.items()` returns key-value pairs, and `list()` converts it to `[('a', 1), ('b', 2)]`."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nmy_list = [1, 2, 3]\nmy_list.insert(1, 4)\nprint(my_list)\n```",
    options: ["[1, 4, 2, 3]", "[1, 2, 4, 3]", "[1, 2, 3, 4]", "Error"],
    correctAnswer: "[1, 4, 2, 3]",
    explanation: "`my_list.insert(1, 4)` inserts 4 at index 1, shifting other elements right."
  },
  {
    id: 19,
    text: "What happens if you access a non-existent key in a dictionary without `.get()`?",
    options: ["Returns None", "Raises KeyError", "Returns 0", "Creates the key"],
    correctAnswer: "Raises KeyError",
    explanation: "Accessing a non-existent key with `my_dict[key]` raises a `KeyError`."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nmy_list = [1, 2, 3]\nprint(len(my_list))\n```",
    options: ["3", "2", "4", "Error"],
    correctAnswer: "3",
    explanation: "`len(my_list)` returns the number of elements in the list, which is 3."
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
    const isCorrect = answer === basicLevel4Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: basicLevel4Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < basicLevel4Questions.length) {
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
    const percentage = ((score / basicLevel4Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center mt-20 justify-center min-h-screen ">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Lists and Dictionaries
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {basicLevel4Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {basicLevel4Questions.map((question, index) => {
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
          Python Quiz: Lists and Dictionaries
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {basicLevel4Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {basicLevel4Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {basicLevel4Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === basicLevel4Questions[currentQuestion].correctAnswer
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
              {basicLevel4Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < basicLevel4Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {basicLevel4Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;