import { FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface GoalCardProps {
  quartername: string;
  startdate: string;
  enddate: string;
  goals: string;
  quarterCompletoinPercentage: number;
  score: number;
}

const GoalCard: FC<GoalCardProps> = ({
  quartername,
  quarterCompletoinPercentage,
  score,
  enddate,
  startdate,
}) => {
  const goalsData = useSelector((state: RootState) => state.goals.goals);
  const noOfGoals = goalsData.reduce((acc: any, cuu: any) => {
    if (!acc[cuu.quartername]) {
      acc[cuu.quartername] = 1;
    } else {
      acc[cuu.quartername] + 1;
    }
    return acc;
  }, {});

  console.log(noOfGoals);
  return (
    <div className="bg-white border border-purple-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold text-purple-800">{quartername}</h3>
      {/* <p className="text-sm text-gray-600">goals:{noOfGoals.Quadrant1}</p> */}
      <p className="text-sm text-gray-600 m-2">Start Date:{startdate}</p>
      <p className="text-sm text-gray-600 m-2">End Date:{enddate}</p>
      {/* <p className="text-sm text-gray-500 mt-1">Score: {score}%</p> */}

      {/* Pretty Progress Bar */}
      <div className="w-[65%] mt-4">
        <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${quarterCompletoinPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {quarterCompletoinPercentage}% complete
        </p>
      </div>
    </div>
  );
};

export default GoalCard;
