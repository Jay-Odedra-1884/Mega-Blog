import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <Link to={`/post/${$id}`} className="block group">
        <div className="rounded-xl overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
          {/* Image Section */}
          <div className="w-full h-60">
            <img
              className="w-full h-full object-cover"
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              loading="lazy"
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-red-500 truncate">
              {title}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;