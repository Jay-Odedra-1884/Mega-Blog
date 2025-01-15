import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container } from '../components/index';
import { parse } from 'postcss';


function Post() {

    const slug = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const userData = useSelector((state) => state.auth.userData);

    const isAuther = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug) {
            service.getPost(slug).then((post) => {
                if(post) setPost(post);
                else navigate("/")
            })
        } else {
            navigate("/")
        }
    }, [slug, nevigate]);

    const deletePost = () => {
        if(post) {
            service.deletePost(post.$id).then((status) => {
                if(status) {
                    service.deleteFile(post.feturedImage);
                    navigate("/");
                }
            })
        }
    }

  return (
    <div>
        <Container>
        {post ? (
            <div>
                <div>
                    <img src={service.getFilePreview(post.feturedImage)} alt={post.title} />
                    {isAuther && (
                        <div>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div>
                    <h2>{post.title}</h2>
                    <p>{parse(post.content)}</p>
                </div>
            </div>
        ) 
        : null}
        </Container>
    </div>
  )
}

export default Post
