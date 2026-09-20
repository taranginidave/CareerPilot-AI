
import { useState } from "react";
import {
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  FolderGit2,
  Printer,
  RotateCcw,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";

const initialData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  objective: "",
  education: [
    {
      degree: "",
      college: "",
      year: "",
      score: "",
    },
  ],
  experience: [
    {
      role: "",
      company: "",
      duration: "",
      description: "",
    },
  ],
  skills: "",
  projects: [
    {
      name: "",
      technologies: "",
      description: "",
    },
  ],
  certifications: [
    {
      name: "",
      issuer: "",
      year: "",
    },
  ],
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState(initialData);
  const [showPreview, setShowPreview] = useState(false);

  function updateField(field, value) {
    setResume(function (previous) {
      return {
        ...previous,
        [field]: value,
      };
    });
  }

  function updateArrayField(section, index, field, value) {
    setResume(function (previous) {
      const updatedSection = [...previous[section]];

      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value,
      };

      return {
        ...previous,
        [section]: updatedSection,
      };
    });
  }

  function addItem(section) {
    const newItems = {
      education: {
        degree: "",
        college: "",
        year: "",
        score: "",
      },
      experience: {
        role: "",
        company: "",
        duration: "",
        description: "",
      },
      projects: {
        name: "",
        technologies: "",
        description: "",
      },
      certifications: {
        name: "",
        issuer: "",
        year: "",
      },
    };

    setResume(function (previous) {
      return {
        ...previous,
        [section]: [
          ...previous[section],
          newItems[section],
        ],
      };
    });
  }

  function removeItem(section, index) {
    setResume(function (previous) {
      const updatedSection = previous[section].filter(
        function (_, itemIndex) {
          return itemIndex !== index;
        }
      );

      return {
        ...previous,
        [section]: updatedSection,
      };
    });
  }

  function clearResume() {
    const confirmed = window.confirm(
      "Are you sure you want to clear your resume?"
    );

    if (confirmed) {
      setResume(initialData);
      setShowPreview(false);
    }
  }

  function printResume() {
    setShowPreview(true);

    setTimeout(function () {
      window.print();
    }, 200);
  }

  return (
    <div className="page-container resume-builder-page">
      <div className="page-header no-print">
        <div>
          <div className="section-badge">
            <FileText size={14} />
            RESUME BUILDER
          </div>

          <h1>Resume Builder</h1>

          <p>
            Create a professional, ATS-friendly resume with a
            live preview.
          </p>
        </div>

        <div className="resume-builder-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearResume}
          >
            <RotateCcw size={16} />
            Clear
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={printResume}
          >
            <Printer size={16} />
            Save / Print PDF
          </button>
        </div>
      </div>

      <div className="builder-layout">
        <div className="builder-form no-print">
          <div className="builder-section">
            <div className="builder-section-title">
              <div className="builder-icon">
                <User size={17} />
              </div>

              <div>
                <h2>Personal Information</h2>
                <p>Your basic contact details.</p>
              </div>
            </div>

            <div className="builder-fields">
              <Input
                label="Full Name"
                value={resume.fullName}
                onChange={function (value) {
                  updateField("fullName", value);
                }}
                placeholder="Tarangini Dave"
              />

              <Input
                label="Email"
                value={resume.email}
                onChange={function (value) {
                  updateField("email", value);
                }}
                placeholder="you@example.com"
              />

              <Input
                label="Phone"
                value={resume.phone}
                onChange={function (value) {
                  updateField("phone", value);
                }}
                placeholder="+91 9876543210"
              />

              <Input
                label="Location"
                value={resume.location}
                onChange={function (value) {
                  updateField("location", value);
                }}
                placeholder="Jalandhar, Punjab"
              />

              <Input
                label="LinkedIn"
                value={resume.linkedin}
                onChange={function (value) {
                  updateField("linkedin", value);
                }}
                placeholder="linkedin.com/in/yourname"
              />

              <Input
                label="GitHub"
                value={resume.github}
                onChange={function (value) {
                  updateField("github", value);
                }}
                placeholder="github.com/yourusername"
              />
            </div>
          </div>

          <div className="builder-section">
            <div className="builder-section-title">
              <div className="builder-icon">
                <FileText size={17} />
              </div>

              <div>
                <h2>Career Objective</h2>
                <p>Write a short professional summary.</p>
              </div>
            </div>

            <textarea
              className="builder-textarea"
              value={resume.objective}
              onChange={function (event) {
                updateField("objective", event.target.value);
              }}
              placeholder="Computer Science student with strong programming skills and hands-on experience in Python, React and machine learning..."
            />
          </div>

          <BuilderArraySection
            title="Education"
            description="Add your academic qualifications."
            icon={<GraduationCap size={17} />}
            section="education"
            items={resume.education}
            onAdd={function () {
              addItem("education");
            }}
            onRemove={function (index) {
              removeItem("education", index);
            }}
            renderItem={function (item, index) {
              return (
                <div className="array-form-card">
                  <Input
                    label="Degree"
                    value={item.degree}
                    onChange={function (value) {
                      updateArrayField(
                        "education",
                        index,
                        "degree",
                        value
                      );
                    }}
                    placeholder="B.Tech Computer Science"
                  />

                  <Input
                    label="College / University"
                    value={item.college}
                    onChange={function (value) {
                      updateArrayField(
                        "education",
                        index,
                        "college",
                        value
                      );
                    }}
                    placeholder="University Name"
                  />

                  <Input
                    label="Year"
                    value={item.year}
                    onChange={function (value) {
                      updateArrayField(
                        "education",
                        index,
                        "year",
                        value
                      );
                    }}
                    placeholder="2023 - 2027"
                  />

                  <Input
                    label="CGPA / Percentage"
                    value={item.score}
                    onChange={function (value) {
                      updateArrayField(
                        "education",
                        index,
                        "score",
                        value
                      );
                    }}
                    placeholder="8.5 CGPA"
                  />
                </div>
              );
            }}
          />

          <BuilderArraySection
            title="Experience"
            description="Add internships, jobs or training."
            icon={<Briefcase size={17} />}
            section="experience"
            items={resume.experience}
            onAdd={function () {
              addItem("experience");
            }}
            onRemove={function (index) {
              removeItem("experience", index);
            }}
            renderItem={function (item, index) {
              return (
                <div className="array-form-card">
                  <Input
                    label="Job / Internship Role"
                    value={item.role}
                    onChange={function (value) {
                      updateArrayField(
                        "experience",
                        index,
                        "role",
                        value
                      );
                    }}
                    placeholder="Software Developer Intern"
                  />

                  <Input
                    label="Company"
                    value={item.company}
                    onChange={function (value) {
                      updateArrayField(
                        "experience",
                        index,
                        "company",
                        value
                      );
                    }}
                    placeholder="Company Name"
                  />

                  <Input
                    label="Duration"
                    value={item.duration}
                    onChange={function (value) {
                      updateArrayField(
                        "experience",
                        index,
                        "duration",
                        value
                      );
                    }}
                    placeholder="June 2026 - August 2026"
                  />

                  <Textarea
                    label="Description"
                    value={item.description}
                    onChange={function (value) {
                      updateArrayField(
                        "experience",
                        index,
                        "description",
                        value
                      );
                    }}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              );
            }}
          />

          <div className="builder-section">
            <div className="builder-section-title">
              <div className="builder-icon">
                <Code2 size={17} />
              </div>

              <div>
                <h2>Skills</h2>
                <p>Separate your skills with commas.</p>
              </div>
            </div>

            <textarea
              className="builder-textarea"
              value={resume.skills}
              onChange={function (event) {
                updateField("skills", event.target.value);
              }}
              placeholder="Python, Java, JavaScript, React, SQL, Machine Learning, Git, Firebase"
            />
          </div>

          <BuilderArraySection
            title="Projects"
            description="Showcase your best technical projects."
            icon={<FolderGit2 size={17} />}
            section="projects"
            items={resume.projects}
            onAdd={function () {
              addItem("projects");
            }}
            onRemove={function (index) {
              removeItem("projects", index);
            }}
            renderItem={function (item, index) {
              return (
                <div className="array-form-card">
                  <Input
                    label="Project Name"
                    value={item.name}
                    onChange={function (value) {
                      updateArrayField(
                        "projects",
                        index,
                        "name",
                        value
                      );
                    }}
                    placeholder="CareerPilot AI"
                  />

                  <Input
                    label="Technologies"
                    value={item.technologies}
                    onChange={function (value) {
                      updateArrayField(
                        "projects",
                        index,
                        "technologies",
                        value
                      );
                    }}
                    placeholder="React, Python, FastAPI, AI"
                  />

                  <Textarea
                    label="Description"
                    value={item.description}
                    onChange={function (value) {
                      updateArrayField(
                        "projects",
                        index,
                        "description",
                        value
                      );
                    }}
                    placeholder="Explain the project, features and your contribution..."
                  />
                </div>
              );
            }}
          />

          <BuilderArraySection
            title="Certifications"
            description="Add relevant certifications and courses."
            icon={<Award size={17} />}
            section="certifications"
            items={resume.certifications}
            onAdd={function () {
              addItem("certifications");
            }}
            onRemove={function (index) {
              removeItem("certifications", index);
            }}
            renderItem={function (item, index) {
              return (
                <div className="array-form-card">
                  <Input
                    label="Certification"
                    value={item.name}
                    onChange={function (value) {
                      updateArrayField(
                        "certifications",
                        index,
                        "name",
                        value
                      );
                    }}
                    placeholder="Python for Data Science"
                  />

                  <Input
                    label="Issuing Organization"
                    value={item.issuer}
                    onChange={function (value) {
                      updateArrayField(
                        "certifications",
                        index,
                        "issuer",
                        value
                      );
                    }}
                    placeholder="Organization Name"
                  />

                  <Input
                    label="Year"
                    value={item.year}
                    onChange={function (value) {
                      updateArrayField(
                        "certifications",
                        index,
                        "year",
                        value
                      );
                    }}
                    placeholder="2026"
                  />
                </div>
              );
            }}
          />
        </div>

        <div className="resume-preview-wrapper">
          <div className="preview-heading no-print">
            <div>
              <span>LIVE PREVIEW</span>
              <h2>Your Resume</h2>
            </div>

            <button
              type="button"
              className="preview-mobile-btn"
              onClick={function () {
                setShowPreview(!showPreview);
              }}
            >
              <Eye size={15} />
              {showPreview ? "Hide" : "Preview"}
            </button>
          </div>

          <div
            className={
              showPreview
                ? "resume-preview"
                : "resume-preview mobile-preview-hidden"
            }
          >
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="builder-field">
      <label>{label}</label>

      <input
        type="text"
        value={value}
        onChange={function (event) {
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="builder-field full-width">
      <label>{label}</label>

      <textarea
        value={value}
        onChange={function (event) {
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

function BuilderArraySection({
  title,
  description,
  icon,
  section,
  items,
  onAdd,
  onRemove,
  renderItem,
}) {
  return (
    <div className="builder-section">
      <div className="builder-section-title">
        <div className="builder-icon">{icon}</div>

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="array-items">
        {items.map(function (item, index) {
          return (
            <div className="array-item" key={index}>
              {renderItem(item, index)}

              {items.length > 1 && (
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={function () {
                    onRemove(index);
                  }}
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="add-item-btn"
        onClick={onAdd}
      >
        <Plus size={15} />
        Add {section.slice(0, -1)}
      </button>
    </div>
  );
}

function ResumePreview({ resume }) {
  const skills = resume.skills
    .split(",")
    .map(function (skill) {
      return skill.trim();
    })
    .filter(function (skill) {
      return skill !== "";
    });

  return (
    <div className="resume-paper">
      <header className="resume-paper-header">
        <h1>{resume.fullName || "Your Name"}</h1>

        <div className="resume-contact">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
          {resume.linkedin && <span>{resume.linkedin}</span>}
          {resume.github && <span>{resume.github}</span>}
        </div>
      </header>

      {resume.objective && (
        <ResumeSection title="Professional Summary">
          <p>{resume.objective}</p>
        </ResumeSection>
      )}

      {resume.education.some(function (item) {
        return item.degree || item.college;
      }) && (
        <ResumeSection title="Education">
          {resume.education.map(function (item, index) {
            if (!item.degree && !item.college) {
              return null;
            }

            return (
              <div className="resume-entry" key={index}>
                <div className="resume-entry-top">
                  <strong>{item.degree}</strong>

                  <span>{item.year}</span>
                </div>

                <div className="resume-entry-sub">
                  <span>{item.college}</span>
                  <span>{item.score}</span>
                </div>
              </div>
            );
          })}
        </ResumeSection>
      )}

      {resume.experience.some(function (item) {
        return item.role || item.company;
      }) && (
        <ResumeSection title="Experience">
          {resume.experience.map(function (item, index) {
            if (!item.role && !item.company) {
              return null;
            }

            return (
              <div className="resume-entry" key={index}>
                <div className="resume-entry-top">
                  <strong>{item.role}</strong>

                  <span>{item.duration}</span>
                </div>

                <div className="resume-entry-sub">
                  <span>{item.company}</span>
                </div>

                {item.description && (
                  <p>{item.description}</p>
                )}
              </div>
            );
          })}
        </ResumeSection>
      )}

      {skills.length > 0 && (
        <ResumeSection title="Technical Skills">
          <p className="resume-skills">
            {skills.join(" • ")}
          </p>
        </ResumeSection>
      )}

      {resume.projects.some(function (item) {
        return item.name || item.description;
      }) && (
        <ResumeSection title="Projects">
          {resume.projects.map(function (item, index) {
            if (!item.name && !item.description) {
              return null;
            }

            return (
              <div className="resume-entry" key={index}>
                <div className="resume-entry-top">
                  <strong>{item.name}</strong>
                </div>

                {item.technologies && (
                  <div className="resume-entry-sub">
                    <span>{item.technologies}</span>
                  </div>
                )}

                {item.description && (
                  <p>{item.description}</p>
                )}
              </div>
            );
          })}
        </ResumeSection>
      )}

      {resume.certifications.some(function (item) {
        return item.name || item.issuer;
      }) && (
        <ResumeSection title="Certifications">
          {resume.certifications.map(function (item, index) {
            if (!item.name && !item.issuer) {
              return null;
            }

            return (
              <div className="resume-entry" key={index}>
                <div className="resume-entry-top">
                  <strong>{item.name}</strong>

                  <span>{item.year}</span>
                </div>

                <div className="resume-entry-sub">
                  <span>{item.issuer}</span>
                </div>
              </div>
            );
          })}
        </ResumeSection>
      )}
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-paper-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}