import { createSlice } from '@reduxjs/toolkit';

const loadUsersFromStorage = () => {
  try {
    const saved = localStorage.getItem('task_app_users');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadAuthFromStorage = () => {
  try {
    const saved = localStorage.getItem('task_app_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

const initialAuth = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: loadUsersFromStorage(),
    isAuthenticated: initialAuth.isAuthenticated,
    user: initialAuth.user,
    authError: null,
  },
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const normalizedEmail = email.trim().toLowerCase();

      const exists = state.users.some((u) => u.email === normalizedEmail);
      if (exists) {
        state.authError = 'An account with this email already exists. Please sign in.';
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      state.users.push(newUser);
      localStorage.setItem('task_app_users', JSON.stringify(state.users));

      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      state.isAuthenticated = true;
      state.user = sessionUser;
      state.authError = null;
      localStorage.setItem(
        'task_app_auth',
        JSON.stringify({ isAuthenticated: true, user: sessionUser })
      );
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const normalizedEmail = email.trim().toLowerCase();

      const matchedUser = state.users.find((u) => u.email === normalizedEmail);
      if (!matchedUser) {
        state.authError = 'No account found with this email. Please register first.';
        return;
      }

      if (matchedUser.password !== password) {
        state.authError = 'Incorrect password. Please try again.';
        return;
      }

      const sessionUser = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      };
      state.isAuthenticated = true;
      state.user = sessionUser;
      state.authError = null;
      localStorage.setItem(
        'task_app_auth',
        JSON.stringify({ isAuthenticated: true, user: sessionUser })
      );
    },

    clearAuthError: (state) => {
      state.authError = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authError = null;
      localStorage.removeItem('task_app_auth');
    },
  },
});

export const { registerUser, login, clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;