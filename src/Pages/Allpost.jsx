import React from 'react'
import { useState, useEffect } from 'react'
import DBServer from '../appwrite/config'
import { Container, Postcard } from '../Components'
import { useSelector } from 'react-redux'

function Allpost() {
    const [posts, setposts] = useState([])
    const authStatus = useSelector(state => state.auth.status)
    const userid = useSelector(state => state.auth.userdata.$id)
    const[loading,setloading] = useState(true)

    console.log(userid);
    

    useEffect(() => {
        if (authStatus) {
            DBServer.getmyposts(userid,[]).then((posts) => {
                if (posts) {
                    setposts(posts.documents)
                }
                setloading(false);
            })
        } else {
            setposts([]);
            setloading(false);
        }
    }, [authStatus])

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to view posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
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
                    <Postcard {...post} className="w-full rounded-lg shadow-gray-300 shadow-lg" />
                </div>
            ))
          )}
        </div>
      );


}

export default Allpost
