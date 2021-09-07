var express = require("express");
const TodoController = require("../controllers/TodoController");
const authenticateJWT = require("../middlewares/authValidate");

var router = express.Router();

router.get("/", authenticateJWT, TodoController.getList);
//router.get("/:id", TodoController.bookDetail);
router.post("/", authenticateJWT, TodoController.todoStore);
router.put("/:id", authenticateJWT, TodoController.todoUpdate);
router.delete("/:id", authenticateJWT, TodoController.todoDelete);

module.exports = router;