var express = require("express");
const TodoDataontroller = require("../controllers/TodoDataController");
const authenticateJWT = require("../middlewares/authValidate");

var router = express.Router();

router.get("/", authenticateJWT, TodoDataontroller.getList);
//router.get("/:id", TodoController.bookDetail);
router.post("/", authenticateJWT, TodoDataontroller.todoStore);
router.put("/:id", authenticateJWT, TodoDataontroller.todoUpdate);
router.delete("/:id/:todoId", authenticateJWT, TodoDataontroller.todoDelete);

module.exports = router;