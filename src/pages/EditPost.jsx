import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components/index";

function EditPost() {
  const [post, setPost] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) {
          setPost(post);
          console.log(post);
          
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  return (
    <div>
      <Container>
        <PostForm post = {post} />
      </Container>
    </div>
  );
}

export default EditPost;
