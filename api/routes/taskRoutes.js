// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");
const verify = require("../middleware/auth");

router.post("/", verify, async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = new Task({ title, description, dueDate, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating task", error: err.message });
  }
});

router.get("/", verify, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
});

module.exports = router;
