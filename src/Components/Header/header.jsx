import React, { useState , useEffect} from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { logout as authlogout } from "../../store/authslice";
import { Search } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userdata = useSelector((state) => state.auth.userdata);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()
  const [authusername, setAuthUsername] = useState(""); 


  // try {
  //    userdata = useSelector(state => state.auth.userdata.name )
  // } catch (error) {
  //   console.log(error);
    
  // }

  useEffect(() => {
    if (userdata && userdata.name) {
      setAuthUsername(userdata.name); // Set username when userdata is available
    } else {
      setAuthUsername(""); // Clear the username if userdata is empty
    }
  }, [userdata]); // Re-run whenever userdata changes

  

  const logout = async() => {
    try{
      dispatch(authlogout)
      navigate("/")
    }
    catch (err) {
      setError(err?.message || "Logout Failed");
    }
  }

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
     { name: "Add Post", slug: "/add-posts", active: authStatus },
  ];

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    navigate(`/search?q=${searchQuery}`);
  };

  return (
<header className="  md:px-12 py-3 relative z-50 bg-white ">
  <Container>
    <div className="flex justify-between items-center">
      {/* Left: Logo */}
      <div className="mr-4">
        <Link to="/home">
          <Logo width="70px" />
        </Link>
      </div>

      {/* Middle: Navigation Items */}
      <nav className="flex items-center flex-grow">


        {/* Search Box */}
        {authStatus && (
          <div className="relative flex items-center ml-auto mr-4 group">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 w-32 lg:w-96 border border-gray-300 rounded-full 
                         focus:w-[450px] focus:outline-none focus:ring-2 focus:ring-blue-400 
                         focus:border-blue-400 transition-all duration-300 ease-in-out"
            />
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="absolute right-0 px-3 py-2 rounded-full 
                       hover:scale-105 transition-all duration-300 ease-out"
            >
              <Search/>
            </button>
          </div>
        )}
         
         {
          authStatus && (
            <div className="relative flex items-center ml-4 mr-3">
                <button 
      className="text-white p-3 rounded-full shadow-md  hover:scale-110 bg-gradient-to-r from-green-600 via-green-800 to-green-900 hover:shadow-lg hover:from-green-900 hover:via-green-800 hover:to-green-600 transition-all duration-300"
      
      onClick={() => navigate("/add-post")}
    >
      <PlusCircleIcon className="w-6 h-6" />
    </button>
            </div>
          )
         }


        {/* Profile Dropdown */}
        {authStatus && authusername &&(
          <div className="relative ml-4">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="inline-block px-5 py-3 sm:block bg-gray-200 hover:bg-gray-300   text-white font-bold text-xl rounded-full bg-gradient-to-r from-green-600 via-green-800 to-green-900 hover:shadow-lg hover:from-green-900 hover:via-green-800 hover:to-green-600 transition-all duration-300"
            >
              {authusername[0].toUpperCase()}
            </button>
            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-out ${
                showDropdown
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-90 invisible"
              }`}
            >
              <ul>
                {/* <li className="px-4 py-2 hover:bg-gray-100 transition duration-200 ease-out cursor-pointer">
                  <Link to="/profile">View Profile</Link>
                </li> */}
                <li
                  className="px-4 py-2 hover:bg-gray-100 transition duration-200 ease-out cursor-pointer"
                  onClick={() => navigate("/all-posts")}
                >
                  <Link to="/all-posts">My Works</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 ease-out cursor-pointer"
                  onClick={() => logout()}
                >
                  <Logoutbtn />
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Right: Login & Signup */}
 <div className="flex md-hidden items-center  space-x-6">
  {!authStatus && (
          <>         
<button
  onClick={() => navigate("/login")}
  className="px-8 py-3 text-white font-medium rounded-full bg-gradient-to-r from-gray-700 via-gray-900 to-black hover:shadow-lg hover:from-black hover:via-gray-800 hover:to-gray-700 transition-all duration-300"
>
  Login
</button>
<button
  onClick={() => navigate("/signup")}
  className="px-8 py-3  text-white font-medium rounded-full bg-gradient-to-r from-green-600 via-green-800 to-green-900 hover:shadow-lg hover:from-green-900 hover:via-green-800 hover:to-green-600 transition-all duration-300 "
>
  Signup
</button>
          </>
        )}
      </div> 
    </div>
  </Container>
</header>

  );
}

export default Header;



