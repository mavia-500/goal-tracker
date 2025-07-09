import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSeperateGoal } from "../goalSlice/goalSlice";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const NewGoalForm = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const quarter = queryParams.get('quarter');
  const [isOpen, setIsOpen] = useState(false);
// const{quarter}=useParams()
  console.log(quarter)
  // Define TypeScript interface for goalData
  interface GoalData {
    goalTitle: string;
    description: string;
    quartername:string
  }

  // Initialize state with all form fields
  const [goalData, setGoalData] = useState<GoalData>({
    goalTitle: "",
    description: "",
    quartername:quarter || ""
  });

  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // Handle input changes for text, textarea, and select
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number
  ) => {
    const { name, value } = e.target;

    // Update other fields
    setGoalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new tactic/notes pair


 

  // Handle form submission
  const handleSubmit = () => {
    // Validate required fields
    if (!goalData.goalTitle) {
      alert("Please fill in all required fields (Title and Quadrant).");
      return;
    }

    // Dispatch goalData to Redux store
    dispatch(addSeperateGoal(goalData));

    // Reset form after submission
    setGoalData({
      goalTitle: "",
      description: "",
      quartername:quarter || ""
    });
    setIsOpen(false);
    navigate(`/goals/${quarter}`)
   
  };

  // Handle quadrant form submit

  console.log(goalData);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{
        fontFamily: "Manrope, Noto Sans, sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between">
        <h2 className="text-lg font-bold text-[#111418] text-center flex-1 pr-12">
          New Goal
        </h2>
      </div>

      {/* Centered Form Wrapper */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Inputs */}
        <div className="max-w-[480px] w-full px-4 space-y-4">
          <input
            type="text"
            name="goalTitle"
            placeholder="Goal Title"
            value={goalData.goalTitle}
            onChange={handleInputChange}
            className="w-full h-14 rounded-lg bg-[#f0f2f5] p-4 text-base placeholder:text-[#60758a] focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description if any"
            value={goalData.description}
            onChange={handleInputChange}
            className="w-full min-h-36 rounded-lg bg-[#f0f2f5] p-4 text-base placeholder:text-[#60758a] focus:outline-none"
          />
          

          
        </div>

        {/* Save Button */}
        <div className="px-4 py-6">
          <button
            onClick={handleSubmit}
            className="h-12 w-30 mb-10 bg-[#0c7ff2] text-white rounded-lg font-bold"
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGoalForm;
