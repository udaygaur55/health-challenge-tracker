import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";


function WorkoutProgress({ useData }) {
    const [selectedUsername, setSelectedUsername] = useState("");

    const handleUsernameClick = (username) => {
        setSelectedUsername(username);
    };

    const filteredData = useData.find(e => e.name === selectedUsername);

    const chartData = filteredData
        ? filteredData.workouts
        : [];

    return (
        <>
            <div className="setup">
                <div className="setupOne" style={{ height: "200px", width: "280px", color: 'black', padding: "20px" }}>
                    <div className="username-list bg-light">
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {useData.map((data, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleUsernameClick(data.name)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        backgroundColor: selectedUsername === data.name ? "#ddd" : "#fff",
                                        borderBottom: "1px solid #ccc"
                                    }}
                                >
                                    {data.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="chart-container SetS" style={{ marginTop: "20px", display: 'flex', direction: 'column' }}>
                    <h1>{selectedUsername}'s workout progress</h1>
                    <ResponsiveContainer width="70%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="minutes" fill="#A0D1F6">
                                <LabelList dataKey="minutes" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}

export default WorkoutProgress