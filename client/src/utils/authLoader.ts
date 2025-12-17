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

/**
 * Loader function to protect routes that require authentication
 * Returns null if authenticated, redirects to /login if not
 */
export const authMiddleware  = async () => {
  const state = store.getState();
  const isAuthenticated = state.auth.isAuthenticated;

  if (!isAuthenticated) {
    throw redirect("/login");
  }

};

export const loggingMiddleware = async ({ request }: { request: Request }, next: () => Promise<unknown>) => {
  let url = new URL(request.url);
  console.log(`Starting navigation: ${url.pathname}${url.search}`);
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`Navigation completed in ${duration}ms`);
};
