import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components/index";

function EditPost() {
  const [post, setPost] = useState(null);
  const slug = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div>
      <Containet>
        <PostForm post={post} />
      </Containet>
    </div>
  );
}

export default EditPost;
