import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const saved = localStorage.getItem('task_app_tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveTasksToStorage = (items) => {
  localStorage.setItem('task_app_tasks', JSON.stringify(items));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: loadTasksFromStorage(),
    filterStatus: 'ALL',
    searchQuery: '',
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description || '',
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newTask);
      saveTasksToStorage(state.items);
    },
    updateTask: (state, action) => {
      const { id, title, description, status } = action.payload;
      const existing = state.items.find((t) => t.id === id);
      if (existing) {
        if (title !== undefined) existing.title = title;
        if (description !== undefined) existing.description = description;
        if (status !== undefined) existing.status = status;
        saveTasksToStorage(state.items);
      }
    },
    toggleTaskStatus: (state, action) => {
      const existing = state.items.find((t) => t.id === action.payload);
      if (existing) {
        existing.status = existing.status === 'Pending' ? 'Completed' : 'Pending';
        saveTasksToStorage(state.items);
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveTasksToStorage(state.items);
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  setFilterStatus,
  setSearchQuery,
} = tasksSlice.actions;

export default tasksSlice.reducer;