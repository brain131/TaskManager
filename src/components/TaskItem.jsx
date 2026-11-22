import React, { useState } from 'react';

const TaskItem = React.memo(function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const isCompleted = task.status === 'Completed';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {isEditing ? (
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditDescription(task.description);
              }}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggle(task.id)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <div>
              <h3
                className={`text-sm font-medium ${
                  isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
              )}
              <span
                className={`inline-block mt-2 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  isCompleted
                    ? 'bg-emerald-50 '
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default TaskItem;