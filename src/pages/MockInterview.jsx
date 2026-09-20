import { useState } from "react";
import {
  Mic,
  Play,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Clock3,
  Brain,
  Code2,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const questionBank = {
  Technical: {
    Easy: [
      {
        question: "What is a variable in programming?",
        keywords: ["variable", "value", "data", "memory"],
      },
      {
        question: "What is the difference between a list and a tuple in Python?",
        keywords: ["list", "tuple", "mutable", "immutable"],
      },
      {
        question: "What is an API?",
        keywords: ["api", "application", "interface", "communication"],
      },
      {
        question: "What is Git used for?",
        keywords: ["git", "version", "control", "repository"],
      },
      {
        question: "What is a database?",
        keywords: ["database", "data", "store", "storage"],
      },
    ],

    Medium: [
      {
        question: "Explain the difference between stack and queue.",
        keywords: ["stack", "queue", "lifo", "fifo"],
      },
      {
        question: "What is Object Oriented Programming?",
        keywords: ["oop", "object", "class", "inheritance", "polymorphism"],
      },
      {
        question: "What is time complexity?",
        keywords: ["time", "complexity", "algorithm", "input", "big o"],
      },
      {
        question: "What is the difference between SQL and NoSQL?",
        keywords: ["sql", "nosql", "database", "relational", "document"],
      },
      {
        question: "What is REST API and how does it work?",
        keywords: ["rest", "api", "http", "request", "response"],
      },
    ],

    Hard: [
      {
        question:
          "Explain how a hash table works and discuss collision handling.",
        keywords: ["hash", "table", "collision", "key", "value"],
      },
      {
        question: "What is dynamic programming?",
        keywords: [
          "dynamic",
          "programming",
          "subproblem",
          "memoization",
          "optimization",
        ],
      },
      {
        question: "Explain process and thread in operating systems.",
        keywords: ["process", "thread", "memory", "execution"],
      },
      {
        question: "Explain normalization in databases.",
        keywords: ["normalization", "database", "redundancy", "normal form"],
      },
      {
        question:
          "What are the advantages of microservices architecture?",
        keywords: [
          "microservices",
          "services",
          "scalable",
          "independent",
          "deployment",
        ],
      },
    ],
  },

  HR: {
    Easy: [
      {
        question: "Tell me about yourself.",
        keywords: ["education", "skills", "experience", "project"],
      },
      {
        question: "What are your strengths?",
        keywords: ["strength", "communication", "learning", "problem"],
      },
      {
        question: "Why do you want this job?",
        keywords: ["career", "growth", "skills", "company"],
      },
      {
        question: "Where do you see yourself in five years?",
        keywords: ["career", "growth", "leadership", "experience"],
      },
      {
        question: "Why should we hire you?",
        keywords: ["skills", "experience", "value", "contribute"],
      },
    ],

    Medium: [
      {
        question: "Tell me about a challenging project you worked on.",
        keywords: ["project", "challenge", "problem", "solution", "result"],
      },
      {
        question: "How do you handle failure?",
        keywords: ["failure", "learn", "improve", "mistake"],
      },
      {
        question: "How do you manage multiple deadlines?",
        keywords: ["priority", "deadline", "planning", "time"],
      },
      {
        question: "Tell me about a time you worked in a team.",
        keywords: ["team", "communication", "collaboration", "role"],
      },
      {
        question: "How do you handle criticism?",
        keywords: ["feedback", "improve", "learn", "criticism"],
      },
    ],

    Hard: [
      {
        question:
          "Tell me about a professional failure and what you learned from it.",
        keywords: ["failure", "learn", "improve", "experience"],
      },
      {
        question: "How would you handle a disagreement with your manager?",
        keywords: ["communication", "discussion", "respect", "solution"],
      },
      {
        question: "Describe a situation where you demonstrated leadership.",
        keywords: ["leadership", "team", "responsibility", "decision"],
      },
      {
        question:
          "How would you respond if you disagreed with a team decision?",
        keywords: ["team", "communication", "discussion", "decision"],
      },
      {
        question:
          "What would you do if you were given an unrealistic deadline?",
        keywords: ["deadline", "priority", "communication", "planning"],
      },
    ],
  },

  "Coding & DSA": {
    Easy: [
      {
        question: "How would you find the largest element in an array?",
        keywords: ["array", "largest", "loop", "maximum"],
      },
      {
        question: "How would you reverse a string?",
        keywords: ["string", "reverse", "loop", "slice"],
      },
      {
        question: "How do you check whether a number is prime?",
        keywords: ["prime", "number", "divide", "loop"],
      },
      {
        question: "How would you find duplicate elements in an array?",
        keywords: ["duplicate", "array", "set", "frequency"],
      },
      {
        question: "How do you check whether a string is a palindrome?",
        keywords: ["palindrome", "string", "reverse"],
      },
    ],

    Medium: [
      {
        question: "Explain binary search and its time complexity.",
        keywords: ["binary", "search", "sorted", "log", "complexity"],
      },
      {
        question: "How would you detect a cycle in a linked list?",
        keywords: ["linked", "list", "cycle", "slow", "fast"],
      },
      {
        question: "Explain the two pointer technique.",
        keywords: ["two", "pointer", "array", "left", "right"],
      },
      {
        question: "How would you find the first non-repeating character?",
        keywords: ["character", "frequency", "hash", "map"],
      },
      {
        question: "Explain BFS and DFS.",
        keywords: ["bfs", "dfs", "graph", "queue", "stack"],
      },
    ],

    Hard: [
      {
        question:
          "Explain the difference between greedy algorithms and dynamic programming.",
        keywords: [
          "greedy",
          "dynamic",
          "programming",
          "optimal",
          "subproblem",
        ],
      },
      {
        question:
          "How would you solve the longest common subsequence problem?",
        keywords: [
          "longest",
          "common",
          "subsequence",
          "dynamic",
          "programming",
        ],
      },
      {
        question: "Explain how Dijkstra's algorithm works.",
        keywords: ["dijkstra", "graph", "shortest", "distance", "priority"],
      },
      {
        question: "How would you detect a cycle in a directed graph?",
        keywords: ["cycle", "directed", "graph", "dfs", "visited"],
      },
      {
        question:
          "Explain the difference between merge sort and quick sort.",
        keywords: ["merge", "quick", "sort", "complexity", "pivot"],
      },
    ],
  },
};

export default function MockInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Software Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [interviewType, setInterviewType] = useState("Technical");

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);

  function startInterview() {
    const selectedQuestions =
      questionBank[interviewType][difficulty];

    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setAnswer("");
    setResults([]);
    setStarted(true);
  }

  function evaluateAnswer(currentQuestion, userAnswer) {
    const text = userAnswer.toLowerCase();

    let matchedKeywords = 0;

    currentQuestion.keywords.forEach(function (keyword) {
      if (text.includes(keyword.toLowerCase())) {
        matchedKeywords++;
      }
    });

    const percentage = Math.round(
      (matchedKeywords / currentQuestion.keywords.length) * 100
    );

    return {
      question: currentQuestion.question,
      answer: userAnswer,
      score: Math.min(percentage, 100),
    };
  }

  function submitAnswer() {
    if (answer.trim() === "") {
      alert("Please enter your answer.");
      return;
    }

    const currentQuestion = questions[currentIndex];

    const evaluation = evaluateAnswer(
      currentQuestion,
      answer
    );

    const updatedResults = [...results, evaluation];

    if (currentIndex === questions.length - 1) {
      const totalScore = Math.round(
        updatedResults.reduce(
          function (total, item) {
            return total + item.score;
          },
          0
        ) / updatedResults.length
      );

      localStorage.setItem(
        "careerPilotInterviewReport",
        JSON.stringify({
          role,
          difficulty,
          interviewType,
          totalQuestions: questions.length,
          answered: updatedResults.length,
          correct: updatedResults.filter(function (item) {
            return item.score >= 50;
          }).length,
          score: totalScore,
          results: updatedResults,
        })
      );

      navigate("/interview-report");
      return;
    }

    setResults(updatedResults);
    setCurrentIndex(currentIndex + 1);
    setAnswer("");
  }

  function restartInterview() {
    setStarted(false);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswer("");
    setResults([]);
  }

  if (!started) {
    return (
      <div className="page-container mock-interview-page">
        <div className="page-header">
          <div>
            <div className="section-badge">
              <Mic size={14} />
              AI INTERVIEW PRACTICE
            </div>

            <h1>Mock Interview</h1>

            <p>
              Practice realistic interview questions and
              improve your confidence before the real interview.
            </p>
          </div>

          <div className="mock-header-icon">
            <Mic size={25} />
          </div>
        </div>

        <div className="interview-start-card">
          <div className="interview-start-icon">
            <Brain size={28} />
          </div>

          <h2>Ready for your interview?</h2>

          <p>
            Choose your interview settings and start practicing.
          </p>

          <div className="interview-settings">
            <div className="interview-field">
              <label>Target Role</label>

              <select
                value={role}
                onChange={function (event) {
                  setRole(event.target.value);
                }}
              >
                <option>Software Developer</option>
                <option>Data Scientist</option>
                <option>AI / ML Engineer</option>
                <option>Frontend Developer</option>
              </select>
            </div>

            <div className="interview-field">
              <label>Difficulty</label>

              <select
                value={difficulty}
                onChange={function (event) {
                  setDifficulty(event.target.value);
                }}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="interview-field">
              <label>Interview Type</label>

              <select
                value={interviewType}
                onChange={function (event) {
                  setInterviewType(event.target.value);
                }}
              >
                <option>Technical</option>
                <option>HR</option>
                <option>Coding & DSA</option>
              </select>
            </div>
          </div>

          <div className="interview-info-row">
            <div>
              <Code2 size={17} />
              <span>5 Questions</span>
            </div>

            <div>
              <Clock3 size={17} />
              <span>~10 Minutes</span>
            </div>

            <div>
              <MessageSquare size={17} />
              <span>Instant Evaluation</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary start-interview-btn"
            onClick={startInterview}
          >
            <Play size={17} />
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="page-container mock-interview-page">
      <div className="interview-topbar">
        <div>
          <span className="interview-label">
            {interviewType.toUpperCase()} INTERVIEW
          </span>

          <h1>{role}</h1>

          <p>{difficulty} Difficulty</p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={restartInterview}
        >
          <RotateCcw size={16} />
          Restart
        </button>
      </div>

      <div className="question-progress">
        <div className="question-progress-info">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>

          <span>
            {Math.round(
              ((currentIndex + 1) / questions.length) * 100
            )}
            %
          </span>
        </div>

        <div className="question-progress-bar">
          <span
            style={{
              width:
                ((currentIndex + 1) / questions.length) * 100 +
                "%",
            }}
          />
        </div>
      </div>

      <div className="interview-question-card">
        <div className="question-number">
          QUESTION {String(currentIndex + 1).padStart(2, "0")}
        </div>

        <h2>{currentQuestion.question}</h2>

        <p className="question-instruction">
          Take a moment to think and explain your answer clearly.
        </p>

        <textarea
          className="interview-answer"
          value={answer}
          onChange={function (event) {
            setAnswer(event.target.value);
          }}
          placeholder="Type your answer here..."
        />

        <div className="answer-footer">
          <span>{answer.length} characters</span>

          <button
            type="button"
            className="btn btn-primary"
            onClick={submitAnswer}
          >
            {currentIndex === questions.length - 1
              ? "Finish Interview"
              : "Submit & Next"}

            {currentIndex === questions.length - 1 ? (
              <CheckCircle2 size={16} />
            ) : (
              <ArrowRight size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="interview-tips">
        <div className="interview-tip-icon">
          <Brain size={18} />
        </div>

        <div>
          <strong>Interview Tip</strong>

          <p>
            Explain your thought process clearly. Use examples
            from your projects whenever possible.
          </p>
        </div>
      </div>
    </div>
  );
}