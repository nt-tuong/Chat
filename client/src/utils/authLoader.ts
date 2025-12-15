import { redirect } from 'react-router-dom';
import { store } from '../store';

/**
 * Loader function to protect routes that require authentication
 * Returns null if authenticated, redirects to /login if not
 */
export const requireAuth = () => {
  const state = store.getState();
  const isAuthenticated = state.auth.isAuthenticated;

  if (!isAuthenticated) {
    return redirect('/login');
  }

  return null;
};

/**
 * Loader function for login page
 * Redirects to home if already authenticated
 */
export const requireGuest = () => {
  const state = store.getState();
  const isAuthenticated = state.auth.isAuthenticated;

  if (isAuthenticated) {
    return redirect('/');
  }

  return null;
};

