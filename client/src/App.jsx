import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskCreationPage from "./pages/taskcreation/TaskCreation";
import TaskListingPage from "./pages/tasklistingpage/TaskListingPage";
import TaskDetailPage from "./pages/TaskDetailsPage";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskListingPage />} />
        <Route path="/create" element={<TaskCreationPage />} />
        <Route path="/details/:taskId" element={<TaskDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
