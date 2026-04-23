# 🚀 Hiring Dashboard (Recruiter Evaluation Tool)

A modern, interactive hiring dashboard built using React that helps recruiters efficiently evaluate, prioritize, and shortlist candidates at scale.

---

## 🎯 Objective

This project simulates a real internal hiring tool used by recruiters to:

- Inspect candidate profiles
- Evaluate assignments and video explanations
- Automatically compute candidate priority
- Compare candidates side-by-side
- Make data-driven hiring decisions

---
## Tech Stack
- **React** (Create React App)
- **CSS Modules**
- **UUID** for generated candidate IDs
---

## 🧠 Key Features

### 🟦 1. Candidate List Panel
- Displays candidates in a structured table
- Columns:
  - Name
  - College
  - Assignment Score
  - Video Score
  - ATS Score
  - Priority Score
- Features:
  - 🔍 Search by name
  - 🎛 Filter by:
    - Assignment score range
    - Video score range
    - ATS score range
  - 🔽 Sort by:
    - Priority
    - Assignment score

---

### 🟨 2. Candidate Detail Panel
- Opens on clicking a candidate
- Displays:
  - ATS Score
  - Assignment Score
  - Video Score
  - Communication Score
  - GitHub Score
- Clean modal-based UI for focused evaluation

---

### 🟦 3. Assignment Evaluation Panel
Allows structured evaluation using:
- UI Quality
- Component Structure
- State Handling
- Edge-case Handling
- Responsiveness
- Accessibility

👉 Uses button-based rating system (1–5)

---

### 🟨 4. Video Evaluation Panel
Evaluate:
- Clarity
- Confidence
- Architecture Explanation
- Tradeoff Reasoning
- Communication

👉 Includes timestamp-based notes:
02:10 – clear explanation
03:15 – unclear reasoning

---

### 🔥 5. Priority Engine (Core Logic)

Priority Score is calculated using weighted metrics:
Priority Score =
30% Assignment +
25% Video +
20% ATS +
15% GitHub +
10% Communication


### 📊 Priority Levels:

| Priority | Meaning |
|--------|--------|
| 🟢 P0 | Interview Immediately |
| 🟡 P1 | Strong Shortlist |
| 🟠 P2 | Review Later |
| 🔴 P3 | Reject |

👉 Automatically updates based on candidate data

---

### 📊 6. Dashboard Summary Panel

Displays:
- Total Candidates
- Reviewed Candidates
- Pending Candidates

---

### ⚖️ 7. Candidate Comparison Mode

- Compare 2–3 candidates side-by-side
- Helps recruiters make quick decisions

Example:


Assignment: 85 vs 72
Video: 70 vs 60
ATS: 90 vs 55
Priority: P0 vs P2


---

### 🎨 8. Visual Indicators

- Color-coded priority badges
- Highlighted top candidates
- Progress bars for score visualization

---

## 📦 Dummy Data

- Generated locally
- 100 candidates (randomized data)


---

## ⚙️ Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ParidhiGoel26/hiring-dashboard.git
cd hiring-dashboard
npm install
npm install uuid
npm start

---



