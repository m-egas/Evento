import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { AddEventPage } from "./pages/AddEventPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { MyEventsPage } from "./pages/MyEventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Define the application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Home overview page
      {
        path: "/",
        element: (
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        ),
      },

      // Events overview page
      {
        path: "/events",
        element: (
          <ErrorBoundary>
            <EventsPage />
          </ErrorBoundary>
        ),
      },

      // Event details page
      {
        path: "/event/:eventId",
        element: (
          <ErrorBoundary>
            <EventPage />
          </ErrorBoundary>
        ),
      },

      // Add event page
      {
        path: "/add-event",
        element: (
          <ErrorBoundary>
            <AddEventPage />
          </ErrorBoundary>
        ),
      },

      // Sign up page
      {
        path: "/signup",
        element: (
          <ErrorBoundary>
            <SignupPage />
          </ErrorBoundary>
        ),
      },

      // User's attending events
      {
        path: "/my-events",
        element: (
          <ErrorBoundary>
            <MyEventsPage />
          </ErrorBoundary>
        ),
      },

      // Login page
      {
        path: "/login",
        element: (
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
