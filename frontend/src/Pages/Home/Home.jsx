import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate()
    const nextPage = () => {
        navigate('/Login')
    }
  return (
    <div className="home-container">
        <div>
            <h1>Welcome to the codeTracker</h1>
            <img src="" alt="" />
        </div>
          <button onClick={nextPage}>Continue</button>
    </div>

  )
}

export default Home
