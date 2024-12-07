import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { Header } from "./Components/index.js";
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow px-4">
        <Outlet />
      </main>
  
    </div>
  ) : null;
  
}

export default App;




// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import "./App.css";
// import authservice from "./appwrite/auth";
// import { login, logout } from "./store/authslice";
// import { Header, Footer } from "./Components/index.js";
// import { Outlet } from "react-router-dom";

// function App() {
//   const [loading, setloading] = useState(true);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     authservice
//       .getCurrentuser()
//       .then((userdata) => {
//         if (userdata) {
//           dispatch(login({ userdata }));
//         } else {
//           dispatch(logout());
//         }
//       })
//       .finally(() => {
//         setloading(false);
//       });
//   }, []);

//   return !loading ? (
//     <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
//       <div className="w-full min-h-screen  space-y flex flex-col">
//         <Header />
//         <main>
//           TODO: <Outlet/>
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null;
// }

// export default App;
