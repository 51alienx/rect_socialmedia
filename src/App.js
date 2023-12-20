import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";
import useWindowSize from "./Hooks/useWindowSize";
import UseAxiosfetch from "./Hooks/UseAxiosfetch";

function App() {
  const [posts, setposts] = useState([]);

  const{data,fetchError,isLoading}=UseAxiosfetch('http://localhost:3500/post')
  
  useEffect(()=>{
    setposts(data)
  },[data])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/post");
  //       setposts(response.data);
  //     } catch (err) {
      
  //       if (err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  const [search, setsearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const Navigate = useNavigate();


  useEffect(() => {
    const filterposts = posts.filter(
      (post) =>
        post.body.toLocaleLowerCase().includes(search.toLowerCase()) ||
        post.title.toLocaleLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterposts.reverse());
  }, [search, posts]);

  const [postTitle, setpostTitle] = useState("");
  const [postBody, setpostBody] = useState("");
  const [editTitle, seteditTitle] = useState("");
  const [editBody, seteditBody] = useState("");

  const handlesubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy,PP");
    const newpost = { id, title: postTitle, datetime, body: postBody };
    try{
    const response=await api.post("/post",newpost)
    const allpost = [...posts, response.data];
    setposts(allpost);
    setpostTitle("");
    setpostBody("");
    Navigate("/");
    }catch (err) {
        console.log(`Error: ${err.message}`);    
    }
  };

  const handleedit=async(id)=>{
    const datetime = format(new Date(), "MMMM dd,yyyy,PP");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try{
      const response = await api.put(`/post/${id}`,updatedPost)
      setposts(posts.map(post=>post.id===id?{...response.data}:post))
      seteditTitle('')
      seteditBody('')
      Navigate("/");
    
    }catch(err){
      console.log(`Error: ${err.message}`); 
    }
    
    
  }


  const handleDelete = async(id) => {
    try{
    await api.delete(`/post/${id}`)
    const rempost = posts.filter((post) => post.id !== id);
    setposts(rempost);
    Navigate("/");
    }catch (err) {
      console.log(`Error: ${err.message}`);    
  }

  };

  const {width}=useWindowSize()

  return (
    <div className="App">
      <Header title="xo media"
      width={width}
      />
      <Nav search={search} setsearch={setsearch} />
      <Routes>
        <Route path="/" element={<Home 
        
        fetchError={fetchError}
        isLoading={isLoading}
        posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handlesubmit={handlesubmit}
                postTitle={postTitle}
                setpostTitle={setpostTitle}
                postBody={postBody}
                setpostBody={setpostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="/edit/:id" element={<EditPost
        posts={posts}
        editTitle={editTitle}
        seteditTitle={seteditTitle}
        editBody={editBody}
        seteditBody={seteditBody}
        handleedit={handleedit}
        />}></Route>

        <Route path="about" element={<About />} />

        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
