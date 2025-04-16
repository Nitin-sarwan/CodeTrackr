import React, { useEffect, useRef, useState } from 'react'
import './Otp.css'
import { useNavigate } from 'react-router-dom';


const Otp = () => {
    const navigate=useNavigate();
    const [inputArr, setInputArr] = useState(new Array(4).fill(""));
    const refArr=useRef([]);
    useEffect(()=>{
        refArr.current[0]?.focus();
    },[])

    const handleInput=(value,index)=>{
        if(isNaN(value)) return;
        const inputValue=value.trim();
        const newArr=[...inputArr];
        newArr[index]=inputValue.slice(-1);
        setInputArr(newArr);
        inputValue && refArr.current[index+1]?.focus();
    }
    const handleOnKeyDown=(e,index)=>{
        if(!e.target.value && e.key==='Backspace'){
            refArr.current[index-1]?.focus()
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const otpValue=inputArr.join("");
        if(otpValue < 4){
            alert('invalid Otp');
            return;
        }
        console.log(otpValue);
        const newArr=[...inputArr];
        newArr.fill('');
        setInputArr(newArr);
        navigate('/home')
    }

   

  return (
    <div>
        <h1 className="heading">Otp verify</h1>
        <div className='container'>
            <form className="otp-container" >
                {
                    inputArr.map((input,index)=>{
                        return(
                            <input className="otp-input"
                             type="text"
                             value={inputArr[index]}
                             ref={(input) => { refArr.current[index] = input }}
                             onChange={(e)=>handleInput(e.target.value,index)}
                             onKeyDown={(e)=>handleOnKeyDown(e,index)}
                            />
                        )
                    })
                }
            </form>
            <button  className="button-otp" onClick={handleSubmit}>continue</button>
        </div>
    </div>
  )
}

export default Otp
