import React from "react";
import DBServer from "../appwrite/config";
import { Link } from "react-router-dom";
function Postcard({ $id, title, featuredImage }){
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full justify-center mb-4 relative group">
          <img
            src={DBServer.getFilePreview(featuredImage)}
            alt={title}
            className="w-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl "></div>
          <h1 className="absolute bottom-0 left-0 w-full text-3xl text-white font-bold p-4 rounded-b-xl break-words transform transition-all group-hover:scale-105 group-hover:text-4xl">
            {title}
          </h1>
        </div>

    </Link>
  );
}

export default Postcard;

// import React from 'react'
// import DBServer from '../appwrite/config'
// import { Link } from 'react-router-dom'
// function Postcard({$id , title , featuredImage}) {
//     return (
//         <Link to={`/post/${$id}`}>
//          <div className='w-full bg-gray-100 rounded-xl p-4'>
//               <div className='w-full justify-center mb-4'>
//                    <img src = {DBServer.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
//               </div>
//               <h2 className='text-xl font-bold'>{title}</h2>
//          </div>
//         </Link>
//     )
// }

// export default Postcard
