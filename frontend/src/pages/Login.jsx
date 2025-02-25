import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const {email,setEmail,password,setPassword,setUser}   = useContext(AuthContext)
    const navigate = useNavigate()
   const handleLogin =async (e)=>{
    e.preventDefault()
    const userData = {
      email,
      password
    }
     console.log(userData)
     const config = {
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(userData)
     }
     const response = await fetch("http://localhost:7777/api/users/login",config)
     const result = await response.json()
     
     if(result.error){
      console.log(result)
      return
     }
     
     console.log(result)
     setUser(result.user)
     navigate("/chat-room")

   } 
  return (
        <form  onSubmit={handleLogin}    style={{display:"flex",flexDirection:"column",width:"50%",gap:"1rem"} }>
        <input   onChange={(e)=>   setEmail(e.target.value)   }  value={email}  type="email" placeholder="email"/>
        <input   onChange={(e)=>   setPassword(e.target.value)   }  value={password} type="text" placeholder="password"/>
        <button>Login</button>
    </form>
  )
}

export default Login