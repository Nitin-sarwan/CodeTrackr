// import React, { useState } from 'react';
// import Codeforces from './Components/Codeforces/Codeforces';
// import LeetCode from './Components/LeetCode/LeetCode';
// import Navbar from './Components/Navbar/Navbar';
// import Filter from './Components/Filter/Filter';
// // import './App.css'

// const App = () => {
//   const [selectedFilter, setSelectedFilter] = useState('all');

//   return (
//     <div>
//       <Navbar/>
//       <Filter onFilterChange={setSelectedFilter} />
//       {(selectedFilter === 'all' || selectedFilter === 'codeforces') && <Codeforces/>}
//       {(selectedFilter === 'all' || selectedFilter === 'leetcode') && <LeetCode/>}
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/UserLogin';
import Otp from './Pages/Otp/Otp';
import SignUp from './Pages/SignUp/SignUp';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Login' element={<Login />} />
        <Route path="/otpverify" element={<Otp/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* Add other routes here */}
      </Routes>
      
    </div>
  )
}

export default App
