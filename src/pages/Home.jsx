import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div>
        <Container>
          <h2>There is nothing to view...</h2>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <div className='w-full min-h-screen flex flex-wrap gap-2'>
            {posts.map((post) => (
              <PostCard {...post} key={post.$id}/>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
