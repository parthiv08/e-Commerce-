import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Login = () => {
    let {name}= useParams()
    let navigate= useNavigate()
    let handleNavigate=()=>{
      navigate("/")

    }
    
    

  return (
    <div>
      Login-{name}
      <button onClick={handleNavigate}>move to Home</button>
    
    </div>
  )
}

export default Login