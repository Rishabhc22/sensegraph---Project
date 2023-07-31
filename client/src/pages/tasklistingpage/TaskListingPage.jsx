import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./tasklistingpage.scss";

const TaskListingPage = () => {
  const url = "http://localhost:5000/api/";
  const [allTasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const result = await axios.get(`${url}tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedTasks = [...allTasks];
    sortedTasks.sort((a, b) => {
      if (newSortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

    setTasks(sortedTasks);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredTasks = filterStatus
    ? allTasks.filter((task) => task.status === filterStatus)
    : allTasks;

  const getStatusCellClass = (status) => {
    switch (status) {
      case "Completed":
        return "#0BDA51";
      case "In Progress":
        return "dodgerblue";
      case "Pending":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="task">
      <Link to="/">
        <button className="home-btn btn btn-dark">HomePage</button>
      </Link>
      <Link to="/create">
        <button className="home-btn btn btn-info">Create Task</button>
      </Link>
      <h1>Task Listing</h1>
      {allTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div>
          <button
            onClick={handleSort}
            style={{
              margin: "20px",
              fontSize: "2.4rem",
              width: "30rem",
              height: "7rem",
              background: "purple",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Sort by Due Date
          </button>
          <div>
            <button
              onClick={() => handleFilter("")}
              style={{
                margin: "20px",
                fontSize: "2.4rem",
                width: "25rem",
                height: "7rem",
                background: "black",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Show All Status
            </button>
            <button
              onClick={() => handleFilter("Pending")}
              style={{
                margin: "20px",
                fontSize: "2.4rem",
                width: "30rem",
                height: "7rem",
                background: "red",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Filter by Pending
            </button>
            <button
              onClick={() => handleFilter("In Progress")}
              style={{
                margin: "20px",
                fontSize: "2.4rem",
                width: "30rem",
                height: "7rem",
                background: "dodgerblue",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Filter by In Progress
            </button>
            <button
              onClick={() => handleFilter("Completed")}
              style={{
                margin: "20px",
                fontSize: "2.4rem",
                width: "30rem",
                height: "7rem",
                background: "green",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Filter by Completed
            </button>
          </div>
          <table className="task-listing-table">
            <thead>
              <tr>
                <th>Task Id</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Check Task</th>
              </tr>
            </thead>
            <tbody className="body">
              {filteredTasks.map((task) => (
                <tr key={task.title}>
                  <td>{task._id}</td>
                  <td>{task.description}</td>
                  <td>{formatDate(task.dueDate)}</td>
                  <td
                    style={{
                      color: getStatusCellClass(task.status),
                      fontWeight: "600",
                    }}
                  >
                    {task.status}
                  </td>
                  <td>
                    <Link to={`/details/${task._id}`}>
                      <button>Update Task</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskListingPage;
