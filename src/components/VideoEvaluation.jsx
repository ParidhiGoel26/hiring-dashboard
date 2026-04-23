import React, { useState } from "react";
import styles from "../styles/Evaluation.module.css";

const VideoEvaluation = () => {
  const [ratings, setRatings] = useState({
    clarity: 3,
    confidence: 3,
    architecture: 3,
    tradeoff: 3,
    communication: 3,
  });

  const [notes, setNotes] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [text, setText] = useState("");

  const addNote = () => {
    if (!timestamp || !text) return;
    setNotes([...notes, { timestamp, text }]);
    setTimestamp("");
    setText("");
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Video Evaluation</h3>
      <div className={styles.rows}>
        {Object.entries({
          clarity: "Clarity",
          confidence: "Confidence",
          architecture: "Architecture",
          tradeoff: "Tradeoffs",
          communication: "Communication",
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

      <h4 className={styles.notesTitle}>Timestamp Notes</h4>
      <div className={styles.notesInput}>
        <input
          placeholder="mm:ss"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <input
          placeholder="Note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={styles.notesButton} onClick={addNote}>
          Add
        </button>
      </div>

      <ul className={styles.notes}>
        {notes.map((n, i) => (
          <li key={i}>
            {n.timestamp} - {n.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoEvaluation;