const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth.js");

const Todo = require("../../models/Todo.js");
const User = require("../../models/User.js");

// @route    POST api/todos
// @desc     Create a todo
// @access   Private
router.post(
  "/",
  auth,
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newTodo = new Todo({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/todos/
// @desc     Get all todos of user
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find();
    const userTodos = todos.filter(todo => todo.user.toString() === req.user.id)
    res.json(userTodos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return status(404).json({ msg: "Todo not found" });

    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await todo.remove();

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    if (error.kind === "ObjectId")
      return status(404).json({ msg: "Todo not found" });
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/todos/:id
// @desc     Update a todo
// @access   Private

router.put(
  "/:id",
  auth,
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id);
todo.text = req.body.text

      await todo.save();
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/todos/complete/:id
// @desc     Delete a todo
// @access   Private

router.put("/complete/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return status(404).json({ msg: "Todo not found" });

    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    todo.isCompleted = !todo.isCompleted;

    await todo.save();
    res.json(todo);

  } catch (err) {
    console.error(err.message);
    if (error.kind === "ObjectId")
      return status(404).json({ msg: "Todo not found" });
    res.status(500).send("Server Error");
  }
});


module.exports = router;
