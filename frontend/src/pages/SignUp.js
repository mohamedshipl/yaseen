
import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from '../helpers/imageTobase64';
import summaryApi from "../common";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';




const SignUp = () => {
    const[showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[data,setData]=useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",
        profilePic:"",
        role:""
    })
    const navigate=useNavigate();

    const handleOnChange=(e)=>{
        const{name,value}=e.target;
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        }
    )
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(data.password === data.confirmPassword){

        const dataResponse=await fetch(summaryApi.signUP.url,{
            method:summaryApi.signUP.method,
            headers : {
                "content-type" : "application/json"
            },
            body:JSON.stringify(data)
        })
        const dataApi=await dataResponse.json();
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }
    
      }else{
        toast.error("Please check password and confirm password")
      }
      };

      const handleUploadPic = async(e) =>{
        const file = e.target.files[0]
        
        const imagePic = await imageTobase64(file)
        
        setData((preve)=>{
          return{
            ...preve,
            profilePic : imagePic
          }
        });
    
      }

      
  return (
   <section id='signUp'>
    <div className='container mx-auto p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                    <img src={data.profilePic||loginIcons} alt='login-icons'/>
                </div>
                <form>
                <label>

                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                        Upload  Photo

                    </div>
                    <input type='file' className="hidden" onChange={handleUploadPic} />
                    </label>

                </form>

            </div>
            <form className='pt-6 flex flex-col gap-2' onSubmit={ handleSubmit}>
<div className='grid'>
    <label>Name:</label>
    <div className='bg-slate-100 p-2'>
        <input  className="w-full h-full outline-none bg-transparent"

        type='text'
        value={data.name}
        name='name'
        placeholder='Enter your name'
        onChange={handleOnChange}
        required/>
    </div>

</div>
<div className='grid'>
<label>Email:</label>
    <div className='bg-slate-100 p-2'>
        <input  className="w-full h-full outline-none bg-transparent"

        type='email'
        value={data.email}
        name='email'
        placeholder='Enter your email'
        onChange={handleOnChange}
        required/>
    </div>
    </div>
    <div>
<label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="enter your password"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>

</div>
    </div>
</div>
<div>
    <label>
        Confirm password:
    </label>
    <div className="bg-slate-100 p-2 flex">
        <input
        type={showConfirmPassword?"text":"password"}
        placeholder="Enter confirm password"
        value={data.confirmPassword}
        name="confirmPassword"
        required
        onChange={handleOnChange}
        className="w-full h-full outline-none bg-transparent"
        />
        <div className="cursor-pointer text-xl" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
<span>
   { showConfirmPassword?
    <FaEye /> : <FaEyeSlash />
   

    }
</span>
        </div>

    </div>
</div>
<button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
    Sign Up
</button>
            </form>
            <p className="my-5">
                Already have account ? <Link to={"/login"} className="text-red-600 hover:text-red-700 hover:underline">
                Login

                </Link>

            </p>
        </div>

    </div>

   </section>
  )
}

export default SignUp
