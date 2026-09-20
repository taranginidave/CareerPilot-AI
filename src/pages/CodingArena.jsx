
import { useMemo, useState } from "react";
import {
  Code2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Zap,
  Database,
  Brain,
} from "lucide-react";

const questionBank = {
  DSA: [
    {
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      answer: "Stack",
      difficulty: "Easy",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      answer: "O(log n)",
      difficulty: "Easy",
    },
    {
      question: "Which traversal of a Binary Search Tree gives sorted order?",
      options: ["Preorder", "Postorder", "Inorder", "Level Order"],
      answer: "Inorder",
      difficulty: "Medium",
    },
    {
      question: "Which algorithm is commonly used to find the shortest path?",
      options: [
        "Merge Sort",
        "Dijkstra's Algorithm",
        "Binary Search",
        "Kruskal's Algorithm",
      ],
      answer: "Dijkstra's Algorithm",
      difficulty: "Medium",
    },
  ],

  Programming: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "func", "def", "define"],
      answer: "def",
      difficulty: "Easy",
    },
    {
      question: "Which of the following is a strongly typed language?",
      options: ["Java", "HTML", "CSS", "JSON"],
      answer: "Java",
      difficulty: "Easy",
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
      difficulty: "Medium",
    },
    {
      question: "Which language is primarily used for interactive web pages?",
      options: ["JavaScript", "SQL", "Python", "C"],
      answer: "JavaScript",
      difficulty: "Easy",
    },
  ],

  SQL: [
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
      difficulty: "Easy",
    },
    {
      question: "Which clause is used to filter rows in SQL?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "SORT BY"],
      answer: "WHERE",
      difficulty: "Easy",
    },
    {
      question: "Which SQL command is used to remove a table?",
      options: ["REMOVE", "DELETE TABLE", "DROP TABLE", "CLEAR"],
      answer: "DROP TABLE",
      difficulty: "Medium",
    },
    {
      question: "Which function returns the number of rows?",
      options: ["SUM()", "COUNT()", "TOTAL()", "ROWS()"],
      answer: "COUNT()",
      difficulty: "Easy",
    },
  ],
};

const categories = [
  {
    name: "DSA",
    icon: Brain,
    description: "Algorithms & Data Structures",
  },
  {
    name: "Programming",
    icon: Code2,
    description: "Programming Fundamentals",
  },
  {
    name: "SQL",
    icon: Database,
    description: "Database & SQL",
  },
];

const difficulties = ["All", "Easy", "Medium"];

export default function CodingArena() {
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("All");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    const data = questionBank[category] || [];

    if (difficulty === "All") {
      return data;
    }

    return data.filter(
      (question) => question.difficulty === difficulty
    );
  }, [category, difficulty]);

  const currentQuestion = questions[questionIndex];

  function changeCategory(newCategory) {
    setCategory(newCategory);
    resetQuizState();
  }

  function changeDifficulty(newDifficulty) {
    setDifficulty(newDifficulty);
    resetQuizState();
  }

  function resetQuizState() {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function selectAnswer(option) {
    if (answered || !currentQuestion) {
      return;
    }

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === currentQuestion.answer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function nextQuestion() {
    if (!answered) {
      return;
    }

    if (questionIndex >= questions.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer("");
    setAnswered(false);
  }

  function restartQuiz() {
    resetQuizState();
  }

  if (questions.length === 0) {
    return (
      <div className="page-container coding-page">
        <div className="empty-code-state">
          <Code2 size={38} />

          <h2>No questions available</h2>

          <p>
            Try selecting another difficulty or category.
          </p>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="page-container coding-page">
        <div className="coding-result">
          <div className="result-icon">
            <Trophy size={34} />
          </div>

          <span className="result-label">
            CODING ARENA COMPLETE
          </span>

          <h1>Great work!</h1>

          <p>
            You completed the {category} challenge.
          </p>

          <div className="result-score">
            <strong>{percentage}%</strong>
            <span>Accuracy</span>
          </div>

          <div className="result-stats">
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

          <button
            type="button"
            className="code-primary-btn"
            onClick={restartQuiz}
          >
            <RotateCcw size={17} />
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container coding-page">
      {/* HEADER */}
      <div className="coding-header">
        <div>
          <div className="coding-badge">
            <Zap size={14} />
            CAREERPILOT CODING ARENA
          </div>

          <h1>Sharpen Your Coding Skills</h1>

          <p>
            Practice DSA, programming and SQL questions designed
            for technical interviews.
          </p>
        </div>

        <div className="coding-header-icon">
          <Code2 size={28} />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="category-grid">
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.name}
              className={
                category === item.name
                  ? "category-card active"
                  : "category-card"
              }
              onClick={() => changeCategory(item.name)}
            >
              <div className="category-icon">
                <Icon size={21} />
              </div>

              <div>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* DIFFICULTY */}
      <div className="difficulty-row">
        <span>Difficulty:</span>

        {difficulties.map((level) => (
          <button
            type="button"
            key={level}
            className={
              difficulty === level
                ? "difficulty-btn active"
                : "difficulty-btn"
            }
            onClick={() => changeDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* QUIZ */}
      <div className="coding-quiz">
        <div className="coding-quiz-top">
          <div>
            <span>QUESTION</span>

            <strong>
              {questionIndex + 1} / {questions.length}
            </strong>
          </div>

          <div>
            <span>SCORE</span>

            <strong>{score}</strong>
          </div>

          <div>
            <span>LEVEL</span>

            <strong className="level-text">
              {currentQuestion.difficulty}
            </strong>
          </div>
        </div>

        <div className="coding-progress">
          <span
            style={{
              width: `${
                ((questionIndex + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="coding-question-card">
          <span className="question-label">
            {category.toUpperCase()} CHALLENGE
          </span>

          <h2>{currentQuestion.question}</h2>

          <div className="coding-options">
            {currentQuestion.options.map((option, index) => {
              const correct =
                option === currentQuestion.answer;

              const selected =
                option === selectedAnswer;

              let className = "coding-option";

              if (answered && correct) {
                className += " correct";
              } else if (
                answered &&
                selected &&
                !correct
              ) {
                className += " wrong";
              } else if (selected) {
                className += " selected";
              }

              return (
                <button
                  type="button"
                  key={option}
                  className={className}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="option-number">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="option-text">
                    {option}
                  </span>

                  {answered && correct && (
                    <CheckCircle2 size={18} />
                  )}

                  {answered && selected && !correct && (
                    <XCircle size={18} />
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={
                selectedAnswer === currentQuestion.answer
                  ? "answer-feedback correct"
                  : "answer-feedback wrong"
              }
            >
              {selectedAnswer === currentQuestion.answer ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>
                    Correct answer! Keep going.
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>
                    Correct answer:{" "}
                    <strong>
                      {currentQuestion.answer}
                    </strong>
                  </span>
                </>
              )}
            </div>
          )}

          <div className="coding-footer">
            <span>
              {answered
                ? "Answer submitted"
                : "Choose the correct answer"}
            </span>

            <button
              type="button"
              className="code-primary-btn"
              disabled={!answered}
              onClick={nextQuestion}
            >
              {questionIndex === questions.length - 1
                ? "Finish"
                : "Next Question"}

              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
