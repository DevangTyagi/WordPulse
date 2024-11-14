import React from 'react'
import { Container , Postform } from '../Components'
import { useEffect ,useState } from 'react'
import DBServer from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function Editpost() {
    const [post,setposts] = useState(null)
    const {slug} = useParams()  // to take a value from the url
    const navigate = useNavigate()

    useEffect( () => {
        if(slug){
            DBServer.getposts(slug).then((post) => {
                if(post){
                    setposts(post)
                }
            })
        }else{
           navigate('/')
        }
    },[slug,navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                 <Postform post = {post}/>
            </Container>

        </div>
    ) : null
}

export default Editpost
