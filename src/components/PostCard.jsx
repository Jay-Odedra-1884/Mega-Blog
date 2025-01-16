import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function PostCard({$id, title, featuredImage}) {

  return (
    <Link to={`/post/${$id}`}>
        <div className='bg-gray-500 w-full rounded-lg'>
            <div className='w-full rounded-lg'>
                <img className='rounded-lg' src={appwriteService.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2 className='font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
