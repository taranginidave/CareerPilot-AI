import React, { useMemo, useState } from "react";
import {
  Brain,
  Code2,
  Database,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Trophy,
  Zap,
  BookOpen,
} from "lucide-react";

import "./codingarena.css";

const questions = {
  DSA: [
    {
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      answer: "Stack",
      explanation:
        "A Stack follows LIFO — Last In, First Out. The last element inserted is the first one removed.",
      difficulty: "Easy",
    },
    {
      question: "Which data structure follows the FIFO principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
      explanation:
        "A Queue follows FIFO — First In, First Out. The first element inserted is the first one removed.",
      difficulty: "Easy",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      answer: "O(log n)",
      explanation:
        "Binary search repeatedly divides the search space into half, giving O(log n) complexity.",
      difficulty: "Medium",
    },
    {
      question: "Which traversal of a Binary Search Tree gives sorted order?",
      options: ["Preorder", "Postorder", "Inorder", "Level Order"],
      answer: "Inorder",
      explanation:
        "Inorder traversal of a Binary Search Tree visits nodes in ascending sorted order.",
      difficulty: "Easy",
    },
  ],

  Programming: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      answer: "def",
      explanation:
        "Python uses the 'def' keyword to define a function.",
      difficulty: "Easy",
    },
    {
      question: "Which language is primarily used to style web pages?",
      options: ["HTML", "CSS", "Python", "SQL"],
      answer: "CSS",
      explanation:
        "CSS (Cascading Style Sheets) is used to style and design web pages.",
      difficulty: "Easy",
    },
    {
      question: "Which symbol is used for a single-line comment in JavaScript?",
      options: ["#", "//", "<!--", "/*"],
      answer: "//",
      explanation:
        "JavaScript uses // for single-line comments.",
      difficulty: "Easy",
    },
    {
      question: "Which of these is NOT a programming language?",
      options: ["Python", "Java", "HTML", "C++"],
      answer: "HTML",
      explanation:
        "HTML is a markup language, not a programming language.",
      difficulty: "Easy",
    },
  ],

  SQL: [
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
      answer: "SELECT",
      explanation:
        "The SELECT statement is used to retrieve data from one or more tables.",
      difficulty: "Easy",
    },
    {
      question: "Which SQL command is used to remove a table?",
      options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
      answer: "DROP",
      explanation:
        "DROP TABLE removes the complete table and its structure from the database.",
      difficulty: "Easy",
    },
    {
      question: "Which clause is used to filter rows?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
      answer: "WHERE",
      explanation:
        "The WHERE clause filters rows according to a specified condition.",
      difficulty: "Easy",
    },
    {
      question: "Which SQL keyword removes duplicate results?",
      options: ["UNIQUE", "DISTINCT", "REMOVE", "FILTER"],
      answer: "DISTINCT",
      explanation:
        "DISTINCT returns only unique values from the selected columns.",
      difficulty: "Medium",
    },
  ],
};

