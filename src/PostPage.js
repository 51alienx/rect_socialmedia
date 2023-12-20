import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const{id}  = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h1>{post.title}</h1>
            <p className="postDate">{post.datetime}</p>

            <p className="postBody">{post.body}</p>
            <Link  to={`/edit/${post.id}`}><button className="editButton" >edit post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        )}
        {!post && (
          <>
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <Link to="/"><p>Visit Our Homepage</p> </Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
