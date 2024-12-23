import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { authlayout , Login } from "./Components/index.js";

import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Signup from "./Pages/Signup";
import Editpost from "./Pages/Editpost";
import Allposts from "./Pages/Allpost";
import Addpost from "./Pages/Addpost";
import Landing from "./Pages/Landing.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path : '/',
        element : <Landing/>
      },
      {
        path : '/home',
        element : <Home/>
      },
      {
        path: "/login",
        element: (
            <authlayout authentication={false}>
                <Login />
            </authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <authlayout authentication={false}>
            <Signup />
          </authlayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <authlayout authentication>
            {" "}
            <Allposts />
          </authlayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <authlayout authentication>
            {" "}
            <Addpost />
          </authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <authlayout authentication>
            {" "}
            <Editpost />
          </authlayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
