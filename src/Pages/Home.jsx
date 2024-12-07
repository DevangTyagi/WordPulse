import React from 'react'
import { useEffect , useState } from 'react'
import DBServer from '../appwrite/config'
import { Container , Postcard } from '../Components'
import authservice from '../appwrite/auth'

function Home() {
    const [ posts , setposts] = useState([])
    const [authenticated , setauthenticated] = useState(false)

    useEffect( ()=> {
          DBServer.getposts().then( (posts) => {
            if(posts){
                setposts(posts.documents)
            }
          })   
    } , [])

    useEffect( () => {
        authservice.getCurrentuser().then ((data)=>{
            if(data.$id){
                setauthenticated(true)
            }
        })
    } , [])
    if(!authenticated) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-10 gap-3">
        {posts.map((post) =>  (
            <div key={post.$id}className="mb-3 break-inside-avoid">
              <Postcard {...post} className="w-full  rounded-lg shadow-gray-300 shadow-lg"/>
            </div>
          )
        )}
   </div>
    )
}

export default Home
