const { Router } = require("express");
const { updateUser, deleteUser, getUser, getAllUser } = require("../controller/user.controller");
const { authenticate } = require("../middleware/authuticate.middlerware");
const userRouter = Router();

userRouter.post("/user", authenticate, updateUser);
userRouter.delete("/user", authenticate, deleteUser);
userRouter.get("/user/me", authenticate, getUser);
userRouter.get('/users',getAllUser)


module.exports = userRouter;
