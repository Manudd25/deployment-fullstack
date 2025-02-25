import React, { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {

    const [username,setUsername]=useState("")
    const [email,setEmail]      =useState("")
    const [password,setPassword]=useState("")
    const [user,setUser]= useState(null)

      
useEffect(()=>{
  
    const getUserData =async ()=>{
      const config = {
        credentials:"include"
      } 
      const response = await fetch("http://localhost:7777/api/users/userInfo",config)
      const result = await response.json()
      if(result.error){
        console.log(result)
        return
      }
  
     setUser(result)
    }
  
    getUserData()
  
  },[])


    return (
        <AuthContext.Provider  value={{username,setUsername,password,setPassword,email,setEmail,user,setUser}} >
            {children}
        </AuthContext.Provider>
    );
};