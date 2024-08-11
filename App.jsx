import './App.css'
import React, { useState } from "react";
import Workout from "./components/Workout"
import WorkoutsData from './components/WorkoutsData';
import WorkoutProgress from './components/WorkoutProgress';


function App() {
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
  ]);
  const handleAddWorkout = (newWorkout) => {
    setUserData(prevData => {
      const userIndex = prevData.findIndex(user => user.name === newWorkout.name);
      if (userIndex !== -1) {
        const updatedUser = {
          ...prevData[userIndex],
          workouts: [...prevData[userIndex].workouts, ...newWorkout.workouts]
        };
        return [
          ...prevData.slice(0, userIndex),
          updatedUser,
          ...prevData.slice(userIndex + 1)
        ];
      } else {
        return [...prevData, newWorkout];
      }
    });
  };


  return (
    <>
      <Workout onAddWorkout={handleAddWorkout} />
      <WorkoutsData useData={userData} />
      <WorkoutProgress useData={userData} />

    </>
  )
}

export default App
