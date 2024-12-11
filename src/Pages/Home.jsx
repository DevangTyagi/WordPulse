import React from 'react'
import { useEffect, useState } from 'react'
import DBServer from '../appwrite/config'
import { Container, Postcard } from '../Components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [posts, setposts] = useState([])
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authStatus) {
            DBServer.getposts().then((posts) => {
                if (posts) {
                    setposts(posts.documents)
                }
            })
        } else {
            setposts([])
        }
    }, [authStatus])

    if (!authStatus) {
       navigate("/")
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

export default Home
