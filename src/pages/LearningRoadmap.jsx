import { useState } from "react";
import {
  Route,
  CheckCircle2,
  Circle,
  Clock3,
  BookOpen,
  Code2,
  Brain,
  Briefcase,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

const roadmapData = {
  "Software Developer": [
    {
      phase: "Phase 1",
      title: "Programming Fundamentals",
      duration: "2 Weeks",
      icon: Code2,
      topics: [
        "Variables and Data Types",
        "Loops and Conditions",
        "Functions",
        "Object Oriented Programming",
        "Exception Handling",
      ],
    },
    {
      phase: "Phase 2",
      title: "Data Structures and Algorithms",
      duration: "4 Weeks",
      icon: Brain,
      topics: [
        "Arrays and Strings",
        "Linked Lists",
        "Stacks and Queues",
        "Trees and Graphs",
        "Searching and Sorting",
        "Time and Space Complexity",
      ],
    },
    {
      phase: "Phase 3",
      title: "Web Development",
      duration: "4 Weeks",
      icon: Code2,
      topics: [
        "HTML and CSS",
        "JavaScript",
        "React",
        "REST APIs",
        "Node.js",
        "Git and GitHub",
      ],
    },
    {
      phase: "Phase 4",
      title: "Projects and Interview Preparation",
      duration: "3 Weeks",
      icon: Briefcase,
      topics: [
        "Build Real World Projects",
        "GitHub Portfolio",
        "Resume Preparation",
        "Technical Interview Practice",
        "Mock Interviews",
      ],
    },
  ],

  "Data Scientist": [
    {
      phase: "Phase 1",
      title: "Python and Mathematics",
      duration: "3 Weeks",
      icon: Code2,
      topics: [
        "Python Fundamentals",
        "NumPy",
        "Pandas",
        "Statistics",
        "Probability",
        "Linear Algebra Basics",
      ],
    },
    {
      phase: "Phase 2",
      title: "Data Analysis and Visualization",
      duration: "3 Weeks",
      icon: BookOpen,
      topics: [
        "Data Cleaning",
        "Exploratory Data Analysis",
        "Matplotlib",
        "Seaborn",
        "SQL",
        "Data Preprocessing",
      ],
    },
    {
      phase: "Phase 3",
      title: "Machine Learning",
      duration: "5 Weeks",
      icon: Brain,
      topics: [
        "Regression",
        "Classification",
        "Clustering",
        "Feature Engineering",
        "Model Evaluation",
        "Scikit Learn",
      ],
    },
    {
      phase: "Phase 4",
      title: "Projects and Portfolio",
      duration: "3 Weeks",
      icon: Briefcase,
      topics: [
        "End to End ML Project",
        "Streamlit Dashboard",
        "Model Deployment",
        "GitHub Portfolio",
        "Resume Preparation",
        "Interview Practice",
      ],
    },
  ],

  "AI / ML Engineer": [
    {
      phase: "Phase 1",
      title: "Python and Mathematics",
      duration: "3 Weeks",
      icon: Code2,
      topics: [
        "Advanced Python",
        "NumPy and Pandas",
        "Linear Algebra",
        "Probability",
        "Statistics",
        "Calculus Basics",
      ],
    },
    {
      phase: "Phase 2",
      title: "Machine Learning",
      duration: "5 Weeks",
      icon: Brain,
      topics: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Regression",
        "Classification",
        "Clustering",
        "Model Evaluation",
      ],
    },
    {
      phase: "Phase 3",
      title: "Deep Learning and AI",
      duration: "5 Weeks",
      icon: Brain,
      topics: [
        "Neural Networks",
        "CNN",
        "RNN",
        "Transformers",
        "TensorFlow and PyTorch",
        "Generative AI Basics",
      ],
    },
    {
      phase: "Phase 4",
      title: "AI Projects and Deployment",
      duration: "4 Weeks",
      icon: Briefcase,
      topics: [
        "Build AI Projects",
        "API Integration",
        "Model Deployment",
        "FastAPI",
        "GitHub Portfolio",
        "AI Interview Preparation",
      ],
    },
  ],

  "Frontend Developer": [
    {
      phase: "Phase 1",
      title: "Web Fundamentals",
      duration: "2 Weeks",
      icon: Code2,
      topics: [
        "HTML5",
        "CSS3",
        "Responsive Design",
        "Flexbox",
        "CSS Grid",
      ],
    },
    {
      phase: "Phase 2",
      title: "JavaScript",
      duration: "3 Weeks",
      icon: Code2,
      topics: [
        "JavaScript Fundamentals",
        "DOM Manipulation",
        "ES6",
        "Promises and Async Await",
        "APIs",
      ],
    },
    {
      phase: "Phase 3",
      title: "React Development",
      duration: "4 Weeks",
      icon: Brain,
      topics: [
        "React Components",
        "Props and State",
        "React Hooks",
        "React Router",
        "API Integration",
        "State Management",
      ],
    },
    {
      phase: "Phase 4",
      title: "Projects and Deployment",
      duration: "3 Weeks",
      icon: Briefcase,
      topics: [
        "Build Portfolio Projects",
        "Git and GitHub",
        "Deployment",
        "Resume Preparation",
        "Frontend Interview Practice",
      ],
    },
  ],
};

