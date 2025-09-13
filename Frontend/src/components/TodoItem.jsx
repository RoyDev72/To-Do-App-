import React from 'react';
import { MdOutlineDone, MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export default function TodoItem({ todo, onDelete, onToggle, onEdit, onSave, editingTodo, editedText, setEditedText, theme='dark' }) {
  const isEditing = editingTodo === todo._id;
  const animClass = todo._anim === 'enter' ? 'animate-enter' : (todo._anim === 'exit' ? 'animate-exit' : '');

  return (
    <div className={`${theme==='dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'} p-4 rounded-xl shadow flex items-start justify-between ${animClass}`} role="article" aria-labelledby={`todo-${todo._id}`} tabIndex={0}>
      <div className="flex items-start gap-4">
        <button onClick={onToggle} className={`mt-1 h-8 w-8 rounded-full border flex items-center justify-center ${todo.completed ? 'bg-emerald-500 border-emerald-500 text-slate-900' : (theme==='dark' ? 'border-slate-600' : 'border-gray-300')}`}>
          {todo.completed && <MdOutlineDone />}
        </button>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <input value={editedText} onChange={e => setEditedText(e.target.value)} className={`${theme==='dark' ? 'border border-slate-600 rounded px-3 py-2 bg-slate-900 text-slate-100' : 'border border-gray-200 rounded px-3 py-2 bg-white text-slate-900'}`} />
              <button onClick={() => onSave(todo._id)} className={`${theme==='dark' ? 'bg-emerald-500 text-slate-900' : 'bg-emerald-500 text-white'} px-3 rounded`} aria-label="Save edit">Save</button>
              <button onClick={() => { /* cancel editing by calling onEdit with empty */ onEdit(''); }} className="px-3" aria-label="Cancel edit">Cancel</button>
            </div>
          ) : (
            <div>
              <div id={`todo-${todo._id}`} className={`${theme==='dark' ? 'text-slate-100' : 'text-slate-900'} font-medium`}>{todo.text}</div>
              <div className={`${theme==='dark' ? 'text-slate-400' : 'text-gray-500'} text-xs`}>Created: {new Date(todo.createdAt).toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isEditing && (
          <>
            <button onClick={() => onEdit(todo.text)} className={`p-2 ${theme==='dark' ? 'text-sky-400 hover:bg-slate-700' : 'text-sky-600 hover:bg-slate-100'} rounded`} aria-label="Edit task"><MdModeEditOutline /></button>
            <button onClick={onDelete} className={`p-2 ${theme==='dark' ? 'text-rose-400 hover:bg-slate-700' : 'text-rose-600 hover:bg-slate-100'} rounded`} aria-label="Delete task"><FaTrash /></button>
          </>
        )}
      </div>
    </div>
  );
}
