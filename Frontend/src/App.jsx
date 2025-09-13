
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FiPlus, FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import TodoItem from './components/TodoItem';

// during local development point axios to backend server
axios.defaults.baseURL = 'http://localhost:5000';

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // load todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('/api/todos');
        setTodos(res.data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const payload = { text: newTodo.trim() };
    try {
      const res = await axios.post('/api/todos', payload);
      // prepend saved todo from server with animation flag
      const item = { ...res.data, _anim: 'enter' };
      setTodos(prev => [item, ...prev]);
      setNewTodo("");
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      // mark for exit animation then remove
      setTodos(prev => prev.map(t => t._id === id ? { ...t, _anim: 'exit' } : t));
      setTimeout(() => setTodos(prev => prev.filter(t => t._id !== id)), 300);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const res = await axios.patch(`/api/todos/${id}`, { completed: !todo.completed });
      setTodos(prev => prev.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };
  // editing handled inline via TodoItem; startEditing removed
  const saveEdit = async (id) => {
    try {
      const res = await axios.patch(`/api/todos/${id}`, { text: editedText });
      setTodos(prev => prev.map(t => t._id === id ? res.data : t));
      setEditingTodo(null);
      setEditedText("");
    } catch (err) {
      console.error('Failed to save edit:', err);
    }
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  }).filter(t => t.text.toLowerCase().includes(query.toLowerCase()));

      return (
    <div className={`${theme==='dark' ? 'min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-slate-100 p-6' : 'min-h-screen bg-gradient-to-b from-white to-slate-100 text-slate-900 p-6'}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <aside className={`md:col-span-1 rounded-xl shadow p-6 ${theme==='dark' ? 'bg-slate-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-semibold mb-3">Tasks</h2>
          <p className={`text-sm mb-4 ${theme==='dark' ? 'text-slate-400' : 'text-gray-500'}`}>Create, update and organize your todos.</p>

          <form onSubmit={addTodo} className="flex items-center gap-2">
            <input
              className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${theme==='dark' ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-gray-200 bg-white text-slate-900'}`}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
            />
            <button className={`p-2 rounded-lg ${theme==='dark' ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-sky-600 text-white hover:bg-sky-700'}`} aria-label="Add task">
              <FiPlus />
            </button>
          </form>

          <div className="mt-6">
            <label className={`block text-xs mb-2 ${theme==='dark' ? 'text-slate-400' : 'text-gray-500'}`}>Search</label>
            <div className="flex items-center gap-2">
              <FiSearch className={theme==='dark' ? 'text-slate-400' : 'text-gray-400'} />
              <input className={`flex-1 text-sm outline-none ${theme==='dark' ? 'bg-transparent text-slate-100' : 'bg-transparent text-slate-900'}`} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks..." />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button onClick={() => setFilter('all')} className={`w-full text-left px-3 py-2 rounded ${filter==='all'? (theme==='dark' ? 'bg-slate-700' : 'bg-slate-100') : (theme==='dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100')}`}>All</button>
            <button onClick={() => setFilter('active')} className={`w-full text-left px-3 py-2 rounded ${filter==='active'? (theme==='dark' ? 'bg-slate-700' : 'bg-slate-100') : (theme==='dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100')}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`w-full text-left px-3 py-2 rounded ${filter==='completed'? (theme==='dark' ? 'bg-slate-700' : 'bg-slate-100') : (theme==='dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100')}`}>Completed</button>
          </div>

          <div className="mt-6 text-sm" style={{color: theme==='dark' ? undefined : undefined}}>
            <div>Total: <strong>{todos.length}</strong></div>
            <div>Active: <strong>{todos.filter(t => !t.completed).length}</strong></div>
            <div>Completed: <strong>{todos.filter(t => t.completed).length}</strong></div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Theme</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Toggle theme"
                className={`w-14 h-8 flex items-center p-1 rounded-full transition-colors ${theme==='dark' ? 'bg-slate-700' : 'bg-yellow-200'}`}
              >
                <span className={`w-6 h-6 rounded-full bg-white flex items-center justify-center shadow transform transition-transform ${theme==='dark' ? 'translate-x-6' : 'translate-x-0'}`}>
                  {theme === 'dark' ? <FiMoon className="text-slate-700" /> : <FiSun className="text-yellow-500" />}
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* main: list */}
        <main className="md:col-span-2">
          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <div className={`p-10 rounded-xl shadow text-center ${theme==='dark' ? 'bg-slate-800 text-slate-400' : 'bg-white text-gray-500'}`}>No tasks found — add one!</div>
            ) : (
              filtered.map(todo => (
                <TodoItem key={todo._id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo._id)}
                  onToggle={() => toggleTodo(todo._id)}
                  onEdit={(text) => { setEditingTodo(todo._id); setEditedText(text); }}
                  onSave={saveEdit}
                  editingTodo={editingTodo}
                  editedText={editedText}
                  setEditedText={setEditedText}
                  theme={theme}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;