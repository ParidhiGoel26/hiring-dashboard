# Hiring Dashboard

A colorful, interactive React dashboard for evaluating and prioritizing candidates using assignment, video, ATS, and other performance signals.

## Features

- **Candidate table** with key scores and priority labels
- **Top summary section** with:
  - Total candidates
  - Reviewed candidates
  - Shortlisted candidates
  - Pending candidates
- **Advanced filters**
  - Search by candidate name
  - Assignment score range
  - Video score range
  - ATS score range
  - Sort by Priority / Assignment score / None
  - Clear Filters button
- **Priority legend**
  - `P0` → Interview immediately
  - `P1` → Strong shortlist
  - `P2` → Review later
  - `P3` → Reject
- **Candidate detail modal**
  - Click any candidate row to view details
  - Editable score fields:
    - Assignment
    - Video
    - ATS
    - Communication
    - GitHub
  - Typing-only numeric input (no up/down spinner arrows)
  - Priority score auto-recalculates after edits
- **Candidate Comparison Mode**
  - Compare **2–3 candidates** side-by-side
  - Metrics shown:
    - Assignment
    - Video
    - ATS
    - Priority label
  - Clear Comparison button to reset selection
- **Responsive and modern UI**
  - Colorful gradients
  - Card-based layout
  - Mobile/tablet-friendly sections

---

## Tech Stack

- **React** (Create React App)
- **CSS Modules**
- **UUID** for generated candidate IDs

---

## Project Structure

```text
src/
  components/
    Dashboard.jsx
    AssignmentEvaluation.jsx
    VideoEvaluation.jsx
    CandidateCard.jsx
    Filters.jsx
  data/
    generateData.js
  styles/
    Dashboard.module.css
    Evaluation.module.css
    CandidateCard.module.css
    Filters.module.css
  App.js
  index.css
