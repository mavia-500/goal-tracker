import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoalCard from "../components/GoalCard";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";



const Quadrant: FC = () => {
  const goalsData = useSelector((state: RootState) => state.goals.goals);
  console.log(goalsData)
  
  /////calculate the goal
  const uniqueGoalsByQuadrant = goalsData.reduce((acc: any, goal: any) => {
    // If the quadrant hasn't been added yet, add this goal
    if (!acc[goal.quadrant]) {
      {acc[goal.quadrant] = goal}
    }
    
    return acc;
  }, {});

  const uniqueGoalsByQuadrantobj = Object.values(uniqueGoalsByQuadrant);
  console.log(uniqueGoalsByQuadrantobj)
  return (
    <motion.div
      className="min-h-screen px-4 flex flex-col items-center justify-between font-sans bg-gradient-to-tr from-purple-100 via-pink-100 to-orange-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6 mt-6">
          <h2 className="text-3xl font-extrabold text-purple-900 text-center tracking-tight drop-shadow-md">
            ✨ My Quadrants
          </h2>
          <Link to="/newquadrant">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md flex items-center justify-center hover:shadow-lg"
            >
              <PlusIcon className="h-5 w-5" />
            </motion.button>
          </Link>
        </div>

        {/* Conditional rendering: Empty state or Goals */}
        {goalsData.length === 0 ? (
          <motion.div
            className="mt-20 text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-semibold text-purple-800 mb-2">
              No Quadrant Found
            </h3>
            <p className="text-gray-600 mb-6 px-6">
              You haven’t added any Quadrant yet. Let’s get started and create your
              first one!
            </p>
            <Link to="/newquadrant">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-white rounded-full font-semibold bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                + Add Your First Quadrant
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {goalsData.map((goal: any, index: number) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link to={`/goals/${goal.quartername}`}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <GoalCard {...goal} />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-10 h-5 bg-transparent" />
    </motion.div>
  );
};

export default Quadrant;
