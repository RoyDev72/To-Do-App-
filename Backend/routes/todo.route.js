import express from 'express';
import Todo from '../models/todo.model.js';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('GET /api/todos error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/todos body:', req.body);
    const text = (req.body.text || '').toString().trim();
    if (!text) return res.status(400).json({ message: 'Text is required' });

    const todo = new Todo({ text });
    const newTodo = await todo.save();
    console.log('Saved todo:', newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('POST /api/todos error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a todo (partial) - use PATCH
router.patch('/:id', async (req, res) => {
  try {
    console.log(`PATCH /api/todos/${req.params.id} body:`, req.body);
    const updates = {};
    if (req.body.text !== undefined) updates.text = req.body.text.toString().trim();
    if (req.body.completed !== undefined) updates.completed = !!req.body.completed;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });

    res.json(updatedTodo);
  } catch (error) {
    console.error('PATCH /api/todos error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/todos error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;