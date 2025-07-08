import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a single goal
interface Goal {
  goals:string[]
  title: string;
  description: string[];
  quartername: string;
  tactic: string[];
  notes: string;
  deadline: string | null;
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
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      state.goals.push({
        ...action.payload,
        tactic: Array.isArray(action.payload.tactic) ? action.payload.tactic : [],
        goals: Array.isArray(action.payload.goals) ? action.payload.goals : [],
      });
    },
    addTactic: (state, action: PayloadAction<{ quadrant: string; title: string; tactic: string }>) => {
      const { quadrant, title, tactic } = action.payload;
      const goal = state.goals.find(
        (g) => g.quartername === quadrant 
      );
      if (goal) {
        if (!Array.isArray(goal.tactic)) {
          goal.tactic = goal.tactic ? [goal.tactic] : [];
        }
        goal.tactic.push(tactic);
      } else {
        console.warn(`Goal with quadrant "${quadrant}" and title "${title}" not found.`);
      }
    },
    editTactic: (state, action: PayloadAction<{ quadrant: string; title: string; index: number; newTactic: string }>) => {
      const { quadrant, title, index, newTactic } = action.payload;
      const goal = state.goals.find(
        (g) => g.quartername === quadrant 
      );
      if (goal && Array.isArray(goal.tactic) && index >= 0 && index < goal.tactic.length) {
        goal.tactic[index] = newTactic;
      } else {
        console.warn(`Goal or tactic not found for quadrant "${quadrant}", title "${title}", index ${index}.`);
      }
    },

    addSeperateGoal: (state, action: PayloadAction<{ quartername: string; title: string; description: string }>) => {
      const { quartername, title, description } = action.payload;
      console.log(quartername, title, description)
      const goal = state.goals.find(
        (g) => g.quartername === quartername 
      );
      if (goal) {
        if (!Array.isArray(goal.goals)) {
          goal.goals = goal.goals ? [goal.goals] : [];
        }
        goal.goals.push(title);
        // goal.description.push(description);
      } else {
        console.warn(`Goal with quadrant "${quartername}" and title "${title}" not found.`);
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
export const { addGoal, addTactic, editTactic,addSeperateGoal } = goalsSlice.actions;

// Export reducer
export default goalsSlice.reducer;