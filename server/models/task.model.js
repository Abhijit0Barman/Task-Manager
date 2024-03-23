const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    userID: String,
    username: String,
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = { TaskModel };
