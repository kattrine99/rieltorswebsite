import "./App.css"
import { Client } from 'appwrite';
import { CardPage, FavoritePage, LoginPage, MainPage, ProfilePage, RegistrationPage } from "./Pages/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const client = new Client();
client.setProject('6789260e00308ca2f9b4');

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element:  <MainPage />,
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
    element: <FavoritePage />
  },
  {
    path: "/card",
    element: <CardPage/>
  }
]);

function App() {
  return (
    <div className="App">
      <>
        <div className="App">
          <div className="container">
          <RouterProvider router={routerConfig} />
          </div>
        </div>
      </>
    </div>
  )
}

export default App
