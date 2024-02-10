import React from "react";
import { Link } from "react-router-dom";
import { Label, TextInput , Button } from "flowbite-react";


export default function SignIn() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white font-serif'>
              FelixUnderflow
            </span>
           
            
          </Link>
          <p className='text-sm mt-5'>
            Hey welcome to your new discussion app where you can solve your problem and post your issues on web to get the perfect solution from some tech enthusiast like you so stay tuned
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' >
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              outline
            
            >
              Sign-In
            </Button>
            
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
