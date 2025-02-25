import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


const Navbar = () => {
  const {user,setUser} = useContext(AuthContext)
  const logOut =async()=> {
    const config = {
      credentials:"include"
    }
    const response = await fetch("http://localhost:7777/api/users/logout",config)
    const result = await response.json()
    console.log(result)
    setUser(null)
  }
  return (
    <nav style={{display:"flex", justifyContent:"space-between"}}>
        <img style={{borderRadius:"50%"}} src="https://placebear.com/100/100" alt="" />
    <ul style={{display:"flex",listStyle:"none"  ,gap:"1rem"}}>
       <Link to={"/chat-room"} > <li>chat room</li> </Link>  
       <Link to={"/register"} >  <li>Register</li>   </Link> 
      { !user ? <Link to={"/login"} >     <li>Login</li>     </Link> :    <button onClick={logOut} >Logout</button>  }
    </ul>
    </nav>
  )
}

export default Navbar