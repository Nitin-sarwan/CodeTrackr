import React, { useState } from 'react'

const SignUp = () => {
    const [name,setName]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(name,phoneNumber);
        setName('');
        setPhoneNumber('');
        // Add your logic to send OTP here
    }
    const handlePhoneNumber=(value)=>{
        if(isNaN(value)) return;
        if(  value.length >10 || value.lenghth<10) return 
        // console.log(input);
        setPhoneNumber(value);
    }


  return (
    <div className="signup-main">
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit} >
                <input type="text"
                 placeholder='Enter your name here' 
                 value={name}
                 required
                 onChange={(e)=>setName(e.target.value)}/>
                <input type="text"
                 placeholder="Enter your phone number"
                 required
                 value={phoneNumber}
                 onChange={(e)=>handlePhoneNumber(e.target.value)} />
                  <button className="signp-btn" type="submit">Send Otp</button>
            </form>
            
        </div>
      
    </div>
  )
}

export default SignUp
