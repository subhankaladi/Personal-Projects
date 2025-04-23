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

const advancedLevel2Questions: Question[] = [
  {
    id: 1,
    text: "What is the Global Interpreter Lock (GIL) in Python?",
    options: ["A lock for file access", "A mutex for thread safety", "A memory allocator", "A process scheduler"],
    correctAnswer: "A mutex for thread safety",
    explanation: "The GIL is a mutex in CPython that ensures only one thread executes Python bytecode at a time, preventing race conditions."
  },
  {
    id: 2,
    text: "What is the output of this code?\n```python\nimport threading\nx = 0\ndef increment():\n    global x\n    for _ in range(100000):\n        x += 1\nt1 = threading.Thread(target=increment)\nt2 = threading.Thread(target=increment)\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint(x)\n```",
    options: ["200000", "Less than 200000", "100000", "Error"],
    correctAnswer: "Less than 200000",
    explanation: "Without synchronization, race conditions cause some increments to be lost, resulting in x < 200000."
  },
  {
    id: 3,
    text: "What is a threading.Lock used for?",
    options: ["To pause a thread", "To synchronize thread access", "To create threads", "To terminate threads"],
    correctAnswer: "To synchronize thread access",
    explanation: "A `threading.Lock` ensures only one thread accesses a shared resource at a time, preventing race conditions."
  },
  {
    id: 4,
    text: "What is the output of this code?\n```python\nimport threading\nlock = threading.Lock()\nx = 0\ndef increment():\n    global x\n    with lock:\n        for _ in range(100000):\n            x += 1\nt1 = threading.Thread(target=increment)\nt2 = threading.Thread(target=increment)\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint(x)\n```",
    options: ["200000", "Less than 200000", "100000", "Error"],
    correctAnswer: "200000",
    explanation: "The `lock` ensures thread-safe increments, so x is exactly 200000."
  },
  {
    id: 5,
    text: "What is a race condition?",
    options: ["A deadlock", "Unpredictable behavior due to unsynchronized threads", "A memory leak", "A thread crash"],
    correctAnswer: "Unpredictable behavior due to unsynchronized threads",
    explanation: "Race conditions occur when threads access shared resources concurrently without synchronization."
  },
  {
    id: 6,
    text: "What is the output of this code?\n```python\nimport threading\ndef print_name():\n    print('Subhan')\nt = threading.Thread(target=print_name)\nt.start()\nt.join()\n```",
    options: ["Subhan", "None", "Error", "threading"],
    correctAnswer: "Subhan",
    explanation: "The thread executes `print_name`, printing 'Subhan' before the main thread continues."
  },
  {
    id: 7,
    text: "What is a deadlock?",
    options: ["A race condition", "Threads waiting indefinitely for each other", "A memory leak", "A thread termination"],
    correctAnswer: "Threads waiting indefinitely for each other",
    explanation: "A deadlock occurs when threads hold locks and wait for each other’s locks, causing a standstill."
  },
  {
    id: 8,
    text: "What is the output of this code?\n```python\nimport threading\nlock = threading.Lock()\ndef task():\n    with lock:\n        print('Locked')\nt = threading.Thread(target=task)\nt.start()\nt.join()\n```",
    options: ["Locked", "None", "Error", "threading"],
    correctAnswer: "Locked",
    explanation: "The thread acquires the lock and prints 'Locked' before releasing it."
  },
  {
    id: 9,
    text: "What does `threading.Event` do?",
    options: ["Terminates a thread", "Signals threads to proceed", "Locks a resource", "Creates a thread"],
    correctAnswer: "Signals threads to proceed",
    explanation: "`threading.Event` allows threads to wait for a signal to proceed, used for coordination."
  },
  {
    id: 10,
    text: "What is the output of this code?\n```python\nimport threading\nevent = threading.Event()\ndef wait():\n    event.wait()\n    print('Proceed')\nt = threading.Thread(target=wait)\nt.start()\nevent.set()\nt.join()\n```",
    options: ["Proceed", "None", "Error", "wait"],
    correctAnswer: "Proceed",
    explanation: "`event.set()` signals the waiting thread to proceed, printing 'Proceed'."
  },
  {
    id: 11,
    text: "What is the purpose of `threading.Thread(target=func)`?",
    options: ["To lock a function", "To create a new thread", "To pause a thread", "To join threads"],
    correctAnswer: "To create a new thread",
    explanation: "`threading.Thread(target=func)` creates a new thread that executes `func` when started."
  },
  {
    id: 12,
    text: "What is the output of this code?\n```python\nimport threading\ndef greet():\n    print('Hello, Kaladi')\nt1 = threading.Thread(target=greet)\nt2 = threading.Thread(target=greet)\nt1.start(); t2.start()\nt1.join(); t2.join()\n```",
    options: ["Hello, Kaladi (twice)", "Hello, Kaladi (once)", "Error", "None"],
    correctAnswer: "Hello, Kaladi (twice)",
    explanation: "Both threads execute `greet`, printing 'Hello, Kaladi' twice, though order may vary."
  },
  {
    id: 13,
    text: "What does `thread.join()` do?",
    options: ["Starts a thread", "Waits for a thread to finish", "Locks a thread", "Creates a thread"],
    correctAnswer: "Waits for a thread to finish",
    explanation: "`join()` makes the calling thread wait until the target thread completes execution."
  },
  {
    id: 14,
    text: "What is the output of this code?\n```python\nimport threading\ndef task():\n    pass\nt = threading.Thread(target=task)\nt.start()\nt.join()\nprint('Done')\n```",
    options: ["Done", "None", "Error", "task"],
    correctAnswer: "Done",
    explanation: "The thread executes the empty `task`, and `join()` ensures 'Done' is printed after the thread finishes."
  },
  {
    id: 15,
    text: "What is a thread-safe operation?",
    options: ["An operation that avoids race conditions", "An operation that terminates threads", "An operation that creates threads", "An operation that pauses threads"],
    correctAnswer: "An operation that avoids race conditions",
    explanation: "Thread-safe operations use synchronization (e.g., locks) to prevent race conditions in shared resources."
  },
  {
    id: 16,
    text: "What is the output of this code?\n```python\nimport threading\nlock = threading.Lock()\nx = 0\ndef add():\n    global x\n    with lock:\n        x += 1\nt1 = threading.Thread(target=add)\nt1.start()\nt1.join()\nprint(x)\n```",
    options: ["1", "0", "Error", "None"],
    correctAnswer: "1",
    explanation: "The lock ensures `x` is incremented safely, resulting in `x = 1`."
  },
  {
    id: 17,
    text: "What does `threading.current_thread()` return?",
    options: ["The main thread", "The current thread object", "The thread count", "The thread lock"],
    correctAnswer: "The current thread object",
    explanation: "`threading.current_thread()` returns the Thread object for the currently executing thread."
  },
  {
    id: 18,
    text: "What is the output of this code?\n```python\nimport threading\ndef task():\n    print(threading.current_thread().name)\nt = threading.Thread(target=task)\nt.start()\nt.join()\n```",
    options: ["Thread-1", "MainThread", "Error", "None"],
    correctAnswer: "Thread-1",
    explanation: "The new thread is named 'Thread-1' (or similar), which is printed by `current_thread().name`."
  },
  {
    id: 19,
    text: "What is the purpose of `threading.Semaphore`?",
    options: ["To limit concurrent access to a resource", "To terminate threads", "To create threads", "To pause threads"],
    correctAnswer: "To limit concurrent access to a resource",
    explanation: "`threading.Semaphore` controls access to a shared resource by allowing a fixed number of threads."
  },
  {
    id: 20,
    text: "What is the output of this code?\n```python\nimport threading\nsem = threading.Semaphore(1)\ndef task():\n    with sem:\n        print('Running')\nt = threading.Thread(target=task)\nt.start()\nt.join()\n```",
    options: ["Running", "None", "Error", "sem"],
    correctAnswer: "Running",
    explanation: "The semaphore allows one thread to execute, printing 'Running'."
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
    const isCorrect = answer === advancedLevel2Questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([
      ...answers,
      {
        questionId: advancedLevel2Questions[currentQuestion].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion + 1 < advancedLevel2Questions.length) {
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
    const percentage = ((score / advancedLevel2Questions.length) * 100).toFixed(2);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
            Quiz Results: Concurrency and Multithreading
          </h1>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold text-gray-700">
              Your Score: {score} / {advancedLevel2Questions.length}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage}%
            </p>
            <p className={`text-lg mt-2 ${score >= 16 ? "text-green-600" : "text-red-600"}`}>
              {score >= 16 ? "Excellent! You passed!" : "Keep practicing!"}
            </p>
          </div>
          <div className="space-y-6">
            {advancedLevel2Questions.map((question, index) => {
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
          Python Quiz: Concurrency and Multithreading
        </h1>
        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Question {currentQuestion + 1} of {advancedLevel2Questions.length}
          </p>
          <p className="text-gray-900 text-xl font-semibold whitespace-pre-wrap">
            {advancedLevel2Questions[currentQuestion].text}
          </p>
        </div>
        <div className="space-y-4">
          {advancedLevel2Questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswer === option
                  ? option === advancedLevel2Questions[currentQuestion].correctAnswer
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
              {advancedLevel2Questions[currentQuestion].explanation}
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={nextQuestion}
              whileHover={{ scale: 1.05 }}
            >
              {currentQuestion + 1 < advancedLevel2Questions.length
                ? "Next Question"
                : "See Results"}
            </motion.button>
          </motion.div>
        )}
        <div className="mt-6 text-gray-600">
          Score: {score} / {advancedLevel2Questions.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;