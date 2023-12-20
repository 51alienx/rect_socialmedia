import React from "react";
import Post from "./Post";

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className="Home">
    {isLoading && <p className="statusMsg">Loading...</p>}
    {!isLoading && fetchError && <p className="statusMsg" style={{ color: 'red' }}>{fetchError}</p>}
    {!isLoading && !fetchError &&  <Post posts={posts} />}
  
    {isLoading && fetchError &&  <p style={{ marginTop: "2rem" }}>empty</p>}

    </main>
  );
};

export default Home;
