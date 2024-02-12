import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { FaStackOverflow } from "react-icons/fa";
import OAuth from "./OAuth";


export default function SignUp() {
  const [formData , setFormData] = useState({});
  const [errorMessage , setErrorMessage] = useState(null);
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value.trim()})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Fill the all cradentials')
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);

      }
      //loader
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
      //loader
      
    }

  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link
        to="/"
        className="flex gap-1 items-center self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <FaStackOverflow />
      <span className="text-black-800 font-bold">

          Felix
      </span>
        <span className="px-1 text-orange-500 font-bold">
        Underflow
        </span>
        
        
       
      </Link>
          <p className="text-sm mt-5">
            Hey welcome to your new discussion app where you can solve your
            problem and post your issues on web to get the perfect solution from
            some tech enthusiast like you so stay tuned
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>{" "}
            <div>
              <Label value="Your UserName" />
              <TextInput type="text" placeholder="UserName" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" outline type="submit" disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm'/>
                <span className="pl-3">Loading...</span>
                </>
              ):(
                'Sign-Up'
              )
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
