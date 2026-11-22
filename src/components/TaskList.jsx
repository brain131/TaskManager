import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTaskStatus,
  deleteTask,
  updateTask,
  setFilterStatus,
  setSearchQuery,
} from '../store/tasksSlice';
import TaskItem from './TaskItem';

export default function TaskList() {
  const dispatch = useDispatch();
  const { items, filterStatus, searchQuery } = useSelector((state) => state.tasks);

  // Memoize event handlers passed to memoized TaskItem children
  const handleToggle = useCallback(
    (id) => {
      dispatch(toggleTaskStatus(id));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id, updates) => {
      dispatch(updateTask({ id, ...updates }));
    },
    [dispatch]
  );

  // Memoize derived task counts
  const counts = useMemo(() => {
    const completed = items.filter((t) => t.status === 'Completed').length;
    return {
      total: items.length,
      completed,
      pending: items.length - completed,
    };
  }, [items]);

  // Memoize filtered task list
  const filteredTasks = useMemo(() => {
    return items.filter((task) => {
      const matchesStatus = filterStatus === 'ALL' || task.status === filterStatus;
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [items, filterStatus, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Summary & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
          <span>Total: {counts.total}</span>
         
          <span className="text-black">Completed: {counts.completed}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tasks..."
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select
            value={filterStatus}
            onChange={(e) => dispatch(setFilterStatus(e.target.value))}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task Items or Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border border-dashed border-slate-300 text-center">
          <p className="text-sm font-medium text-slate-700">
            {items.length === 0
              ? 'No tasks yet. Add your first task above.'
              : 'No tasks match your current filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}