import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";

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
          <h2>Please Login to view blog <span className="text-blue-500"><Link to={"/login"}>Login</Link></span></h2>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <div>
            {posts.map((post) => (
              <div key={post.$id}>
              <PostCard {...post} />
            </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
