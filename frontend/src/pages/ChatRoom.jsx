import {useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const ChatRoom = () => {

 const {user,setUser} = useContext(AuthContext) 
 console.log(user)


  return (
    <div>ChatRoom</div>
  )
}

export default ChatRoom