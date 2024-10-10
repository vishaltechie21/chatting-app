import React, { useState } from 'react'
import "./Join.css"
import logo from  '../../Images/Logo.png'
import { Link } from 'react-router-dom'

let user 
const  handleJoin = () => {
    user = document.getElementById("joinInput").value
    document.getElementById("joinInput").value = ""
  }

const Join = () => {

  const [name , setName] = useState("")


  return (
    <div className='JoinPage'>
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>V chat</h1>
        <input type="text" onChange={(e)=>setName(e.target.value)} id='joinInput'  placeholder='Enter your name' />

        <Link to="/chat" onClick={(e)=> !name ? e.preventDefault() : null} > <button  className='joinbtn' onClick={handleJoin}>Join</button> </Link> 

      </div>
      
    </div>
  )
}

export default Join
export  {user}

