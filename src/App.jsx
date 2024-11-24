import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { Header, Footer } from "./Components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
