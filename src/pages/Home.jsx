import React, { useEffect, useState } from 'react'
import service from'../appwrite/config'
import { Container, PostCard } from '../components/index';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts().then((post)=> {
            if(post) {
                setPosts(post.documents);
            }
        })
    }, []);

    console.log(posts);

  if(posts.legth === 0) {
    return (
        <div>
            <Container>
                <h2>There is nothing to view</h2>
            </Container>
        </div>
    )
  } else {
    return (
        <div>
        <Container>
            <div>
            {posts.map((post) => {
                <div>
                    <PostCard post={post} />
                </div>
            })}
            </div>
        </Container>
    </div>
    )
  }
}

export default Home
