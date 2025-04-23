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

const intermediateLevel2Questions: Question[] = [
  {
    id: 1,
    text: "What is a class in Python?",
    options: ["A function definition", "A blueprint for objects", "A module", "A variable type"],
    correctAnswer: "A blueprint for objects",
    explanation: "A class defines the structure and behavior of objects, serving as a template for creating instances."
  },
  {
    id: 2,
    text: "How do you define a class in Python?",
    options: ["class MyClass:", "def MyClass:", "object MyClass:", "struct MyClass:"],
    correctAnswer: "class MyClass:",
    explanation: "Classes are defined using the `class` keyword followed by the class name and a colon."
  },
  {
    id: 3,
    text: "What is the output of this code?\n```python\nclass Person:\n    def __init__(self, name):\n        self.name = name\np = Person('Subhan')\nprint(p.name)\n```",
    options: ["Subhan", "Person", "None", "Error"],
    correctAnswer: "Subhan",
    explanation: "The `__init__` method initializes the `name` attribute, and `p.name` accesses it, returning 'Subhan'."
  },
  {
    id: 4,
    text: "What is the purpose of the `__init__` method?",
    options: ["To destroy an object", "To initialize an object", "To define a class", "To inherit a class"],
    correctAnswer: "To initialize an object",
    explanation: "`__init__` is a special method called when an object is created to set its initial state."
  },
  {
    id: 5,
    text: "What is an instance of a class?",
    options: ["A class definition", "An object created from a class", "A method in a class", "A module"],
    correctAnswer: "An object created from a class",
    explanation: "An instance is a specific object created from a class, with its own attributes."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nclass Car:\n    def drive(self):\n        return 'Driving'\nc = Car()\nprint(c.drive())\n```",
    options: ["Driving", "Car", "None", "Error"],
    correctAnswer: "Driving",
    explanation: "The `drive` method returns 'Driving' when called on the `Car` instance `c`."
  },
  {
    id: 7,
    text: "What is inheritance in OOP?",
    options: ["Creating multiple objects", "A class deriving from another class", "Defining methods", "Encapsulating data"],
    correctAnswer: "A class deriving from another class",
    explanation: "Inheritance allows a class to inherit attributes and methods from a parent class."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\nclass Animal:\n    def speak(self):\n        return 'Sound'\nclass Dog(Animal):\n    pass\nd = Dog()\nprint(d.speak())\n```",
    options: ["Sound", "Dog", "None", "Error"],
    correctAnswer: "Sound",
    explanation: "`Dog` inherits from `Animal`, so `d.speak()` calls the inherited `speak` method, returning 'Sound'."
  },
  {
    id: 9,
    text: "What is method overriding?",
    options: ["Defining a method in a parent class", "Redefining a parent class method in a subclass", "Calling a method", "Hiding a method"],
    correctAnswer: "Redefining a parent class method in a subclass",
    explanation: "Overriding occurs when a subclass provides a specific implementation of a parent class method."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nclass Animal:\n    def speak(self):\n        return 'Sound'\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow'\nc = Cat()\nprint(c.speak())\n```",
    options: ["Sound", "Meow", "None", "Error"],
    correctAnswer: "Meow",
    explanation: "`Cat` overrides the `speak` method, so `c.speak()` returns 'Meow'."
  },
  {
    id: 11,
    text: "What is encapsulation in OOP?",
    options: ["Hiding data and exposing methods", "Creating multiple classes", "Inheriting classes", "Overriding methods"],
    correctAnswer: "Hiding data and exposing methods",
    explanation: "Encapsulation restricts access to an object's data, exposing only necessary methods."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\nclass Student:\n    def __init__(self):\n        self.__grade = 85\n    def get_grade(self):\n        return self.__grade\ns = Student()\nprint(s.get_grade())\n```",
    options: ["85", "None", "Error", "Student"],
    correctAnswer: "85",
    explanation: "The `get_grade` method accesses the private `__grade` attribute, returning 85."
  },
  {
    id: 13,
    text: "What does the `self` parameter refer to in a method?",
    options: ["The class", "The instance", "The module", "The parent class"],
    correctAnswer: "The instance",
    explanation: "`self` refers to the instance calling the method, allowing access to its attributes."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\nclass Book:\n    def __init__(self, title):\n        self.title = title\nb = Book('Python')\nprint(b.title)\n```",
    options: ["Python", "Book", "None", "Error"],
    correctAnswer: "Python",
    explanation: "The `__init__` method sets the `title` attribute, and `b.title` accesses it, returning 'Python'."
  },
  {
    id: 15,
    text: "What is a class attribute?",
    options: ["An attribute specific to an instance", "An attribute shared by all instances", "A method in a class", "A private attribute"],
    correctAnswer: "An attribute shared by all instances",
    explanation: "Class attributes are defined in the class body and shared across all instances."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nclass Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\nc1 = Counter()\nc2 = Counter()\nprint(Counter.count)\n```",
    options: ["2", "1", "0", "Error"],
    correctAnswer: "2",
    explanation: "`count` is a class attribute. Each `Counter` instance increments it, so after two instances, `count` is 2."
  },
  {
    id: 17,
    text: "What is polymorphism in OOP?",
    options: ["Using the same interface for different types", "Creating multiple classes", "Hiding data", "Inheriting methods"],
    correctAnswer: "Using the same interface for different types",
    explanation: "Polymorphism allows different classes to be treated as instances of a common parent class."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nclass Shape:\n    def area(self):\n        return 0\nclass Circle(Shape):\n    def area(self):\n        return 3.14 * 2 * 2\nc = Circle()\nprint(c.area())\n```",
    options: ["12.56", "0", "None", "Error"],
    correctAnswer: "12.56",
    explanation: "`Circle` overrides `area`, returning `3.14 * 2 * 2 = 12.56`."
  },
  {
    id: 19,
    text: "What does the `super()` function do?",
    options: ["Creates a new class", "Calls a parent class method", "Defines a method", "Hides a method"],
    correctAnswer: "Calls a parent class method",
    explanation: "`super()` is used to call methods from a parent class in a subclass."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nclass Parent:\n    def __init__(self):\n        self.value = 10\nclass Child(Parent):\n    def __init__(self):\n        super().__init__()\nc = Child()\nprint(c.value)\n```",
    options: ["10", "None", "Error", "Child"],
    correctAnswer: "10",
    explanation: "`super().__init__()` calls the parent’s `__init__`, setting `value` to 10."
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
    const isCorrect = answer === intermediateLevel2Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: intermediateLevel2Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < intermediateLevel2Questions.length) {
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
    const percentage = ((score / intermediateLevel2Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: OOP Basics
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {intermediateLevel2Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {intermediateLevel2Questions.map((question, index) => {
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
          Python Quiz: OOP Basics
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {intermediateLevel2Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {intermediateLevel2Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {intermediateLevel2Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === intermediateLevel2Questions[currentQuestion].correctAnswer
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
              {intermediateLevel2Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < intermediateLevel2Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {intermediateLevel2Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;