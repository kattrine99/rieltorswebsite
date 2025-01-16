import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { FavouritePage, LoginPage, MainPage, ProfilePage, RegistrationPage } from "./Pages/index";
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Store/Store';

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />
  },
  {
    path: "/favorite",
    element: <FavouritePage />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routerConfig} />
    </Provider>
  </React.StrictMode>,
)