import { createBrowserRouter, Navigate } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import SliderPage from './pages/SliderPage';
import ImageSliderPage from './pages/ImageSliderPage';
import ChatPage from './pages/Chat';
import LoginPage from './pages/login';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <IndexPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/slider',
    element: (
      <ProtectedRoute>
        <SliderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/test-image',
    element: (
      <ProtectedRoute>
        <ImageSliderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

