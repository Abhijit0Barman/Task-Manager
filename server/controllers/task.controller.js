const { TaskModel } = require("../models/task.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleGetAllTask(req, res) {
  try {
    const allTasks = await TaskModel.find({ userID: req.body.userID });
    return res.status(200).send(allTasks);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
}

const handleCreateTask = async (req, res) => {
  const body = req.body;
  const { title, description, userID, username } = body;
  if (!body || !title || !description) {
    return res.status(400).json({ error: "All Fields is Required" });
  }

  try {
    const task = new TaskModel({
      title,
      description,
      userID,
      username,
    });
    await task.save();
    res.status(201).send({
      msg: "A New Task has been Created",
      title,
      id: task._id,
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

const handleGetTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById({ _id: id });
    if (!task) return res.status(404).json({ err: "Does Not Exist" });
    return res.json(task);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

const handleUpdateByTaskId = async (req, res) => {
  const id = req.params.id;
  const userIdFromTask = await TaskModel.findOne({ _id: id });
  try {
    if (req.body.userID === userIdFromTask.userID) {
      const task = await TaskModel.findByIdAndUpdate({ _id: id }, req.body);
      return res.status(200).json({ msg: "Task has been updated", task });
    } else {
      return res
        .status(401)
        .json({ msg: "You are not authorized to update this task" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

async function handleDeletByTaskId(req, res) {
  const id = req.params.id;
  const userIdFromTask = await TaskModel.findOne({ _id: id });
  try {
    if (req.body.userID === userIdFromTask.userID) {
      const task = await TaskModel.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ msg: `Task with id:${id} has been Deleted` });
    } else {
      return res
        .status(401)
        .json({ msg: "You are not authorized to update this task" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
}

module.exports = {
  handleUpdateByTaskId,
  handleGetAllTask,
  handleCreateTask,
  handleDeletByTaskId,
  handleGetTaskById,
};
