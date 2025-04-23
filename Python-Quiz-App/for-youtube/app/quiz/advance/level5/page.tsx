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

const advancedLevel5Questions: Question[] = [
  {
    id: 1,
    text: "What is method resolution order (MRO) in Python?",
    options: ["Order of method execution", "Order of class inheritance", "Order of variable scope", "Order of loop execution"],
    correctAnswer: "Order of class inheritance",
    explanation: "MRO determines the order in which base classes are searched for a method or attribute, using C3 linearization."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\nclass A:\n    def greet(self):\n        return 'Hello from A'\nclass B(A):\n    pass\nclass C(A):\n    def greet(self):\n        return 'Hello from C'\nclass D(B, C):\n    pass\nprint(D().greet())\n```",
    options: ["Hello from C", "Hello from A", "Error", "None"],
    correctAnswer: "Hello from C",
    explanation: "MRO for `D` is [D, B, C, A]. `greet` is found in `C`, so 'Hello from C' is returned."
  },
  {
    id: 3,
    text: "What does the `@property` decorator do?",
    options: ["Defines a class", "Creates a method that acts like an attribute", "Inherits a method", "Locks a variable"],
    correctAnswer: "Creates a method that acts like an attribute",
    explanation: "`@property` allows a method to be accessed like an attribute, enabling controlled access to data."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\nclass Person:\n    def __init__(self):\n        self._name = 'Subhan'\n    @property\n    def name(self):\n        return self._name\np = Person()\nprint(p.name)\n```",
    options: ["Subhan", "None", "Error", "_name"],
    correctAnswer: "Subhan",
    explanation: "The `@property` decorator makes `name` act like an attribute, returning 'Subhan'."
  },
  {
    id: 5,
    text: "What is the purpose of a `@classmethod`?",
    options: ["To access instance variables", "To modify class state", "To create instances", "To lock methods"],
    correctAnswer: "To modify class state",
    explanation: "`@classmethod` defines a method that operates on the class itself, using `cls` to access or modify class state."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nclass MyClass:\n    count = 0\n    @classmethod\n    def increment(cls):\n        cls.count += 1\nMyClass.increment()\nprint(MyClass.count)\n```",
    options: ["1", "0", "Error", "None"],
    correctAnswer: "1",
    explanation: "The `@classmethod` `increment` modifies the class variable `count`, increasing it to 1."
  },
  {
    id: 7,
    text: "What is the output of this code?\n```python\nclass A:\n    def method(self):\n        return 'A'\nclass B(A):\n    def method(self):\n        return super().method() + 'B'\nclass C(B):\n    def method(self):\n        return super().method() + 'C'\nprint(C().method())\n```",
    options: ["ABC", "A", "BC", "Error"],
    correctAnswer: "ABC",
    explanation: "`super()` chains method calls: `C` calls `B`’s `method`, which calls `A`’s, resulting in 'A' + 'B' + 'C'."
  },
  {
    id: 8,
    text: "What is the purpose of `@staticmethod`?",
    options: ["To access instance variables", "To define a method without self or cls", "To modify class state", "To create instances"],
    correctAnswer: "To define a method without self or cls",
    explanation: "`@staticmethod` defines a method that doesn’t receive `self` or `cls`, behaving like a regular function within a class."
  },
  {
    id: 9,
    text: "What is the output of this code?\n```python\nclass MyClass:\n    @staticmethod\n    def greet():\n        return 'Hello, Kaladi'\nprint(MyClass.greet())\n```",
    options: ["Hello, Kaladi", "None", "Error", "greet"],
    correctAnswer: "Hello, Kaladi",
    explanation: "The `@staticmethod` `greet` is called on the class, returning 'Hello, Kaladi'."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nclass A:\n    def __init__(self):\n        self.value = 1\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        self.value = 2\nprint(B().value)\n```",
    options: ["2", "1", "Error", "None"],
    correctAnswer: "2",
    explanation: "`B`’s `__init__` calls `A`’s to set `value = 1`, then overrides it to `value = 2`."
  },
  {
    id: 11,
    text: "What is multiple inheritance in Python?",
    options: ["Inheriting from one class", "Inheriting from multiple classes", "Overriding methods", "Creating instances"],
    correctAnswer: "Inheriting from multiple classes",
    explanation: "Multiple inheritance allows a class to inherit attributes and methods from multiple parent classes."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\nclass A:\n    def info(self):\n        return 'A'\nclass B:\n    def info(self):\n        return 'B'\nclass C(A, B):\n    pass\nprint(C().info())\n```",
    options: ["A", "B", "Error", "None"],
    correctAnswer: "A",
    explanation: "MRO for `C` is [C, A, B]. `info` is found in `A`, so 'A' is returned."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\nclass Person:\n    def __init__(self):\n        self._name = 'Subhan'\n    @property\n    def name(self):\n        return self._name\n    @name.setter\n    def name(self, value):\n        self._name = value\np = Person()\np.name = 'Kaladi'\nprint(p.name)\n```",
    options: ["Kaladi", "Subhan", "Error", "None"],
    correctAnswer: "Kaladi",
    explanation: "The `@name.setter` allows setting the `name` property, changing `_name` to 'Kaladi'."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\nclass MyClass:\n    @staticmethod\n    def add(a, b):\n        return a + b\nprint(MyClass.add(3, 4))\n```",
    options: ["7", "None", "Error", "add"],
    correctAnswer: "7",
    explanation: "The `@staticmethod` `add` returns the sum of 3 and 4, which is 7."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\nclass A:\n    def __init__(self):\n        self.value = 'A'\nclass B(A):\n    def __init__(self):\n        self.value = 'B'\nclass C(B):\n    def __init__(self):\n        super().__init__()\nprint(C().value)\n```",
    options: ["B", "A", "Error", "None"],
    correctAnswer: "B",
    explanation: "`C`’s `__init__` calls `B`’s, which sets `value = 'B'`."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nclass A:\n    def method(self):\n        return 'A'\nclass B(A):\n    def method(self):\n        return super(B, self).method() + 'B'\nprint(B().method())\n```",
    options: ["AB", "A", "B", "Error"],
    correctAnswer: "AB",
    explanation: "`super(B, self)` calls `A`’s `method`, returning 'A', then appends 'B'."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\nclass MyClass:\n    count = 0\n    @classmethod\n    def get_count(cls):\n        return cls.count\nprint(MyClass.get_count())\n```",
    options: ["0", "1", "Error", "None"],
    correctAnswer: "0",
    explanation: "The `@classmethod` `get_count` returns the class variable `count`, which is 0."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nclass A:\n    pass\nclass B:\n    pass\nclass C(A, B):\n    pass\nprint(C.__mro__[1])\n```",
    options: ["A", "B", "C", "Error"],
    correctAnswer: "A",
    explanation: "MRO for `C` is [C, A, B, object]. The second element (`__mro__[1]`) is `A`."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\nclass Person:\n    def __init__(self):\n        self._city = 'Karachi'\n    @property\n    def city(self):\n        return self._city\np = Person()\nprint(p.city)\n```",
    options: ["Karachi", "None", "Error", "_city"],
    correctAnswer: "Karachi",
    explanation: "The `@property` decorator makes `city` act like an attribute, returning 'Karachi'."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nclass A:\n    def info(self):\n        return 'A'\nclass B:\n    def info(self):\n        return 'B'\nclass C(B, A):\n    pass\nprint(C().info())\n```",
    options: ["B", "A", "Error", "None"],
    correctAnswer: "B",
    explanation: "MRO for `C` is [C, B, A]. `info` is found in `B`, so 'B' is returned."
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
    const isCorrect = answer === advancedLevel5Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: advancedLevel5Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < advancedLevel5Questions.length) {
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
    const percentage = ((score / advancedLevel5Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Advanced Object-Oriented Programming
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {advancedLevel5Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {advancedLevel5Questions.map((question, index) => {
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
          Python Quiz: Advanced Object-Oriented Programming
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {advancedLevel5Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {advancedLevel5Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {advancedLevel5Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === advancedLevel5Questions[currentQuestion].correctAnswer
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
              {advancedLevel5Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < advancedLevel5Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {advancedLevel5Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;