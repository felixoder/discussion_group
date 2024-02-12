import {useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import { Label, TextInput , Button, Spinner } from "flowbite-react";
import {useDispatch , useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { FaStackOverflow } from "react-icons/fa";
import OAuth from "./OAuth";

export default function SignIn() {
  const [formData , setFormData] = useState({});
  const [errorMessage , setErrorMessage] = useState(null)
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleChange =(e)=>{
    setFormData({...formData , [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill the all fields'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
      
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
        {/* left */}
        <div className='flex-1'>
        <Link
        to="/"
        className="flex gap-1 items-center self-center whitespace-nowrap  sm:text-4xl font-semibold dark:text-white text-4xl"
      >
        <FaStackOverflow />
      <span className="text-black-800 font-bold">

          Felix
      </span>
        <span className="px-1 text-orange-500 font-bold">
        Underflow
        </span>
        
        
       
      </Link>
          <p className='text-sm mt-5'>
            Hey welcome to your new discussion app where you can solve your problem and post your issues on web to get the perfect solution from some tech enthusiast like you so stay tuned
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
                
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              outline
              type="submit"
              disabled={loading}

            
            >
              {loading ?(
                <>
                <Spinner size='sm'/>
                <span className="pl-3">Loading...</span>
                </>
              ):(
                
              'Sign-In'
              )}
            </Button>

            <OAuth/>

            
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
