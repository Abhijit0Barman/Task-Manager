const express = require("express");
const { taskModel } = require("../models/task.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth.middleware");
const {
  handleCreateTask,
  handleGetAllTask,
  handleUpdateByTaskId,
  handleDeletByTaskId,
  handleGetTaskById,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

taskRouter.route("/").post(handleCreateTask).get(handleGetAllTask);
taskRouter
  .route("/:id")
  .get(handleGetTaskById)
  .patch(handleUpdateByTaskId)
  .delete(handleDeletByTaskId);

module.exports = {
  taskRouter,
};
