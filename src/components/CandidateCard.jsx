import React from "react";
import styles from "../styles/CandidateCard.module.css";

const CandidateCard = ({ candidate, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{candidate.name}</h3>
      <p>{candidate.college}</p>

      <p>Assignment: {candidate.assignment_score}</p>
      <p>Video: {candidate.video_score}</p>
      <p>ATS: {candidate.ats_score}</p>

      <strong>Priority: {candidate.priority.toFixed(2)}</strong>
    </div>
  );
};

export default CandidateCard;