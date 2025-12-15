import { createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import SliderPage from './pages/SliderPage';
import ImageSliderPage from './pages/ImageSliderPage';
import ChatPage from './pages/Chat';
import LoginPage from './pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/slider',
    element: <SliderPage />,
  },
  {
    path: '/test-image',
    element: <ImageSliderPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

