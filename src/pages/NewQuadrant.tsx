import React, { useState } from "react";
import { addGoal } from "../goalSlice/goalSlice";
import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NewQuadrant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quatarData, setQuatarData] = useState({
    quartername: "",
    startdate: "",
    enddate: "",
  });
  const handleInputs = (e: any) => {
    const { name, value } = e.target;
    setQuatarData((quartarData) => ({
      ...quartarData,
      [name]: value,
    }));
  };

  console.log(quatarData)
  const handleSubmit = () => {
    if (!quatarData.quartername || !quatarData.startdate || !quatarData.enddate) {
      alert("Please fill in all required fields (Title and Quadrant).");
      return;
    }
    const start = new Date(quatarData.startdate);
    const end = new Date(quatarData.enddate);
  
    if (start > end) {
      alert("Start date cannot be after end date.");
      return;
    }

    dispatch(addGoal(quatarData));
    navigate('/quadrant')
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter Your Quadrant Details
        </h2>
        <div className="space-y-4">
          <div>
            <input
              name="quartername"
              type="text"
              placeholder="Enter the Quarter Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputs}
              required
            />
          </div>
          <div>
            <input
              name="startdate"
              type="date"
              placeholder="Enter the start date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputs}
              required
            />
          </div>
          <div>
            <input
              name="enddate"
              type="date"
              placeholder="Enter the end date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputs}
              required
            />
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewQuadrant;
