import { createBrowserRouter, Navigate } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import SliderPage from './pages/SliderPage';
import ImageSliderPage from './pages/ImageSliderPage';
import ChatPage from './pages/Chat';
import LoginPage from './pages/LoginPage';
import ChristmasTree from './pages/ChristmasTree';
import { requireAuth, requireGuest } from './utils/authLoader';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    loader: requireGuest, // Redirect to home if already logged in
  },
  {
    path: '/',
    element: <IndexPage />,
    loader: requireAuth, // Redirect to login if not authenticated
  },
  {
    path: '/slider',
    element: <SliderPage />,
    loader: requireAuth,
  },
  {
    path: '/test-image',
    element: <ImageSliderPage />,
    loader: requireAuth,
  },
  {
    path: '/chat',
    element: <ChatPage />,
    loader: requireAuth,
  },
  {
    path: '/christmas',
    element: <ChristmasTree />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

