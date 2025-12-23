import { createBrowserRouter, Navigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import SliderPage from "./pages/SliderPage";
import ImageSliderPage from "./pages/ImageSliderPage";
import ChatPage from "./pages/Chat";
import LoginPage from "./pages/LoginPage";
import ChristmasTree from "./pages/ChristmasTree";
import {
  requireAuth,
  requireGuest,
  testPromise,
  authMiddleware,
} from "./utils/authLoader";
import RedisUI from "./pages/Redis";

export const router = createBrowserRouter([
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
  {
    path: "/",
    element: <IndexPage />,
    loader: requireAuth, // Redirect to login if not authenticated
  },
  {
    path: "/slider",
    element: <SliderPage />,
    loader: requireAuth,
  },
  {
    path: "/test-image",
    element: <ImageSliderPage />,
    loader: requireAuth,
  },
  {
    path: "/chat",
    element: <ChatPage />,
    loader: requireAuth,
  },
  {
    path: "/christmas",
    element: <ChristmasTree />,
  },
  {
    path: "/redis",
    element: <RedisUI />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
