import React from 'react'
import { useState ,useEffect } from 'react'
import DBServer from '../appwrite/config'
import { Container , Postcard } from '../Components'


function Allpost() {
    const [posts , setposts] = useState([])
    useEffect( () => {},[])
    DBServer.getposts([]).then( (posts) => {
        if(posts){
            setposts(posts.documents)
        }
    })
         
    return (
        <div className='w-full py-8'>
           <Container>
            <div className='flex flex-wrap'>
            {
                posts.map( (post) => (                    
                    <div key = {post.$id} className='w-1/4 p-2'>
                        <Postcard {...post}/>
                    </div>
                ))
              }
            </div>
              
           </Container>
        </div>
    )
}

export default Allpost
