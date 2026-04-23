import React, { useState } from "react";

const Filters = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    assignment: [0, 100],
    video: [0, 100],
    ats: [0, 100],
    review: "all"
  });

  const handleChange = (type, index, value) => {
    const newRange = [...filters[type]];
    newRange[index] = Number(value);
    setFilters({ ...filters, [type]: newRange });
  };

  return (
    <div>
      <h3>Filters</h3>

      <div>
        Assignment:
        <input
          type="number"
          onChange={(e) => handleChange("assignment", 0, e.target.value)}
        />
        -
        <input
          type="number"
          onChange={(e) => handleChange("assignment", 1, e.target.value)}
        />
      </div>

      <div>
        Video:
        <input
          type="number"
          onChange={(e) => handleChange("video", 0, e.target.value)}
        />
        -
        <input
          type="number"
          onChange={(e) => handleChange("video", 1, e.target.value)}
        />
      </div>

      <div>
        ATS:
        <input
          type="number"
          onChange={(e) => handleChange("ats", 0, e.target.value)}
        />
        -
        <input
          type="number"
          onChange={(e) => handleChange("ats", 1, e.target.value)}
        />
      </div>

      <div>
        Review Status:
        <select
          onChange={(e) =>
            setFilters({ ...filters, review: e.target.value })
          }
        >
          <option value="all">All</option>
          <option value={true}>Reviewed</option>
          <option value={false}>Not Reviewed</option>
        </select>
      </div>

      <button onClick={() => applyFilters(filters)}>Apply Filters</button>
    </div>
  );
};

export default Filters;