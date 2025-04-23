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

const advancedLevel3Questions: Question[] = [
  {
    id: 1,
    text: "What is a decorator in Python?",
    options: ["A class method", "A function that modifies another function", "A variable scope", "A loop construct"],
    correctAnswer: "A function that modifies another function",
    explanation: "A decorator is a function that wraps another function or class to extend or modify its behavior."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper():\n        return func() + ' Subhan'\n    return wrapper\n@decorator\ndef greet():\n    return 'Hello'\nprint(greet())\n```",
    options: ["Hello Subhan", "Hello", "Error", "None"],
    correctAnswer: "Hello Subhan",
    explanation: "The `@decorator` wraps `greet`, appending ' Subhan' to its return value, resulting in 'Hello Subhan'."
  },
  {
    id: 3,
    text: "What is the purpose of the `@` symbol in decorators?",
    options: ["To call a function", "To apply a decorator to a function", "To define a class", "To create a variable"],
    correctAnswer: "To apply a decorator to a function",
    explanation: "The `@` symbol is syntactic sugar to apply a decorator to a function or method."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\ndef add_city(func):\n    def wrapper():\n        return f'{func()} from Karachi'\n    return wrapper\n@add_city\ndef name():\n    return 'Kaladi'\nprint(name())\n```",
    options: ["Kaladi from Karachi", "Kaladi", "Error", "None"],
    correctAnswer: "Kaladi from Karachi",
    explanation: "The `@add_city` decorator wraps `name`, appending ' from Karachi', resulting in 'Kaladi from Karachi'."
  },
  {
    id: 5,
    text: "What is a metaclass in Python?",
    options: ["A class decorator", "A class that defines the behavior of classes", "A function wrapper", "A variable scope"],
    correctAnswer: "A class that defines the behavior of classes",
    explanation: "A metaclass is a class of a class, controlling how classes are created and behave."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nclass Meta(type):\n    def __new__(cls, name, bases, attrs):\n        attrs['city'] = 'Karachi'\n        return super().__new__(cls, name, bases, attrs)\nclass MyClass(metaclass=Meta):\n    pass\nprint(MyClass.city)\n```",
    options: ["Karachi", "None", "Error", "Meta"],
    correctAnswer: "Karachi",
    explanation: "The `Meta` metaclass adds a `city` attribute to `MyClass` during creation, so `MyClass.city` is 'Karachi'."
  },
  {
    id: 7,
    text: "What is the purpose of `__new__` in a metaclass?",
    options: ["To call a method", "To create a class instance", "To define class behavior", "To initialize an instance"],
    correctAnswer: "To create a class instance",
    explanation: "`__new__` in a metaclass is used to create the class object before it is initialized."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper(*args):\n        return func(*args).upper()\n    return wrapper\n@decorator\ndef greet(name):\n    return f'hello {name}'\nprint(greet('Subhan'))\n```",
    options: ["HELLO SUBHAN", "hello Subhan", "Error", "None"],
    correctAnswer: "HELLO SUBHAN",
    explanation: "The decorator converts the output of `greet` to uppercase, resulting in 'HELLO SUBHAN'."
  },
  {
    id: 9,
    text: "What is the output of this code?\n```python\nclass Meta(type):\n    def __new__(cls, name, bases, attrs):\n        attrs['greet'] = lambda self: 'Hello'\n        return super().__new__(cls, name, bases, attrs)\nclass MyClass(metaclass=Meta):\n    pass\nprint(MyClass().greet())\n```",
    options: ["Hello", "None", "Error", "greet"],
    correctAnswer: "Hello",
    explanation: "The metaclass adds a `greet` method to `MyClass`, which returns 'Hello' when called."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper():\n        print('Before')\n        func()\n        print('After')\n    return wrapper\n@decorator\ndef task():\n    print('Task')\ntask()\n```",
    options: ["Before\nTask\nAfter", "Task", "Error", "Before\nAfter"],
    correctAnswer: "Before\nTask\nAfter",
    explanation: "The decorator prints 'Before', calls `task` (prints 'Task'), then prints 'After'."
  },
  {
    id: 11,
    text: "What is the role of `functools.wraps` in decorators?",
    options: ["To create a class", "To preserve the original function’s metadata", "To lock a function", "To call a function"],
    correctAnswer: "To preserve the original function’s metadata",
    explanation: "`functools.wraps` ensures the wrapped function retains the original function’s name, docstring, etc."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\nimport functools\ndef decorator(func):\n    @functools.wraps(func)\n    def wrapper():\n        return func()\n    return wrapper\n@decorator\ndef greet():\n    return 'Hello'\nprint(greet.__name__)\n```",
    options: ["greet", "wrapper", "Error", "decorator"],
    correctAnswer: "greet",
    explanation: "`functools.wraps` preserves the original function’s `__name__`, so it remains 'greet'."
  },
  {
    id: 13,
    text: "What is the output of this code?\n```python\ndef class_decorator(cls):\n    cls.city = 'Karachi'\n    return cls\n@class_decorator\nclass MyClass:\n    pass\nprint(MyClass.city)\n```",
    options: ["Karachi", "None", "Error", "MyClass"],
    correctAnswer: "Karachi",
    explanation: "The class decorator adds a `city` attribute to `MyClass`, so `MyClass.city` is 'Karachi'."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n@decorator\ndef number():\n    return 5\nprint(number())\n```",
    options: ["10", "5", "Error", "None"],
    correctAnswer: "10",
    explanation: "The decorator doubles the return value of `number`, so `5 * 2 = 10`."
  },
  {
    id: 15,
    text: "What is the output of this code?\n```python\nclass Meta(type):\n    def __new__(cls, name, bases, attrs):\n        attrs['name'] = 'Subhan'\n        return super().__new__(cls, name, bases, attrs)\nclass MyClass(metaclass=Meta):\n    pass\nprint(MyClass.name)\n```",
    options: ["Subhan", "None", "Error", "Meta"],
    correctAnswer: "Subhan",
    explanation: "The metaclass adds a `name` attribute to `MyClass`, so `MyClass.name` is 'Subhan'."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper():\n        return func().upper()\n    return wrapper\n@decorator\ndef greet():\n    return 'hello'\nprint(greet())\n```",
    options: ["HELLO", "hello", "Error", "None"],
    correctAnswer: "HELLO",
    explanation: "The decorator converts the output of `greet` to uppercase, resulting in 'HELLO'."
  },
  {
    id: 17,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper():\n        return func() + 1\n    return wrapper\n@decorator\ndef number():\n    return 10\nprint(number())\n```",
    options: ["11", "10", "Error", "None"],
    correctAnswer: "11",
    explanation: "The decorator adds 1 to the return value of `number`, so `10 + 1 = 11`."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nclass Meta(type):\n    def __call__(cls, *args, **kwargs):\n        print('Creating instance')\n        return super().__call__(*args, **kwargs)\nclass MyClass(metaclass=Meta):\n    pass\nMyClass()\n```",
    options: ["Creating instance", "None", "Error", "MyClass"],
    correctAnswer: "Creating instance",
    explanation: "The metaclass’s `__call__` method is invoked when creating an instance, printing 'Creating instance'."
  },
  {
    id: 19,
    text: "What is the output of this code?\n```python\ndef decorator(func):\n    def wrapper():\n        print('Decorated')\n        func()\n    return wrapper\n@decorator\ndef task():\n    print('Task')\ntask()\n```",
    options: ["Decorated\nTask", "Task", "Error", "Decorated"],
    correctAnswer: "Decorated\nTask",
    explanation: "The decorator prints 'Decorated', then calls `task`, which prints 'Task'."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nclass Meta(type):\n    def __new__(cls, name, bases, attrs):\n        attrs['info'] = lambda cls: 'Class Info'\n        return super().__new__(cls, name, bases, attrs)\nclass MyClass(metaclass=Meta):\n    pass\nprint(MyClass.info())\n```",
    options: ["Class Info", "None", "Error", "info"],
    correctAnswer: "Class Info",
    explanation: "The metaclass adds a class method `info` to `MyClass`, which returns 'Class Info'."
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
    const isCorrect = answer === advancedLevel3Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: advancedLevel3Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < advancedLevel3Questions.length) {
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
    const percentage = ((score / advancedLevel3Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Decorators and Metaclasses
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {advancedLevel3Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {advancedLevel3Questions.map((question, index) => {
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
          Python Quiz: Decorators and Metaclasses
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {advancedLevel3Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {advancedLevel3Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {advancedLevel3Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === advancedLevel3Questions[currentQuestion].correctAnswer
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
              {advancedLevel3Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < advancedLevel3Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {advancedLevel3Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;