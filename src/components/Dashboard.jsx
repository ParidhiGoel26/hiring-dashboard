import React, { useEffect, useState } from "react";
import { generateCandidates } from "../data/generateData";
import AssignmentEvaluation from "./AssignmentEvaluation";
import VideoEvaluation from "./VideoEvaluation";
import styles from "../styles/Dashboard.module.css";

const getPriorityLabel = (score) => {
  if (score >= 80) return "P0";
  if (score >= 65) return "P1";
  if (score >= 50) return "P2";
  return "P3";
};

const calculatePriority = (candidate) =>
  candidate.assignment_score * 0.3 +
  candidate.video_score * 0.25 +
  candidate.ats_score * 0.2 +
  candidate.github_score * 0.15 +
  candidate.communication_score * 0.1;

const clampScore = (value) => Math.min(100, Math.max(0, Number(value) || 0));

const Dashboard = () => {
  const defaultFilters = {
    assignment: [0, 100],
    video: [0, 100],
    ats: [0, 100],
  };

  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("none");
  const [comparisonIds, setComparisonIds] = useState([]);

  useEffect(() => {
    const data = generateCandidates(100);

    const ranked = data.map((c) => ({
      ...c,
      priority: calculatePriority(c),
      reviewed: Boolean(c.reviewed),
    }));

    setCandidates(ranked);
  }, []);

  const filteredCandidates = candidates
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (c) =>
        c.assignment_score >= filters.assignment[0] &&
        c.assignment_score <= filters.assignment[1]
    )
    .filter(
      (c) =>
        c.video_score >= filters.video[0] &&
        c.video_score <= filters.video[1]
    )
    .filter(
      (c) =>
        c.ats_score >= filters.ats[0] &&
        c.ats_score <= filters.ats[1]
    );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "none") {
      return 0;
    }
    if (sortBy === "assignment") {
      return b.assignment_score - a.assignment_score;
    }
    return b.priority - a.priority;
  });

  const comparedCandidates = candidates.filter((candidate) =>
    comparisonIds.includes(candidate.id)
  );

  const toggleComparison = (candidateId) => {
    setComparisonIds((prevIds) => {
      if (prevIds.includes(candidateId)) {
        return prevIds.filter((id) => id !== candidateId);
      }
      if (prevIds.length >= 3) {
        return prevIds;
      }
      return [...prevIds, candidateId];
    });
  };

  const updateCandidateScore = (candidateId, field, value) => {
    const nextValue = clampScore(value);
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) => {
        if (candidate.id !== candidateId) {
          return candidate;
        }
        const updated = { ...candidate, [field]: nextValue };
        return { ...updated, priority: calculatePriority(updated) };
      })
    );

    setSelected((prevSelected) => {
      if (!prevSelected || prevSelected.id !== candidateId) {
        return prevSelected;
      }
      const updated = { ...prevSelected, [field]: nextValue };
      return { ...updated, priority: calculatePriority(updated) };
    });
  };

  const reviewedCandidates = candidates.filter((c) => c.reviewed).length;
  const shortlistedCandidates = candidates.filter((c) => c.priority >= 65).length;
  const pendingCandidates = candidates.length - reviewedCandidates;

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Talent Intelligence</p>
          <h1 className={styles.title}>Hiring Dashboard</h1>
          <p className={styles.subtitle}>
            Discover standout candidates with unified scoring, filtering, and deep evaluation.
          </p>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.statCard}>
          <p>Total Candidates</p>
          <strong>{candidates.length}</strong>
        </div>
        <div className={styles.statCard}>
          <p>Reviewed Candidates</p>
          <strong>{reviewedCandidates}</strong>
        </div>
        <div className={styles.statCard}>
          <p>Shortlisted Candidates</p>
          <strong>{shortlistedCandidates}</strong>
        </div>
        <div className={styles.statCard}>
          <p>Pending Candidates</p>
          <strong>{pendingCandidates}</strong>
        </div>
      </div>

      <div className={styles.priorityLegend}>
        <h3>Priority Meaning</h3>
        <div className={styles.legendGrid}>
          <div className={styles.legendItem}>
            <span className={`${styles.badge} ${styles.P0}`}>P0</span>
            <p>Interview immediately</p>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.badge} ${styles.P1}`}>P1</span>
            <p>Strong shortlist</p>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.badge} ${styles.P2}`}>P2</span>
            <p>Review later</p>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.badge} ${styles.P3}`}>P3</span>
            <p>Reject</p>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <h3 className={styles.filterTitle}>Filters</h3>
        <div className={styles.filterSearch}>
          <label>Search Name</label>
          <input
            placeholder="e.g. Student 101"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label>Assignment Score</label>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.assignment[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    assignment: [Number(e.target.value), filters.assignment[1]],
                  })
                }
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.assignment[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    assignment: [filters.assignment[0], Number(e.target.value)],
                  })
                }
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Video Score</label>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.video[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    video: [Number(e.target.value), filters.video[1]],
                  })
                }
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.video[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    video: [filters.video[0], Number(e.target.value)],
                  })
                }
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>ATS Score</label>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.ats[0]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ats: [Number(e.target.value), filters.ats[1]],
                  })
                }
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.ats[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ats: [filters.ats[0], Number(e.target.value)],
                  })
                }
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="none">None</option>
              <option value="priority">Priority</option>
              <option value="assignment">Assignment score</option>
            </select>
          </div>
        </div>
        <div className={styles.filterActions}>
          <button
            className={styles.clearButton}
            onClick={() => {
              setSearch("");
              setFilters(defaultFilters);
              setSortBy("none");
              setComparisonIds([]);
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className={styles.comparePanel}>
        <div className={styles.compareHeader}>
          <div>
            <h3>Candidate Comparison Mode</h3>
            <p>Select 2-3 candidates to compare side-by-side.</p>
          </div>
          <button
            className={styles.clearComparisonButton}
            onClick={() => setComparisonIds([])}
            disabled={comparisonIds.length === 0}
          >
            Clear Comparison
          </button>
        </div>
        {comparedCandidates.length < 2 ? (
          <p className={styles.compareHint}>
            Select at least 2 candidates from the table to view comparison.
          </p>
        ) : (
          <div className={styles.compareGrid}>
            <div className={styles.compareMetricColumn}>
              <span>Metric</span>
              <span>Assignment</span>
              <span>Video</span>
              <span>ATS</span>
              <span>Priority</span>
            </div>
            {comparedCandidates.map((candidate) => (
              <div key={candidate.id} className={styles.compareCandidateColumn}>
                <span className={styles.compareCandidateName}>{candidate.name}</span>
                <span>{candidate.assignment_score}</span>
                <span>{candidate.video_score}</span>
                <span>{candidate.ats_score}</span>
                <span className={`${styles.badge} ${styles[getPriorityLabel(candidate.priority)]}`}>
                  {getPriorityLabel(candidate.priority)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Compare</th>
              <th>Name</th>
              <th>College</th>
              <th>Assignment</th>
              <th>Video</th>
              <th>ATS</th>
              <th>Priority</th>
              <th>Label</th>
            </tr>
          </thead>

          <tbody>
            {sortedCandidates.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className={c.priority >= 75 ? styles.topCandidate : ""}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={comparisonIds.includes(c.id)}
                    disabled={!comparisonIds.includes(c.id) && comparisonIds.length >= 3}
                    onChange={() => toggleComparison(c.id)}
                  />
                </td>
                <td>{c.name}</td>
                <td>{c.college}</td>
                <td>{c.assignment_score}</td>
                <td>{c.video_score}</td>
                <td>{c.ats_score}</td>

                <td>{c.priority.toFixed(1)}</td>

                <td>
                  <span className={`${styles.badge} ${styles[getPriorityLabel(c.priority)]}`}>
                    {getPriorityLabel(c.priority)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.college}</p>
              </div>
              <span className={`${styles.badge} ${styles[getPriorityLabel(selected.priority)]}`}>
                {getPriorityLabel(selected.priority)}
              </span>
            </div>

            <div className={styles.section}>
              <h4>Scores</h4>
              <div className={styles.scoreMetaGrid}>
                <div className={styles.editableMetric}>
                  <label>ATS</label>
                  <input
                    className={styles.metricInput}
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="100"
                    value={selected.ats_score}
                    onChange={(e) => updateCandidateScore(selected.id, "ats_score", e.target.value)}
                  />
                </div>
                <div className={styles.editableMetric}>
                  <label>Assignment</label>
                  <input
                    className={styles.metricInput}
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="100"
                    value={selected.assignment_score}
                    onChange={(e) =>
                      updateCandidateScore(selected.id, "assignment_score", e.target.value)
                    }
                  />
                </div>
                <div className={styles.editableMetric}>
                  <label>Video</label>
                  <input
                    className={styles.metricInput}
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="100"
                    value={selected.video_score}
                    onChange={(e) => updateCandidateScore(selected.id, "video_score", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Other Metrics</h4>
              <div className={styles.scoreMetaGrid}>
                <div className={styles.editableMetric}>
                  <label>Communication</label>
                  <input
                    className={styles.metricInput}
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="100"
                    value={selected.communication_score}
                    onChange={(e) =>
                      updateCandidateScore(selected.id, "communication_score", e.target.value)
                    }
                  />
                </div>
                <div className={styles.editableMetric}>
                  <label>GitHub</label>
                  <input
                    className={styles.metricInput}
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="100"
                    value={selected.github_score}
                    onChange={(e) => updateCandidateScore(selected.id, "github_score", e.target.value)}
                  />
                </div>
                <p>Priority Score: {selected.priority.toFixed(1)}</p>
              </div>
            </div>

            <div className={styles.section}>
              <AssignmentEvaluation />
              <VideoEvaluation />
            </div>

            <button className={styles.closeButton} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;