import { v4 as uuidv4 } from "uuid";

const colleges = [
  "IIT Delhi",
  "NIT Trichy",
  "BITS Pilani",
  "ABC Institute",
  "XYZ University"
];

export const generateCandidates = (count = 100) => {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: "Student " + Math.floor(Math.random() * 1000),
    college: colleges[Math.floor(Math.random() * colleges.length)],
    assignment_score: Math.floor(Math.random() * 100),
    video_score: Math.floor(Math.random() * 100),
    ats_score: Math.floor(Math.random() * 100),
    github_score: Math.floor(Math.random() * 100),
    communication_score: Math.floor(Math.random() * 100),
    reviewed: Math.random() > 0.4,
  }));
};