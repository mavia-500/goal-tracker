
import { Routes,Route } from "react-router-dom";
// import GoalCard from "./components/GoalCard"
import GoalsDashboard from "./components/GoalsDashboard";
import CreateGoal from "./pages/CreateGoal.tsx";
import Goals from "./pages/Goals.tsx";
import Home from "./pages/Home.tsx";
import Quadrant from "./pages/Quadrant.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NewQuadrant from "./pages/NewQuadrant.tsx";
import Tactics from "./pages/Tactics.tsx";

function App() {
  

  return (
    <>
    <Home/>
    {/* <GoalsDashboard/> */}
    <Routes>
    <Route path='/' element={<Quadrant/>}/>
    <Route path='/newgoal' element={<CreateGoal/>}/>
    <Route path='/goals/:quarter' element={<Goals/>}/>
    <Route path='/quadrant' element={<Quadrant/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/newquadrant' element={<NewQuadrant/>}/>
    <Route path='/tactics/:quadrant/:goaltitle' element={<Tactics/>}/>

    </Routes>
     {/* <GoalCard/> */}
    </>
  )
}

export default App
