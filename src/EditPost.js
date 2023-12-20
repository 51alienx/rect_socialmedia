import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({
  posts,
  editTitle,
  seteditTitle,
  editBody,
  seteditBody,
  handleedit,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useState(() => {
    if (post) {
      seteditTitle(post.title);
      seteditBody(post.body);
    }
  }, [post, seteditBody, seteditTitle]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h1>edit post</h1>
          <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => seteditTitle(e.target.value)}
            />
            <label htmlFor="body">Body:</label>
            <textarea
              type="text"
              id="postBody"
              required
              value={editBody}
              onChange={(e) => seteditBody(e.target.value)}
            />
            <button onClick={()=>handleedit(post.id)} type="submit">
              submit
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default EditPost;
