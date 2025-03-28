import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { Container } from '../components/index';
import { PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        service.getPosts().then((posts) => {
            if(posts) {
            setPosts(posts.documents);
            }
        })
    }, [])

 if( posts.length === 0) {
    return (
        <div>
            There is no posts....!
        </div>
    )
 } else {
    return (
        <div className='w-full '>
          <Container>
            <div className='w-full min-h-screen flex flex-wrap gap-2'>
            {posts ? (
                    posts.map((post) => (
                            <PostCard {...post} key={post.$id} />
                    ))
            ): (
                <div>
                    <h2>There is no posts...:&#40;</h2>
                </div>
            )}
            </div>
          </Container>
        </div>
      )
 }
}

export default AllPosts
