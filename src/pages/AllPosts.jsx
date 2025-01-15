import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { Container } from 'postcss';
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

  return (
    <div>
      <Container>
        {posts ? (
            <div>
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        ): (
            <div>
                <h2>There is no posts...:&#40;</h2>
            </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
