import  { useEffect, useState } from 'react'

const useWindowSize = () => {

  const [windowsize,setwindowsize]=useState({
    width:undefined,
    height:undefined
  })

  useEffect(()=>{
    const handlesize=()=>{
      setwindowsize({
        width:window.innerWidth,
        height:window.innerHeight
      })
      
    }
    handlesize()
    window.addEventListener("resize",handlesize)
    return ()=>window.removeEventListener("resize",handlesize)
  },[])

  return (
    windowsize
  )
}

export default useWindowSize