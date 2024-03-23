const { auth } = require("../middlewares/auth.middleware");
const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  handleLogin,
  handleLogout,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", handleGetAllUsers);
userRouter
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);
userRouter.post("/register", handleCreateNewUser);
userRouter.post("/login", handleLogin);
userRouter.get("/logout", handleLogout);

module.exports = {
  userRouter,
};
