import React from 'react'
import { useState ,useEffect } from 'react'
import DBServer from '../appwrite/config'
import { Container , Postcard } from '../Components'


function Allpost() {
    const [posts , setposts] = useState([])
    
    DBServer.getposts([]).then( (posts) => {
        if(posts){
            setposts(posts.documents)
        }
    })        
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-10 gap-3">
      {posts.map((post) =>  (
          <div key={post.$id}className="mb-3 break-inside-avoid">
            <Postcard {...post} className="w-full  rounded-lg shadow-gray-300 shadow-lg"/>
          </div>
        )
      )}
 </div>
//         <div className="w-full py-8">
//     <div className="flex flex-wrap sm:flex-col md:flex-row">
//       {       
//       posts.map((post) => (
//         <div key={post.$id} className="w-full ">
//           <Postcard {...post} />
//         </div>
//       ))}
//     </div>
// </div>

    )
}

export default Allpost





// import React from 'react'
// import { useState ,useEffect } from 'react'
// import DBServer from '../appwrite/config'
// import { Container , Postcard } from '../Components'


// function Allpost() {
//     const [posts , setposts] = useState([])
//     useEffect( () => {},[])
//     DBServer.getposts([]).then( (posts) => {
//         if(posts){
//             setposts(posts.documents)
//         }
//     })
         
//     return (
//         <div className='w-full py-8'>
//            <Container>
//             <div className='flex flex-wrap sm:flex-col md:flex-row'>
//             {
//                 posts.map( (post) => (                    
//                     <div key = {post.$id} className='w-1/4 p-2'>
//                         <Postcard {...post}/>
//                     </div>
//                 ))
//               }
//             </div>
              
//            </Container>
//         </div>
//     )
// }

// export default Allpost
