import React from "react";
import { useEffect, useState } from "react";
import DBServer from "../appwrite/config";
import { Container, Postcard } from "../Components";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const [posts, setposts] = useState([]);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setloading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q"); 


  useEffect(() => {
    if (authStatus) {
      setloading(true)
      // Check if there is a search query and filter posts based on it
      DBServer.getposts().then((posts) => {
        if (posts) {
          const filteredPosts = posts.documents.filter((post) =>
            post.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
          );
          setposts(filteredPosts);
        }
        setloading(false);
      });
    } else {
      setposts([]);
      setloading(false);
    }
  }, [authStatus, searchQuery]);

  if (!authStatus) {
    navigate("/");
    return null;
  }

  return loading ? (
    <div className="flex justify-center items-center h-64 text-gray-500">
      <div className="text-center">
        <div className="spinner animate-spin w-10 h-10 mx-auto mb-4 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full"></div>
        <p>Loading posts...</p>
      </div>
    </div>
  ) : (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-5 md:py-5 gap-3 px-4">
      {posts.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500">
          <p className="text-xl">No posts found</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.$id} className="mb-3 break-inside-avoid">
            <Postcard
              {...post} 
              className="w-full rounded-lg shadow-gray-300 shadow-lg"
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
