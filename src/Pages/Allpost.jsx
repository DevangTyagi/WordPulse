import React from 'react'
import { useState, useEffect } from 'react'
import DBServer from '../appwrite/config'
import { Container, Postcard } from '../Components'
import { useSelector } from 'react-redux'

function Allpost() {
    const [posts, setposts] = useState([])
    const authStatus = useSelector(state => state.auth.status)
    const userid = useSelector(state => state.auth.userdata.$id)

    console.log(userid);
    

    useEffect(() => {
        if (authStatus) {
            DBServer.getmyposts(userid,[]).then((posts) => {
                if (posts) {
                    setposts(posts.documents)
                }
            })
        } else {
            setposts([])
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

    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-10 gap-3">
            {posts.map((post) => (
                <div key={post.$id} className="mb-3 break-inside-avoid">
                    <Postcard {...post} className="w-full rounded-lg shadow-gray-300 shadow-lg" />
                </div>
            ))}
        </div>
    )
}

export default Allpost
