import React, { useState } from "react";

function WorkoutsData({ useData }) {
    const [inputValues, setInputValues] = useState({
        search: "",
        workoutType: "",
        itemsPerPage: "5"
    });
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

    const filteredData = useData.filter((e) => {
        const matchesSearch = e.name.toLowerCase().includes(inputValues.search.toLowerCase());
        const matchesWorkoutType =
            inputValues.workoutType === "all" ||
            e.workouts.some(workout => workout.type.toLowerCase() === inputValues.workoutType.toLowerCase());
        return matchesSearch && matchesWorkoutType;
    });

    return (
        <>
            <div className="sattle">
                <div className="form-container secondP">
                    <div className={`input-wrapper ${focusedField === "search" ? "focused" : ""}`}>
                        <input
                            type="text"
                            name="search"
                            value={inputValues.search}
                            onChange={handleChange}
                            onFocus={() => handleFocus("search")}
                            onBlur={() => handleBlur("search")}
                            placeholder=""
                            className="input"
                        />
                        <label className={`label ${inputValues.search || focusedField === "search" ? "shrink" : ""}`}>
                            Search
                        </label>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className={`input-wrapper secondL ${focusedField === "workoutType" ? "focused" : ""}`}>
                    <select
                        name="workoutType"
                        value={inputValues.workoutType}
                        onChange={handleChange}
                        onFocus={() => handleFocus("workoutType")}
                        onBlur={() => handleBlur("workoutType")}
                        className="input"
                    >
                        <option value="" disabled hidden></option>
                        <option value="all">All</option>
                        <option value="cycling">Cycling</option>
                        <option value="running">Running</option>
                        <option value="swimming">Swimming</option>
                        <option value="yoga">Yoga</option> {/* Added Yoga here */}
                    </select>
                    <label className={`label secondS ${inputValues.workoutType || focusedField === "workoutType" ? "shrink" : ""}`}>
                        Filter by Workout Type
                    </label>
                    <div className="underline"></div>
                </div>
            </div>

            <div className="container shadow tableSet">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Workouts</th>
                            <th scope="col">Number of Workouts</th>
                            <th scope="col">Total Workout Minutes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((e, i) => (
                            <tr key={i}>
                                <th scope="row">{e.name}</th>
                                <td>
                                    {e.workouts.map(workout => workout.type).join(", ")}
                                </td>
                                <td>{e.workouts.length}</td>
                                <td>{e.workouts.reduce((total, workout) => total + workout.minutes, 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example" className="secondE">
                <ul className="pagination text-center">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo; Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">Next &raquo;</span>
                        </a>
                    </li>
                    <div style={{ display: "flex", alignItems: "center", fontSize: '20px' }}>
                        <label style={{ marginRight: "10px" }}>Items per page:</label>
                        <select
                            name="itemsPerPage"
                            value={inputValues.itemsPerPage}
                            onChange={handleChange}
                            style={{ padding: "1px 10px" }}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default WorkoutsData