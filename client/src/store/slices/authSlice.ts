import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    email: string;
    name?: string;
  } | null;
}

// Load token from localStorage on initialization
const getInitialToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const initialState: AuthState = {
  isAuthenticated: !!getInitialToken(),
  token: getInitialToken(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        user: { email: string; name?: string };
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Save token to localStorage
      try {
        localStorage.setItem('token', action.payload.token);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      // Remove token from localStorage
      try {
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
    setUser: (
      state,
      action: PayloadAction<{ email: string; name?: string }>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

