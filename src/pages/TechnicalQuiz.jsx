import "./TechnicalQuiz.css";
import { useState } from "react";
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
} from "lucide-react";

import "./TechnicalQuiz.css";

const questions = [
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    answer: "Stack",
  },
  {
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: "CSS",
  },
  {
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: "O(log n)",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "define", "def", "func"],
    answer: "def",
  },
  {
    question: "Which protocol is commonly used for secure web communication?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    answer: "HTTPS",
  },
  {
    question: "Which database language is used to query relational databases?",
    options: ["SQL", "HTML", "CSS", "XML"],
    answer: "SQL",
  },
  {
    question: "Which concept allows a class to acquire properties of another class?",
    options: [
      "Encapsulation",
      "Inheritance",
      "Abstraction",
      "Compilation",
    ],
    answer: "Inheritance",
  },
  {
    question: "Which of these is NOT a JavaScript framework or library?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django",
  },
  {
    question: "Which algorithm is commonly used to find the shortest path in a weighted graph with non-negative edge weights?",
    options: [
      "Bubble Sort",
      "Dijkstra's Algorithm",
      "Binary Search",
      "Linear Search",
    ],
    answer: "Dijkstra's Algorithm",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Integration",
      "Application Process Instruction",
      "Automated Program Interface",
    ],
    answer: "Application Programming Interface",
  },
];

export default function TechnicalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];

  function selectAnswer(option) {
    if (answered) return;

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function nextQuestion() {
    if (!answered) return;

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer("");
    setAnswered(false);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setAnswered(false);
  }

  const percentage = Math.round((score / questions.length) * 100);

  if (finished) {
    return (
      <div className="page-container technical-quiz-page">
        <div className="quiz-result-card">
          <div className="quiz-result-icon">
            <Trophy size={34} />
          </div>

          <span className="quiz-result-label">QUIZ COMPLETED</span>

          <h1>Technical Quiz Result</h1>

          <div className="quiz-final-score">
            <strong>{percentage}%</strong>
            <span>Your Score</span>
          </div>

          <div className="quiz-result-stats">
            <div>
              <strong>{score}</strong>
              <span>Correct</span>
            </div>

            <div>
              <strong>{questions.length - score}</strong>
              <span>Incorrect</span>
            </div>

            <div>
              <strong>{questions.length}</strong>
              <span>Total</span>
            </div>
          </div>

          <p className="quiz-result-message">
            {percentage >= 80
              ? "Excellent work! Your technical fundamentals are strong."
              : percentage >= 60
              ? "Good attempt! Keep practicing to strengthen your concepts."
              : "Keep learning and practicing. Consistent practice will improve your score."}
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={restartQuiz}
          >
            <RotateCcw size={17} />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container technical-quiz-page">
      <div className="page-header">
        <div>
          <div className="section-badge">
            <Brain size={14} />
            TECHNICAL ASSESSMENT
          </div>

          <h1>Technical Quiz</h1>

          <p>
            Test your programming, web development, database and
            computer science fundamentals.
          </p>
        </div>

        <div className="technical-quiz-header-icon">
          <Brain size={26} />
        </div>
      </div>

      <div className="quiz-container">
        <div className="quiz-topbar">
          <div>
            <span>QUESTION</span>
            <strong>
              {currentQuestion + 1} / {questions.length}
            </strong>
          </div>

          <div>
            <span>SCORE</span>
            <strong>{score}</strong>
          </div>
        </div>

        <div className="quiz-progress">
          <span
            style={{
              width: `${
                ((currentQuestion + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="quiz-card">
          <div className="quiz-question-number">
            QUESTION {String(currentQuestion + 1).padStart(2, "0")}
          </div>

          <h2>{question.question}</h2>

          <div className="quiz-options">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;

              let className = "quiz-option";

              if (answered && isCorrect) {
                className += " correct";
              } else if (answered && isSelected && !isCorrect) {
                className += " wrong";
              } else if (isSelected) {
                className += " selected";
              }

              return (
                <button
                  type="button"
                  className={className}
                  key={option}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="quiz-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="quiz-option-text">
                    {option}
                  </span>

                  {answered && isCorrect && (
                    <CheckCircle2 size={18} />
                  )}

                  {answered && isSelected && !isCorrect && (
                    <XCircle size={18} />
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={
                selectedAnswer === question.answer
                  ? "quiz-feedback correct-feedback"
                  : "quiz-feedback wrong-feedback"
              }
            >
              {selectedAnswer === question.answer ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Correct! Great job.</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>
                    Correct answer: <strong>{question.answer}</strong>
                  </span>
                </>
              )}
            </div>
          )}

          <div className="quiz-footer">
            <span>
              {answered
                ? "Answer selected"
                : "Select one answer"}
            </span>

            <button
              type="button"
              className="btn btn-primary"
              disabled={!answered}
              onClick={nextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}

              {currentQuestion === questions.length - 1 ? (
                <CheckCircle2 size={16} />
              ) : (
                <ArrowRight size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}