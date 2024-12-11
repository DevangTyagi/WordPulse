import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">
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
      <main className="container mx-auto relative min-h-screen px-4 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-6xl/tight sm:text-7xl/tight font-medium tracking-tight">
                Human stories & ideas
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-md"
            >
              A place to read, write, and deepen your understanding
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg transition-colors"
              >
                Start reading
              </button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative">
              <svg
                className="w-full h-auto text-green-500"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M200 20C200 20 280 100 280 200C280 300 200 380 200 380"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="200" cy="200" r="100" fill="currentColor" fillOpacity="0.1" />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  d="M200 100C200 100 240 140 240 200C240 260 200 300 200 300"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Landing;

