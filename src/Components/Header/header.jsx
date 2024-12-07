import React, { useState } from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as authlogout } from "../../store/authslice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()

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
    // { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    // { name: "All Posts", slug: "/all-posts", active: authStatus },
    // { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    navigate(`/search?q=${searchQuery}`);
  };

  return (
<header className="px-32 py-3 relative z-50 bg-gray-50 shadow">
  <Container>
    <div className="flex justify-between items-center">
      {/* Left: Logo */}
      <div className="mr-4">
        <Link to="/">
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
              className="absolute right-0 px-3 py-2 bg-blue-100 text-white rounded-full 
                        hover:bg-red-200 hover:scale-105 transition-all duration-300 ease-out"
            >
              🔍
            </button>
          </div>
        )}



        {/* Profile Dropdown */}
        {authStatus && (
          <div className="relative ml-4">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              Profile
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
                <li className="px-4 py-2 hover:bg-gray-100 transition duration-200 ease-out cursor-pointer">
                  <Link to="/profile">View Profile</Link>
                </li>
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
      <div className="flex items-center space-x-4">
        {!authStatus && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
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








// import React from 'react'
// import {Container, Logo, Logoutbtn} from '../index'
// import {Link} from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function Header() {
//     const authStatus = useSelector((state) => state.auth.status)
//     const navigate = useNavigate()

//     const navItems = [
//         {
//           name: 'Home',
//           slug: "/",
//           active: true
//         }, 
//         {
//           name: "Login",
//           slug: "/login",
//           active: !authStatus,
//       },
//       {
//           name: "Signup",
//           slug: "/signup",
//           active: !authStatus,
//       },
//       {
//           name: "All Posts",
//           slug: "/all-posts",
//           active: authStatus,
//       },
//       {
//           name: "Add Post",
//           slug: "/add-post",
//           active: authStatus,
//       },
//       {
//         name: "Profile",
//         slug: "/profile",
//         active: authStatus,
//     },
//       {
//           name: "Explore",
//           slug: "/explore",
//           active: authStatus,
//       },
     
//       ] 
//     return (
//         <header className='py-3 , '>
//             <Container>
//                 <nav className='flex'>
//                     <div className='mr-4'>
//                     <Link to='/'>
//                       <Logo width='70px' />
//                     </Link>
//                     </div>
//                     <ul className='flex ml-auto'>
//                        {navItems.map( (item) => 
//                         item.active ? (
//                             <li key={item.name}>
//                                 <button
//                                 onClick={() => navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
//                                     {item.name}
//                                 </button>
//                             </li>
//                         ) : null
//                     )}
//                     {authStatus && (
//                      <li>
//                         <Logoutbtn/>
//                      </li>
//                     )}
//                     </ul>
//                 </nav>
//             </Container>
//         </header>
//     )
// }

// export default Header
