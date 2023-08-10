import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import ResetStyle from './ResetStyle';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'todo',
    // element: <Todo />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResetStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
