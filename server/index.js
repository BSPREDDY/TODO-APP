require('dotenv').config();
const express = require("express")
const { createTodo, updateTodo } = require("./types")
const { todo } = require("./db")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Create a new todo
app.post("/todo", async (req, res) => {
  try {
    const createpayload = req.body
    const parsedpayload = createTodo.safeParse(createpayload)

    if (!parsedpayload.success) {
      return res.status(400).json({
        msg: "Invalid input data",
        errors: parsedpayload.error.issues,
      })
    }

    const newTodo = await todo.create({
      title: createpayload.title,
      description: createpayload.description,
      completed: false,
    })

    res.status(201).json({
      msg: "Todo created successfully",
      todo: newTodo,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server error while creating todo",
      error: error.message,
    })
  }
})

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find({})
    res.json({
      todos,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server error while fetching todos",
      error: error.message,
    })
  }
})

// Update todo completion status
app.put("/update/:id", async (req, res) => {
  try {
    const todoId = req.params.id
    const { completed } = req.body

    const updatedTodo = await todo.findByIdAndUpdate(todoId, { completed: completed }, { new: true })

    if (!updatedTodo) {
      return res.status(404).json({
        msg: "Todo not found",
      })
    }

    res.json({
      msg: "Todo updated successfully",
      todo: updatedTodo,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server error while updating todo",
      error: error.message,
    })
  }
})

// Delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const todoId = req.params.id

    const deletedTodo = await todo.findByIdAndDelete(todoId)

    if (!deletedTodo) {
      return res.status(404).json({
        msg: "Todo not found",
      })
    }

    res.json({
      msg: "Todo deleted successfully",
      todo: deletedTodo,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server error while deleting todo",
      error: error.message,
    })
  }
})

// Update todo content (title and description)
app.put("/todo/:id", async (req, res) => {
  try {
    const todoId = req.params.id
    const { title, description } = req.body

    const updatedTodo = await todo.findByIdAndUpdate(todoId, { title, description }, { new: true })

    if (!updatedTodo) {
      return res.status(404).json({
        msg: "Todo not found",
      })
    }

    res.json({
      msg: "Todo updated successfully",
      todo: updatedTodo,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Server error while updating todo",
      error: error.message,
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