export default function LearningRoadmap() {
  const [selectedRole, setSelectedRole] = useState("Software Developer");
  const [completed, setCompleted] = useState({});

  const roadmap = roadmapData[selectedRole];

  let totalTopics = 0;
  let completedTopics = 0;

  roadmap.forEach((phase) => {
    totalTopics += phase.topics.length;

    phase.topics.forEach((topic) => {
      const key = phase.phase + "-" + topic;

      if (completed[key]) {
        completedTopics += 1;
      }
    });
  });

  const progress =
    totalTopics === 0
      ? 0
      : Math.round((completedTopics / totalTopics) * 100);

  function handleRoleChange(event) {
    setSelectedRole(event.target.value);
    setCompleted({});
  }

  function toggleTopic(phase, topic) {
    const key = phase + "-" + topic;

    setCompleted((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  function resetProgress() {
    setCompleted({});
  }

  return (
    <div className="page-container roadmap-page">

      <div className="page-header roadmap-header">
        <div>
          <div className="section-badge">
            <Route size={14} />
            CAREER ROADMAP
          </div>

          <h1>Learning Roadmap</h1>

          <p>
            Follow a structured learning path and track your
            progress toward your target career.
          </p>
        </div>

        <div className="roadmap-header-icon">
          <Route size={25} />
        </div>
      </div>

      <div className="roadmap-controls">

        <div className="role-selector">
          <label htmlFor="career-role">
            Target Career
          </label>

          <div className="select-wrapper">
            <select
              id="career-role"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              {Object.keys(roadmapData).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <ChevronDown size={16} />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary roadmap-reset"
          onClick={resetProgress}
        >
          <RotateCcw size={15} />
          Reset Progress
        </button>

      </div>

      <div className="roadmap-progress-card">

        <div className="roadmap-progress-top">

          <div>
            <span className="progress-label">
              YOUR PROGRESS
            </span>

            <h2>{selectedRole}</h2>
          </div>

          <div className="progress-percentage">
            {progress}%
          </div>

        </div>

        <div className="roadmap-progress-bar">
          <span
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="roadmap-progress-bottom">
          <span>
            {completedTopics} of {totalTopics} topics completed
          </span>

          <span>
            {progress === 100
              ? "Roadmap Completed"
              : "Keep learning and stay consistent"}
          </span>
        </div>

      </div>

      <div className="roadmap-container">

        {roadmap.map((phase, phaseIndex) => {

          const Icon = phase.icon;

          let phaseCompleted = 0;

          phase.topics.forEach((topic) => {
            const key = phase.phase + "-" + topic;

            if (completed[key]) {
              phaseCompleted += 1;
            }
          });

          return (
            <div className="roadmap-phase" key={phase.phase}>

              <div className="roadmap-line">

                <div className="roadmap-phase-icon">
                  <Icon size={19} />
                </div>

                {phaseIndex < roadmap.length - 1 && (
                  <span />
                )}

              </div>

              <div className="roadmap-phase-card">

                <div className="phase-header">

                  <span className="phase-label">
                    {phase.phase}
                  </span>

                  <h2>{phase.title}</h2>

                  <div className="phase-meta">

                    <span>
                      <Clock3 size={13} />
                      {phase.duration}
                    </span>

                    <span>
                      <BookOpen size={13} />
                      {phase.topics.length} Topics
                    </span>

                    <span>
                      <CheckCircle2 size={13} />
                      {phaseCompleted}/{phase.topics.length}
                    </span>

                  </div>

                </div>

                <div className="roadmap-topics">

                  {phase.topics.map((topic, topicIndex) => {

                    const key = phase.phase + "-" + topic;
                    const isCompleted = Boolean(completed[key]);

                    return (
                      <button
                        key={topic}
                        type="button"
                        className={
                          "roadmap-topic " +
                          (isCompleted ? "completed" : "")
                        }
                        onClick={() =>
                          toggleTopic(phase.phase, topic)
                        }
                      >

                        <span className="topic-check">
                          {isCompleted ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <Circle size={18} />
                          )}
                        </span>

                        <span className="topic-number">
                          {String(topicIndex + 1).padStart(2, "0")}
                        </span>

                        <span className="topic-name">
                          {topic}
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {progress === 100 && (
        <div className="roadmap-completion">
          <CheckCircle2 size={20} />
          <span>Congratulations! You completed this roadmap.</span>
        </div>
      )}
    </div>
  );
}
