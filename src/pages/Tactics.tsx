import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addTactic,
  editTactic,
  toggleTacticCompletion,
} from "../goalSlice/goalSlice";

const Tactics = () => {
  const { quadrant, goaltitle } = useParams<{
    quadrant?: string;
    goaltitle?: string;
  }>();
  const goals = useSelector((state: RootState) => state.goals.goals);
  console.log(goals);
  const dispatch = useDispatch();
  const [newTactic, setNewTactic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTacticText, setEditTacticText] = useState("");

  // Find the specific goal and get its tactics as a flat array
  const quarter = goals.find((g) => g.quartername === quadrant);
  console.log("quarter found ", quarter);

  const goal = quarter?.goal.find((goal) => goal.goalTitle === goaltitle);
  console.log(goal);
  const tactics = goal?.tactics;
  console.log(tactics);

  const completedCount =
    tactics?.filter((tactic) => tactic.completedTactics).length || 0;
  const totalTactics = tactics?.length;
  const completionPercentage: any =
    totalTactics && totalTactics > 0
      ? ((completedCount / totalTactics) * 100).toFixed(2)
      : 0;
  console.log(completionPercentage);
  // / Handle checkbox toggle
  const handleToggleComplete = (index: number) => {
    // Calculate completion percentage

    if (quadrant && goaltitle) {
      dispatch(
        toggleTacticCompletion({
          quadrant,
          goaltitle,
          index,
          completionPercentage,
        })
      );
    }
  };

  const handleTactic = () => {
    if (newTactic.trim() && quadrant && goaltitle) {
      dispatch(
        addTactic({
          quadrant,
          goaltitle,
          newTactic,
          completedTactics: false,
          completionPercentage,
        })
      );
      setNewTactic("");
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleEditTactic = (index: number, tactic: string) => {
    setEditIndex(index);
    setEditTacticText(tactic);
  };

  const handleSaveEdit = (index: number) => {
    if (editTacticText.trim() && quadrant && goaltitle) {
      dispatch(
        editTactic({
          quadrant,
          title: goaltitle,
          index,
          newTactic: editTacticText,
        })
      );
      setEditIndex(null);
      setEditTacticText("");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditTacticText("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Tactics</h3>
      {/* Display completion percentage */}
      <div className="mb-6 text-gray-700">
        <p>
          Completion: {completedCount} / {totalTactics} tactics completed (
          {completionPercentage}%)
        </p>
      </div>
      <div className="mb-8">
        {tactics?.length === 0 ? (
          <div className="text-gray-500 italic text-center">
            No tactics to show please create the tactics first
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tactics?.map((tactic, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {editIndex === index ? (
                  <div className="flex flex-col space-y-3">
                    <input
                      type="text"
                      value={editTacticText}
                      onChange={(e) => setEditTacticText(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder="Edit tactic"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveEdit(index)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <span
                      className={`text-gray-700 text-base font-medium ${
                        tactic.completedTactics
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {tactic.tactic}
                    </span>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleEditTactic(index, tactic.tactic)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200"
                      >
                        Edit
                      </button>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-green-600"
                          checked={tactic.completedTactics || false}
                          onChange={() => handleToggleComplete(index)}
                        />
                        <span className="text-gray-600 text-sm">Completed</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => setIsOpen(true)}
        >
          Add More Tactics
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <input
            name="tactic"
            type="text"
            placeholder="Add a new tactic"
            value={newTactic}
            onChange={(e) => setNewTactic(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleTactic}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            Add Tactic
          </button>
        </div>
      )}
    </div>
  );
};

export default Tactics;
