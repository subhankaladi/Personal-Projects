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

const advancedLevel4Questions: Question[] = [
  {
    id: 1,
    text: "What is the role of Python’s garbage collector?",
    options: ["To compile code", "To manage memory allocation", "To optimize loops", "To handle exceptions"],
    correctAnswer: "To manage memory allocation",
    explanation: "Python’s garbage collector automatically frees memory by reclaiming objects no longer referenced."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\nx = [1, 2, 3]\ny = x\nx[0] = 4\nprint(y)\n```",
    options: ["[4, 2, 3]", "[1, 2, 3]", "Error", "None"],
    correctAnswer: "[4, 2, 3]",
    explanation: "`y = x` creates a reference to the same list. Modifying `x[0]` affects `y`, resulting in [4, 2, 3]."
  },
  {
    id: 3,
    text: "What is a reference cycle in Python?",
    options: ["A loop in code", "Objects referencing each other", "A memory leak", "A function call"],
    correctAnswer: "Objects referencing each other",
    explanation: "A reference cycle occurs when objects reference each other, preventing garbage collection unless handled."
  },
  {
    id: 4,
    text: "What happens when a list references itself?\n```python\nx = []\nx.append(x)\ndel x\n```",
    options: ["Memory is freed", "Reference cycle persists", "Error", "None"],
    correctAnswer: "Reference cycle persists",
    explanation: "The self-referential list creates a reference cycle, which requires garbage collection to resolve."
  },
  {
    id: 5,
    text: "What does the `id()` function return?",
    options: ["Object’s value", "Object’s memory address", "Object’s type", "Object’s size"],
    correctAnswer: "Object’s memory address",
    explanation: "`id()` returns a unique identifier for an object, typically its memory address in CPython."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\na = 42\nb = 42\nprint(id(a) == id(b))\n```",
    options: ["True", "False", "Error", "None"],
    correctAnswer: "True",
    explanation: "Python interns small integers like 42, so `a` and `b` reference the same object, making their `id` equal."
  },
  {
    id: 7,
    text: "What is object interning in Python?",
    options: ["Sharing objects to save memory", "Compiling code", "Optimizing loops", "Creating classes"],
    correctAnswer: "Sharing objects to save memory",
    explanation: "Interning reuses immutable objects (e.g., small integers, some strings) to save memory."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\ns1 = 'Subhan'\ns2 = 'Subhan'\nprint(id(s1) == id(s2))\n```",
    options: ["True", "False", "Error", "None"],
    correctAnswer: "True",
    explanation: "Python interns identical string literals like 'Subhan', so `s1` and `s2` share the same object."
  },
  {
    id: 9,
    text: "What is the purpose of `__slots__` in a class?",
    options: ["To define methods", "To reduce memory usage", "To create decorators", "To handle exceptions"],
    correctAnswer: "To reduce memory usage",
    explanation: "`__slots__` specifies allowed attributes, preventing the creation of `__dict__`, thus saving memory."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nclass MyClass:\n    __slots__ = ['name']\nobj = MyClass()\nobj.name = 'Kaladi'\nobj.city = 'Karachi'\n```",
    options: ["Error", "Sets city", "Sets name", "None"],
    correctAnswer: "Error",
    explanation: "`__slots__` restricts attributes to 'name'. Assigning `city` raises an AttributeError."
  },
  {
    id: 11,
    text: "What is the output of this code?\n```python\nx = [1, 2, 3]\ny = list(x)\nx[0] = 4\nprint(y)\n```",
    options: ["[1, 2, 3]", "[4, 2, 3]", "Error", "None"],
    correctAnswer: "[1, 2, 3]",
    explanation: "`list(x)` creates a new list, so `y` is independent of `x`. Changes to `x` don’t affect `y`."
  },
  {
    id: 12,
    text: "What happens when you assign a new value to a string variable?\n```python\ns = 'hello'\ns = 'world'\n```",
    options: ["Creates a new string object", "Modifies the original string", "Error", "None"],
    correctAnswer: "Creates a new string object",
    explanation: "Strings are immutable. Assigning 'world' to `s` creates a new string object."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\nlst = [[1, 2], [3, 4]]\ncopy = [row[:] for row in lst]\ncopy[0][0] = 5\nprint(lst)\n```",
    options: ["[[1, 2], [3, 4]]", "[[5, 2], [3, 4]]", "Error", "None"],
    correctAnswer: "[[1, 2], [3, 4]]",
    explanation: "The list comprehension creates a new list with new inner lists, so modifying `copy` doesn’t affect `lst`."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\na = 'hello'\nb = a\nb += ' world'\nprint(a)\n```",
    options: ["hello", "hello world", "Error", "None"],
    correctAnswer: "hello",
    explanation: "Strings are immutable. `b += ' world'` creates a new string, leaving `a` unchanged."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\na = 1000\nb = 1000\nprint(id(a) == id(b))\n```",
    options: ["False", "True", "Error", "None"],
    correctAnswer: "False",
    explanation: "Large integers like 1000 are not interned, so `a` and `b` are distinct objects with different `id` values."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nclass MyClass:\n    pass\nobj1 = MyClass()\nobj2 = MyClass()\nprint(id(obj1) == id(obj2))\n```",
    options: ["False", "True", "Error", "None"],
    correctAnswer: "False",
    explanation: "Each instance of `MyClass` is a distinct object with a unique memory address."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\ndef func():\n    x = [1, 2, 3]\n    return id(x)\nprint(func() == func())\n```",
    options: ["False", "True", "Error", "None"],
    correctAnswer: "False",
    explanation: "Each call to `func` creates a new list with a different memory address."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nx = (1, 2, 3)\ny = (1, 2, 3)\nprint(id(x) == id(y))\n```",
    options: ["False", "True", "Error", "None"],
    correctAnswer: "False",
    explanation: "Tuples are immutable, but identical tuples are not guaranteed to be interned, so `x` and `y` have different `id` values."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\nx = [1, 2, 3]\ny = x[:]\nx.append(4)\nprint(y)\n```",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "None"],
    correctAnswer: "[1, 2, 3]",
    explanation: "Slicing `x[:]` creates a new list, so `y` is independent of `x`. Appending to `x` doesn’t affect `y`."
  },
  {
    id: 20,
    text: "What happens to an object when its reference count reaches zero?",
    options: ["It is reused", "It is garbage collected", "It is locked", "It is copied"],
    correctAnswer: "It is garbage collected",
    explanation: "When an object’s reference count reaches zero, Python’s garbage collector reclaims its memory."
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
    const isCorrect = answer === advancedLevel4Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: advancedLevel4Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < advancedLevel4Questions.length) {
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
    const percentage = ((score / advancedLevel4Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Memory Management and Optimization
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {advancedLevel4Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {advancedLevel4Questions.map((question, index) => {
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
          Python Quiz: Memory Management and Optimization
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {advancedLevel4Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {advancedLevel4Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {advancedLevel4Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === advancedLevel4Questions[currentQuestion].correctAnswer
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
              {advancedLevel4Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < advancedLevel4Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {advancedLevel4Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;