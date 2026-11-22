import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    dispatch(addTask({ title: title.trim(), description: description.trim() }));
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4"
    >
      <h2 className="text-base font-semibold text-slate-900">Add New Task</h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 "
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 "
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}