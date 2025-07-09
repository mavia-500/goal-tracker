import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the shape of a single goal
interface Goal {
  quartername: string;
  quarterCompletoinPercentage: number;
  goal: {
    goalTitle: string;
    description: string;
    tactics: { tactic: string; completedTactics: boolean }[];
    completionPercentage: number | 0;
  }[];
  startdate: string;
  enddate: string;
}

// Define the state shape
interface GoalsState {
  goals: Goal[];
}

// Initial state
const initialState: GoalsState = {
  goals: [],
};

// Create the slice
const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      console.log(state.goals);
      state.goals.push({
        ...action.payload,
        // tactic: Array.isArray(action.payload.tactic) ? action.payload.tactic : [],
        // goals: Array.isArray(action.payload.goals) ? action.payload.goals : [],
      });
    },

    addquarterCompletoinPercentage: (
      state: GoalsState,
      action: PayloadAction<{
        quarter: string;
        quarterCompletoinPercentage: number;
      }>
    ) => {
      const {quarterCompletoinPercentage,quarter}=action.payload
      const quartar = state.goals.find((g) => g.quartername === quarter);
      if(quartar){
        quartar.quarterCompletoinPercentage = quarterCompletoinPercentage
      }
      
    },

    addTactic: (
      state: GoalsState,
      action: PayloadAction<{
        quadrant: string;
        goaltitle: string;
        newTactic: string;
        completedTactics: boolean;
        completionPercentage: number;
      }>
    ) => {
      const { quadrant, goaltitle, newTactic, completedTactics } =
        action.payload;
      console.log("Action:", action);
      console.log("Payload:", {
        quadrant,
        goaltitle,
        newTactic,
        completedTactics,
      });
      console.log("State:", state);

      // Find the goal matching both quadrant and goaltitle
      const quarter = state.goals.find((g) => g.quartername === quadrant);
      console.log("Found gquartre:", quarter);

      const goalo = quarter?.goal.find((goal) => {
        if (goal.goalTitle === goaltitle) {
          return goal;
        }
      });
      console.log("Found goal:", goalo);

      // const addtact = quarter?.goal;
      if (goalo) {
        // Ensure goal.tactic is an array
        if (!Array.isArray(goalo.tactics)) {
          goalo.tactics = goalo.tactics ? [goalo.tactics] : [];
        }
        // Add the new tactic
        goalo.tactics.push({ tactic: newTactic, completedTactics });
      } else {
        console.warn(
          `Goal with quadrant "${quadrant}" and title "${goaltitle}" not found.`
        );
      }
    },

    toggleTacticCompletion: (
      state: GoalsState,
      action: PayloadAction<{
        quadrant: string;
        goaltitle: string;
        index: number;
        completionPercentage: number | 0;
      }>
    ) => {
      const { quadrant, goaltitle, index, completionPercentage } =
        action.payload;

      // Find the quarter and goal
      const quarter = state.goals.find((g) => g.quartername === quadrant);
      const goal = quarter?.goal.find((g) => g.goalTitle === goaltitle);
      console.log(goal);
      if (goal) {
        goal.completionPercentage = completionPercentage;
        console.log(completionPercentage);
      }
      if (
        goal &&
        Array.isArray(goal.tactics) &&
        index >= 0 &&
        index < goal.tactics.length
      ) {
        // Toggle the completedTactics boolean for the specified tactic
        goal.tactics[index].completedTactics =
          !goal.tactics[index].completedTactics;

        // Calculate and update completionPercentage
      } else {
        console.warn(
          `Goal or tactic not found for quadrant "${quadrant}", title "${goaltitle}", index ${index}.`
        );
      }
    },

    editTactic: (
      state,
      action: PayloadAction<{
        quadrant: string;
        goaltitle: string;
        index: number;
        newTactic: string;
      }>
    ) => {
      const { quadrant, goaltitle, index, newTactic } = action.payload;
      console.log(quadrant,goaltitle)
      const quarter = state.goals.find((g) => g.quartername === quadrant);
      const goal = quarter?.goal.find((g) => g.goalTitle === goaltitle);
      console.log(goal)
      if (
        goal &&
        Array.isArray(goal.tactics) &&
        index >= 0 &&
        index < goal.tactics.length
      ) {
        goal.tactics[index] = {tactic:newTactic,completedTactics:false};
      } else {
        console.warn(
          `Goal or tactic not found for quadrant "${quadrant}", title "${goaltitle}", index ${index}.`
        );
      }
    },

    addSeperateGoal: (
      state,
      action: PayloadAction<{
        quartername: string;
        goalTitle: string;
        description: string;
      }>
    ) => {
      const { quartername, goalTitle, description } = action.payload;
      console.log(quartername, goalTitle, description);
      const goal = state.goals.find((g) => g.quartername === quartername);
      if (goal) {
        if (!Array.isArray(goal.goal)) {
          goal.goal = goal.goal ? [goal.goal] : [];
        }
        goal.goal.push({ goalTitle: goalTitle, description, tactics: [],completionPercentage:0 });
        // goal.description.push(description);
      } else {
        console.warn(
          `Goal with quadrant "${quartername}" and title "${goalTitle}" not found.`
        );
      }
    },
    // editTactic: (state, action: PayloadAction<{ quadrant: string; title: string; index: number; newTactic: string }>) => {
    //   const { quadrant, title, index, newTactic } = action.payload;
    //   const goal = state.goals.find(
    //     (g) => g.quadrant === quadrant && g.title === title
    //   );
    //   if (goal && Array.isArray(goal.tactic) && index >= 0 && index < goal.tactic.length) {
    //     goal.tactic[index] = newTactic;
    //   } else {
    //     console.warn(`Goal or tactic not found for quadrant "${quadrant}", title "${title}", index ${index}.`);
    //   }
    // },
  },
});

// Export actions
export const {
  addGoal,
  addTactic,
  editTactic,
  addSeperateGoal,
  toggleTacticCompletion,
  addquarterCompletoinPercentage
} = goalsSlice.actions;

// Export reducer
export default goalsSlice.reducer;
