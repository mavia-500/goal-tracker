// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { RootState } from "../store/store";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { UseDispatch } from "react-redux";
import { addquarterCompletoinPercentage } from "../goalSlice/goalSlice";

// interface Goal {
//   goals: string[];
//   title: string;
//   description: string;
//   quartername: string;
//   newQuadrant: string;
//   tactic: string[];
//   notes: string[];
//   startdate: string;
//   enddate: string;
// }


const Goals = () => {
  const dispatch=useDispatch()
  const { quarter } = useParams<{ quarter: string  }>();
  
  const wholeGoals = useSelector((state: RootState) => state.goals.goals);
  console.log(wholeGoals);

  const showGoals: any = wholeGoals
    .filter((goal) => goal.quartername === quarter)

    const diplaygoal=showGoals.flatMap((goal:any) => goal.goal);
    console.log(diplaygoal)
// let sum=0
    const total=diplaygoal.reduce((acc:number,cur:any)=>{
      return acc+parseFloat(cur.completionPercentage)
 
    },0)
    console.log(total)
    const quarterCompletoinPercentage:number=parseFloat((total/diplaygoal.length).toFixed(2))
console.log(quarterCompletoinPercentage)
if (!quarter) {
  console.error("Quarter parameter is undefined");
  return; // Skip dispatch if quarter is undefined
}
dispatch(addquarterCompletoinPercentage({
  quarter,
  quarterCompletoinPercentage,

}))
    // addquarterCompletoinPercentage
  // const goals = Array.isArray(showGoals?.goals) ? showGoals.goals : [];
  console.log(showGoals);
  const [isOpen, setIsOpen] = useState(false);
  const [quadrantName, setQuadrantName] = useState("");
  const [quadrantNote, setQuadrantNote] = useState("");
  const handleAddQuadrant = () => {
    // Handle form submit here (like saving to state or DB)
    console.log("Quadrant Added:", quadrantName);
    setQuadrantName("");
    setQuadrantNote("");

    setIsOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-purple-50 via-pink-50 to-orange-50">
      <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-12 drop-shadow-md tracking-tight">
        🎯 Goals for {quarter}
      </h2>
      <div className="flex justify-center">
        <Link to={`/newgoal?quarter=${quarter}`}>
          <button className=" cursor-pointer text-3xl font-extrabold text-purple-800 mb-12 drop-shadow-md tracking-tight">
            Add New Goal
          </button>
        </Link>
      </div>

      {diplaygoal[0] === undefined ? (
        <motion.div
          className="text-center text-gray-600 mt-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xl font-semibold text-purple-700">
            No goals found for this quarter.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click on “Add Goal” to get started!
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
          {diplaygoal.map((goal: any, index: any) => {
            return (
              <motion.div
                key={index}
                className={`bg-white p-6 rounded-2xl shadow-lg ring-2 hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{goal.goalTitle}</h3>
                  
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {goal.description}
                </p>
                {/* {goal.tactic.map((tactic) => {})} */}
                <div className="text-sm space-y-2 mt-4">
                  {/* <p>
                    <span className="font-semibold text-gray-800">
                      📝 Notes:
                    </span>{" "}
                    <span className="text-gray-600 italic">
                      {goal.notes || "No notes added"}
                    </span>
                  </p> */}
                  <p>
                    <span className="font-semibold text-gray-800">
                      📅 Start Date:
                    </span>{" "}
                    <span className="text-gray-600">
                      {showGoals[0].startdate || "Not set"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      📅 Deadline:
                    </span>{" "}
                    <span className="text-gray-600">
                      {showGoals[0].enddate || "Not set"}
                    </span>
                  </p>

                  <Link to={`/tactics/${quarter}/${goal.goalTitle}`}>
                    {" "}
                    <p className="text-green-700 font-bold">View Tactics</p>
                  </Link>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    Progress
                  </p>
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                      style={{ width: `${goal.completionPercentage}%` }}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-purple-500 drop-shadow-sm">
                      {goal.completionPercentage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Add New Quadrant
                </h2>
                <input
                  type="text"
                  placeholder="Quadrant Name"
                  value={quadrantName}
                  onChange={(e) => setQuadrantName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="text"
                  placeholder="Note if any"
                  value={quadrantNote}
                  onChange={(e) => setQuadrantNote(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddQuadrant}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Goals;
