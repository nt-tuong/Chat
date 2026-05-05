import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  requireAuth,
  requireGuest,
  testPromise,
  authMiddleware,
} from "./utils/authLoader";

// Pages
import IndexPage from "./pages/IndexPage";
import SliderPage from "./pages/SliderPage";
import ImageSliderPage from "./pages/ImageSliderPage";
import ChatPage from "./pages/Chat";
import LoginPage from "./pages/LoginPage";
import ChristmasTree from "./pages/ChristmasTree";
import RedisUI from "./pages/Redis";
import ProtectedLayout from "./pages/ProtectedLayout";

export const router = createBrowserRouter([
  // Guest routes
  {
    path: "/login",
    element: <LoginPage />,
    loader: requireGuest, // Redirect to home if already logged in
  },
  {
    path: "/login-promise",
    element: <LoginPage />,
    middleware: [authMiddleware],
    loader: testPromise,
  },

  // Protected routes
  {
    path: "/",
    element: <ProtectedLayout />,
    middleware: [authMiddleware],
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "/slider",
        element: <SliderPage />,
      },
      {
        path: "/test-image",
        element: <ImageSliderPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/christmas",
        element: <ChristmasTree />,
      },
      {
        path: "/redis",
        element: <RedisUI />,
      },
    ],
  },

  // fallback
  {
    path: "*",
    element: <Navigate to="/" replace />,
    loader: requireAuth,
  },
]);