function CodingArena() {
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("All");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const categoryQuestions = questions[category];

  const filteredQuestions = useMemo(() => {
    if (difficulty === "All") {
      return categoryQuestions;
    }

    return categoryQuestions.filter(
      (item) => item.difficulty === difficulty
    );
  }, [category, difficulty, categoryQuestions]);

  const currentQuestion =
    filteredQuestions[questionIndex] || filteredQuestions[0];

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const handleAnswer = (option) => {
    if (answered || completed) return;

    setSelectedAnswer(option);
    setAnswered(true);

    if (option === currentQuestion.answer) {
      setScore((previous) => previous + 10);
    }
  };

  const handleNext = () => {
    if (!answered) return;

    if (questionIndex === filteredQuestions.length - 1) {
      setCompleted(true);
      return;
    }

    setQuestionIndex((previous) => previous + 1);
    setSelectedAnswer("");
    setAnswered(false);
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const getOptionClass = (option) => {
    if (!answered) {
      return "";
    }

    if (option === currentQuestion.answer) {
      return "correct";
    }

    if (
      option === selectedAnswer &&
      option !== currentQuestion.answer
    ) {
      return "wrong";
    }

    return "disabled";
  };

  return (
    <div className="coding-arena-page">

      {/* HERO */}
      <section className="coding-hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Zap size={16} />
            CAREERPILOT CODING ARENA
          </div>

          <h1>
            Sharpen Your
            <span> Coding Skills</span>
          </h1>

          <p>
            Practice DSA, programming and SQL questions designed
            for technical interviews.
          </p>

          <div className="hero-code-icon">
            <Code2 size={34} />
          </div>

        </div>

      </section>


      {/* MAIN */}
      <main className="coding-container">

        {/* CATEGORY TABS */}
        <section className="category-tabs">

          <button
            className={`category-tab ${
              category === "DSA" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("DSA")}
          >
            <Brain size={25} />

            <div>
              <strong>DSA</strong>
              <span>Algorithms & Data Structures</span>
            </div>
          </button>


          <button
            className={`category-tab ${
              category === "Programming" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Programming")}
          >
            <Code2 size={25} />

            <div>
              <strong>Programming</strong>
              <span>Programming Fundamentals</span>
            </div>
          </button>


          <button
            className={`category-tab ${
              category === "SQL" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("SQL")}
          >
            <Database size={25} />

            <div>
              <strong>SQL</strong>
              <span>Database & SQL</span>
            </div>
          </button>

        </section>


        {/* FILTERS */}
        <section className="arena-toolbar">

          <div className="difficulty-section">

            <span>Difficulty</span>

            <div className="difficulty-buttons">

              {["All", "Easy", "Medium"].map((level) => (
                <button
                  key={level}
                  className={
                    difficulty === level ? "selected" : ""
                  }
                  onClick={() => handleDifficultyChange(level)}
                >
                  {level}
                </button>
              ))}

            </div>

          </div>


          <div className="progress-info">

            <div>
              <span>QUESTION</span>
              <strong>
                {completed
                  ? filteredQuestions.length
                  : questionIndex + 1}
                <small> / {filteredQuestions.length}</small>
              </strong>
            </div>

            <div>
              <span>SCORE</span>
              <strong>{score}</strong>
            </div>

            <div>
              <span>LEVEL</span>
              <strong>
                {currentQuestion?.difficulty || "Easy"}
              </strong>
            </div>

          </div>

        </section>


        {/* COMPLETED */}
        {completed ? (

          <section className="completion-card">

            <div className="completion-icon">
              <Trophy size={48} />
            </div>

            <p className="completion-label">
              QUIZ COMPLETED
            </p>

            <h2>
              Great job! 🎉
            </h2>

            <p className="completion-text">
              You completed all the questions in this category.
            </p>

            <div className="final-score">
              <span>Your Score</span>
              <strong>
                {score} / {filteredQuestions.length * 10}
              </strong>
            </div>

            <button
              className="restart-button"
              onClick={resetQuiz}
            >
              <RotateCcw size={18} />
              Try Again
            </button>

          </section>

        ) : (

          /* QUESTION CARD */
          <section className="question-card">

            <div className="question-top">

              <div className="question-label">
                <Code2 size={18} />
                {category} CHALLENGE
              </div>

              <span className="question-number">
                Question {questionIndex + 1}
              </span>

            </div>


            <h2 className="question-title">
              {currentQuestion.question}
            </h2>


            <div className="options-grid">

              {currentQuestion.options.map((option, index) => (

                <button
                  key={option}
                  className={`answer-option ${getOptionClass(
                    option
                  )}`}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                >

                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="option-text">
                    {option}
                  </span>

                  {answered &&
                    option === currentQuestion.answer && (
                      <CheckCircle2
                        className="answer-icon correct-icon"
                        size={21}
                      />
                    )}

                  {answered &&
                    option === selectedAnswer &&
                    option !== currentQuestion.answer && (
                      <span className="wrong-icon">
                        ×
                      </span>
                    )}

                </button>

              ))}

            </div>


            {/* FEEDBACK */}
            {answered && (

              <div
                className={`answer-feedback ${
                  selectedAnswer === currentQuestion.answer
                    ? "success"
                    : "error"
                }`}
              >

                <div className="feedback-heading">

                  {selectedAnswer === currentQuestion.answer ? (
                    <>
                      <CheckCircle2 size={20} />
                      Correct Answer!
                    </>
                  ) : (
                    <>
                      <span className="feedback-x">
                        ×
                      </span>
                      Incorrect Answer
                    </>
                  )}

                </div>

                <p>
                  {currentQuestion.explanation}
                </p>

              </div>

            )}


            {/* FOOTER */}
            <div className="question-footer">

              {!answered ? (

                <div className="choose-answer">
                  <BookOpen size={17} />
                  Choose the correct answer
                </div>

              ) : (

                <div className="answer-status">
                  {selectedAnswer === currentQuestion.answer
                    ? "Nice work! Keep going."
                    : `Correct answer: ${currentQuestion.answer}`}
                </div>

              )}


              <button
                className="next-button"
                onClick={handleNext}
                disabled={!answered}
              >
                {questionIndex === filteredQuestions.length - 1
                  ? "Finish"
                  : "Next Question"}

                <ChevronRight size={18} />
              </button>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default CodingArena;
