import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const {email,setEmail,username,setUsername,password,setPassword}   = useContext(AuthContext)
  
  const navigate = useNavigate()

  const handleRegister =async (e)=>{
   e.preventDefault()
   const userData = {
      username,
      email,
      password
   }

   const config = {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(userData)
   }
    
   const response = await fetch("http://localhost:8000/api/users/register",  config  )   
   const result = await response.json()

   if(result.error){
    console.log(result)
    return
   }
   
   navigate("/login")

  }


  return (
    <form  onSubmit={handleRegister}    style={{display:"flex",flexDirection:"column",width:"50%",gap:"1rem"} }>
        <input   onChange={(e)=>   setUsername(e.target.value)   }  value={username}   type="text" placeholder="username" />
        <input   onChange={(e)=>   setEmail(e.target.value)   }  value={email}  type="email" placeholder="email"/>
        <input   onChange={(e)=>   setPassword(e.target.value)   }  value={password} type="text" placeholder="password"/>
        <button>Register</button>
    </form>
  )
}

export default Register