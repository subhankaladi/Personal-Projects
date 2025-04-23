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

const advancedLevel1Questions: Question[] = [
  {
    id: 1,
    text: "What is the time complexity of accessing an element in a Python list by index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: "O(1)",
    explanation: "Lists in Python are implemented as dynamic arrays, allowing constant-time O(1) access to elements by index."
  },
  {
    id: 2,
    text: "What happens when you try to access list[10] in a list with 5 elements?",
    options: ["Returns None", "Raises IndexError", "Returns 0", "Extends the list"],
    correctAnswer: "Raises IndexError",
    explanation: "Accessing an index beyond the list's length raises an IndexError, as Python does not automatically extend lists."
  },
  {
    id: 3,
    text: "What is the output of this code?\n```python\nlst = [1, 2, 3]\nlst[1:2] = [4, 5]\nprint(lst)\n```",
    options: ["[1, 4, 5, 3]", "[1, 4, 5]", "[1, 2, 4, 5, 3]", "[1, 2, 3, 4, 5]"],
    correctAnswer: "[1, 4, 5, 3]",
    explanation: "Slice assignment `lst[1:2]` replaces the element at index 1 with the new sequence [4, 5], resulting in [1, 4, 5, 3]."
  },
  {
    id: 4,
    text: "How is a Python dictionary implemented internally?",
    options: ["Linked list", "Hash table", "Binary tree", "Array"],
    correctAnswer: "Hash table",
    explanation: "Python dictionaries use a hash table for O(1) average-case lookup, insertion, and deletion."
  },
  {
    id: 5,
    text: "What is the output of this code?\n```python\nd = {'name': 'Subhan'}\nd['name'] = d.pop('name')\nprint(d)\n```",
    options: ["{'name': 'Subhan'}", "{}", "{'name': None}", "Error"],
    correctAnswer: "{'name': 'Subhan'}",
    explanation: "`pop('name')` removes 'name' and returns its value ('Subhan'), which is reassigned to 'name', resulting in {'name': 'Subhan'}."
  },
  {
    id: 6,
    text: "What is the time complexity of checking if a key exists in a dictionary?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: "O(1)",
    explanation: "Dictionary key lookups use a hash table, providing O(1) average-case time complexity."
  },
  {
    id: 7,
    text: "What is the output of this code?\n```python\nt = (1, [2, 3], 4)\nt[1][0] = 5\nprint(t)\n```",
    options: ["(1, [5, 3], 4)", "(1, [2, 3], 4)", "Error", "(5, [2, 3], 4)"],
    correctAnswer: "(1, [5, 3], 4)",
    explanation: "Tuples are immutable, but their mutable elements (like lists) can be modified. `t[1][0] = 5` changes the list to [5, 3]."
  },
  {
    id: 8,
    text: "What is a set in Python used for?",
    options: ["Storing ordered elements", "Storing unique elements", "Storing key-value pairs", "Storing sorted elements"],
    correctAnswer: "Storing unique elements",
    explanation: "Sets store unique, unordered elements, optimized for membership testing and set operations."
  },
  {
    id: 9,
    text: "What is the output of this code?\n```python\ns = {1, 2, 2, 3}\nprint(len(s))\n```",
    options: ["3", "4", "2", "Error"],
    correctAnswer: "3",
    explanation: "Sets store unique elements. `{1, 2, 2, 3}` becomes `{1, 2, 3}`, so `len(s)` is 3."
  },
  {
    id: 10,
    text: "What is the time complexity of adding an element to a set?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: "O(1)",
    explanation: "Set operations like adding an element use a hash table, with O(1) average-case time complexity."
  },
  {
    id: 11,
    text: "What is the output of this code?\n```python\nlst = [1, 2, 3]\nlst.extend([4, 5])\nprint(lst)\n```",
    options: ["[1, 2, 3, 4, 5]", "[1, 2, 3, [4, 5]]", "[1, 2, 3]", "Error"],
    correctAnswer: "[1, 2, 3, 4, 5]",
    explanation: "`extend` appends each element of the iterable [4, 5] to the list, resulting in [1, 2, 3, 4, 5]."
  },
  {
    id: 12,
    text: "What is the difference between a list and a tuple in Python?",
    options: ["Lists are immutable; tuples are mutable", "Lists are mutable; tuples are immutable", "Both are mutable", "Both are immutable"],
    correctAnswer: "Lists are mutable; tuples are immutable",
    explanation: "Lists can be modified (e.g., append, remove), while tuples cannot be changed after creation."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\nd = {'name': 'Kaladi'}\nd.update({'city': 'Karachi'})\nprint(d)\n```",
    options: ["{'name': 'Kaladi', 'city': 'Karachi'}", "{'city': 'Karachi'}", "{'name': 'Kaladi'}", "Error"],
    correctAnswer: "{'name': 'Kaladi', 'city': 'Karachi'}",
    explanation: "`update` adds or updates key-value pairs in the dictionary, resulting in {'name': 'Kaladi', 'city': 'Karachi'}."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\ns = {1, 2, 3}\ns.discard(4)\nprint(s)\n```",
    options: ["{1, 2, 3}", "{1, 2, 3, 4}", "Error", "None"],
    correctAnswer: "{1, 2, 3}",
    explanation: "`discard` removes an element if present, but does nothing if the element (4) is not in the set."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\nlst = [1, 2, 3]\nlst.insert(1, 4)\nprint(lst)\n```",
    options: ["[1, 4, 2, 3]", "[1, 2, 4, 3]", "[1, 2, 3, 4]", "Error"],
    correctAnswer: "[1, 4, 2, 3]",
    explanation: "`insert(1, 4)` adds 4 at index 1, shifting other elements right, resulting in [1, 4, 2, 3]."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nd = {'a': 1}\nd.setdefault('b', 2)\nprint(d)\n```",
    options: ["{'a': 1, 'b': 2}", "{'a': 1}", "{'b': 2}", "Error"],
    correctAnswer: "{'a': 1, 'b': 2}",
    explanation: "`setdefault('b', 2)` adds 'b': 2 if 'b' is not in the dictionary, resulting in {'a': 1, 'b': 2}."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\nt = (1, 2, 3)\nprint(t + (4,))\n```",
    options: ["(1, 2, 3, 4)", "(1, 2, 3)", "(4, 1, 2, 3)", "Error"],
    correctAnswer: "(1, 2, 3, 4)",
    explanation: "Tuple concatenation with `+` creates a new tuple, combining (1, 2, 3) and (4,) into (1, 2, 3, 4)."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\ns = {1, 2}\ns.add(2)\nprint(s)\n```",
    options: ["{1, 2}", "{1, 2, 2}", "Error", "None"],
    correctAnswer: "{1, 2}",
    explanation: "`add(2)` does nothing since 2 is already in the set, as sets only store unique elements."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\nlst = [1, 2, 3]\nlst[1:] = [4]\nprint(lst)\n```",
    options: ["[1, 4]", "[1, 2, 4]", "[1, 4, 3]", "Error"],
    correctAnswer: "[1, 4]",
    explanation: "Slice assignment `lst[1:] = [4]` replaces all elements from index 1 onward with [4], resulting in [1, 4]."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nd = {'a': 1, 'b': 2}\nprint(d.get('c', 3))\n```",
    options: ["3", "None", "Error", "2"],
    correctAnswer: "3",
    explanation: "`get('c', 3)` returns 3 if 'c' is not found, as it provides a default value for missing keys."
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
    const isCorrect = answer === advancedLevel1Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: advancedLevel1Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < advancedLevel1Questions.length) {
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
    const percentage = ((score / advancedLevel1Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Advanced Data Structures
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {advancedLevel1Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {advancedLevel1Questions.map((question, index) => {
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
          Python Quiz: Advanced Data Structures
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {advancedLevel1Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {advancedLevel1Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {advancedLevel1Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === advancedLevel1Questions[currentQuestion].correctAnswer
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
              {advancedLevel1Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < advancedLevel1Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {advancedLevel1Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;