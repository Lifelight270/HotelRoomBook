import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Content from "./Mainbody/Content";
import { Home, About, Room, LogIn, Signup, ResetPass } from "./component";
import { UserProvider } from "./component/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Content />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "room",
        element: <Room />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "reset-password/:id/:token",
        element: <ResetPass />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
