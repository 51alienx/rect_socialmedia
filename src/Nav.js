import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search,setsearch}) => {
  return (
   <nav className='Nav'>
     <form className="searchForm " onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">search post</label>
        <input 
        type="text" 
        id='search'
        placeholder='search item'
        value={search}
        onChange={(e)=>setsearch(e.target.value)}
        />
     </form>
     <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/post">post</Link></li>
        <li><Link to="/about">about</Link></li>
     </ul>
   </nav>
  )
}

export default Nav