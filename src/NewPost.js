import React from 'react'

const NewPost = ({handlesubmit,postTitle,setpostTitle,postBody ,setpostBody}) => {
  return (
   <main className='NewPost'>
    <h1>newpost</h1>
    <form onSubmit={handlesubmit} className='newPostForm'>
        <label htmlFor="title">Title:</label>
        <input 
        type="text" 
        id='postTitle'
        required
        value={postTitle}
        onChange={(e)=>setpostTitle(e.target.value)}
        />
        <label htmlFor="body">Body:</label>
        <textarea 
        type="text" 
        id='postBody'
        required
        value={postBody}
        onChange={(e)=>setpostBody(e.target.value)}
        />
        <button type='submit'>submit</button>

    </form>
   </main>
  )
}

export default NewPost