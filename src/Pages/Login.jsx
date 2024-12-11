import React from "react";
import { Login as loginComponent } from "../Components";
function Login() {
  return(
    <div>
      <header className="fixed top-0 w-full bg-white backdrop-blur-sm z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/"  className="text-2xl font-serif font-bold text-gray-900 hover:text-green-800 transition duration-300 ease-in-out hover:scale-110">
            WordPulse
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors" 
              href="#"
            >
              Our story
            </a>
            <a 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors" 
              href="#"
            >
              Membership
            </a>
            <button 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors" 
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
            <button 
              className="bg-black text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm transition-colors"
              onClick={ () => navigate("/signup")}
            >
              Get started
            </button>
          </nav>
        </div>
      </header>
       <loginComponent />;
    </div>
   
  )

}

export default Login;
