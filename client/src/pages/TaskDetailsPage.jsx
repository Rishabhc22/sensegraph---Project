import { useState, useEffect, useRef } from "react";
import "./taskdetailspage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${taskId}`
        );
        setTask(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleSave = async () => {
    const updatedTask = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
      toast.success("Task saved successfully!", {
        style: {
          fontSize: "22px",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      toast.success("Task deleted successfully!", {
        style: {
          fontSize: "22px",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <Link to="/tasks">
        <button className="home-btn btn btn-dark">All Tasks</button>
      </Link>
      <h1>Task Details</h1>
      <div className="title">
        <strong>Title:</strong>
        <input type="text" ref={titleRef} defaultValue={task.title} />
      </div>
      <div className="description">
        <strong>Description:</strong>
        <input
          type="text"
          ref={descriptionRef}
          defaultValue={task.description}
        />
      </div>
      <div className="duedate">
        <strong>Due Date:</strong>
        <input type="text" ref={dueDateRef} defaultValue={task.dueDate} />
      </div>
      <div className="status">
        <strong>Status:</strong>
        <input type="text" ref={statusRef} defaultValue={task.status} />
      </div>

      <button className="edit" onClick={handleSave}>
        Save
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TaskDetailPage;
