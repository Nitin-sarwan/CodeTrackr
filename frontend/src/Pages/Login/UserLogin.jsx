import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css'

const UserLogin = () => {
    const navigate=useNavigate();
    const [phoneNumber,setPhoneNumber]=useState("");
    const handlePhoneNumber=(value)=>{
        if(isNaN(value)) return;
        if(  value.length >10 || value.lenghth<10) return 
        // console.log(input);
        setPhoneNumber(value);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(phoneNumber)
        try{
            // const response=await axios.post('http://localhost:4000/api/user/otpverification',{
            //     phoneNumber
            // });
            // if(response.status === 200){
            //     const data=response.data
            //     console.log(data);
            //     navigate('/otpverify')
            // }
            navigate('/otpverify');
        }catch(err){
            console.log(err);
        }


        setPhoneNumber("");
        // Add your login logic here

    }

  return (
    <div>
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text"
                 placeholder="Enter your phone number here"
                 value={phoneNumber}
                 onChange={(e)=>handlePhoneNumber(e.target.value)} 
                 required
                  />
                  <button type="submit">Login</button>
            </form>
              
              <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      
    </div>
  )
}

export default UserLogin
