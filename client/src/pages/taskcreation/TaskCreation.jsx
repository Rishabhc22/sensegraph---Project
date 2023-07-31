import { useRef } from "react";
import "./taskcreation.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskCreationPage = () => {
  const token = localStorage.getItem("jwtToken");

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        dueDate: dueDateRef.current.value,
      };

      const response = await axios.post(
        `http://localhost:5000/api/tasks`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task created successfully!", {
        style: {
          fontSize: "22px",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/">
        <button className="home-btn">HomePage</button>
      </Link>
      <Link to="/tasks">
        <button className="tasks-btn">All Tasks</button>
      </Link>
      <h1 className="heading">Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>Title</label>
          <input type="text" ref={titleRef} required />
        </div>
        <div className="description">
          <label>Description</label>
          <textarea ref={descriptionRef} required />
        </div>
        <div className="duedate">
          <label>Due Date</label>
          <input type="date" ref={dueDateRef} required />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}
        >
          <button
            className="button btn btn-success"
            style={{
              margin: "3rem auto",
              width: "50%",
              height: "6rem",
              fontWeight: "bold",
              fontSize: "20px",
            }}
            type="submit"
          >
            Create Task
          </button>
        </div>
      </form>
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

export default TaskCreationPage;
