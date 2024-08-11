import React, { useState } from "react";

function Workout({ onAddWorkout }) {
  const [inputValues, setInputValues] = useState({ username: "", activity: "", workoutMinutes: "" });
  const [focusedField, setFocusedField] = useState("");

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field) => {
    if (inputValues[field] === "") {
      setFocusedField("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleAddClick = () => {
    if (inputValues.username && inputValues.activity && inputValues.workoutMinutes) {
      onAddWorkout({
        name: inputValues.username,
        workouts: [
          { type: inputValues.activity, minutes: parseInt(inputValues.workoutMinutes, 10) }
        ]
      });
      setInputValues({ username: "", activity: "", workoutMinutes: "" });
    }
  };

  return (
    <div className="first">
      {/* Username Field */}
      <div className={`input-wrapper ${focusedField === "username" ? "focused" : ""}`}>
        <input
          type="text"
          name="username"
          value={inputValues.username}
          onChange={handleChange}
          onFocus={() => handleFocus("username")}
          onBlur={() => handleBlur("username")}
          placeholder=""
          className="input"
        />
        <label className={`label ${inputValues.username || focusedField === "username" ? "shrink" : ""}`}>
          Username
        </label>
        <div className="underline"></div>
      </div>

      {/* Activity Dropdown Field */}
      <div className={`input-wrapper ${focusedField === "activity" ? "focused" : ""}`}>
        <select
          name="activity"
          value={inputValues.activity}
          onChange={handleChange}
          onFocus={() => handleFocus("activity")}
          onBlur={() => handleBlur("activity")}
          className="input select"
        >
          <option value="" disabled hidden>Select Activity</option>
          <option value="Cycling">Cycling</option>
          <option value="Running">Running</option>
          <option value="Swimming">Swimming</option>
          <option value="Yoga">Yoga</option>
        </select>
        {/* Removed the label for the activity field */}
        <div className="underline"></div>
      </div>

      {/* Workout Minutes Field */}
      <div className={`input-wrapper ${focusedField === "workoutMinutes" ? "focused" : ""}`}>
        <input
          type="number"
          name="workoutMinutes"
          value={inputValues.workoutMinutes}
          onChange={handleChange}
          onFocus={() => handleFocus("workoutMinutes")}
          onBlur={() => handleBlur("workoutMinutes")}
          placeholder=""
          className="input"
        />
        <label className={`label ${inputValues.workoutMinutes || focusedField === "workoutMinutes" ? "shrink" : ""}`}>
          Workout Minutes
        </label>
        <div className="underline"></div>
      </div>

      <div className="three">
        <button className="btnA shadow" onClick={handleAddClick}>Add Workout</button>
      </div>
    </div>
  );
}

export default Workout