import { useContext, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
// import './App.css'
import Navbar from './components/Navbar'
import ChatRoom from './pages/ChatRoom'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthContext } from './context/AuthContext'


function App() {
const {user} = useContext(AuthContext)
console.log("user",user)
  
  return (
    <>
      <Navbar />
      <h1> hellow</h1>
      <Routes>
           <Route  path='/chat-room'     element ={user ? <ChatRoom />: <Login />    }      />
           <Route  path='/register'      element ={<Register />}      />
           <Route  path='/login'         element ={!user ? <Login /> : <ChatRoom /> }      />

      </Routes>
    </>
  )
}

export default App
