import React, { useState, useEffect } from 'react'
import "./Navbar.css"

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false)
    
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [darkMode])

    const handlerMode = () => {
        setDarkMode(!darkMode)
    }
    
  return (
    <div className='navbar'>
        <h1>All Contests</h1>
        <button onClick={handlerMode}>{darkMode ? 'light' : 'dark'}</button>
    </div>
  )
}

export default Navbar
