import React, { useState } from "react";
import styles from "../styles/Evaluation.module.css";

const AssignmentEvaluation = () => {
  const [ratings, setRatings] = useState({
    ui: 3,
    structure: 3,
    state: 3,
    edge: 3,
    responsive: 3,
    access: 3,
  });

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Assignment Evaluation</h3>
      <div className={styles.rows}>
        {Object.entries({
          ui: "UI Quality",
          structure: "Component Structure",
          state: "State Handling",
          edge: "Edge-case Handling",
          responsive: "Responsiveness",
          access: "Accessibility",
        }).map(([key, label]) => (
          <div key={key} className={styles.row}>
            <label>
              {label}: {ratings[key]}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={ratings[key]}
              onChange={(e) =>
                setRatings({ ...ratings, [key]: Number(e.target.value) })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentEvaluation;