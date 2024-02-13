import React, { useState } from 'react';
import {Alert, Button, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
export default function Questions() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess , setPublishSuccess] = useState(null)
 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        setPublishSuccess('Question posted successfully');
        setTimeout(() => {
          // Navigate to the desired page after 2 seconds
          navigate("/main?tab=home");
        }, 1000);
      }
      
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    
    <div className='p-3 w-full mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Ask Question</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <div className=''>
        <TextInput
          type='text'
          placeholder='Title'
          required
          id='title'
          className='mb-5 '
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <TextInput type='text' placeholder='tag' className='w-[200px]' required id='tag' onChange={(e) =>
            setFormData({ ...formData, tag: e.target.value })
          }/>
      </div>
     
     
      <ReactQuill
        theme='snow'
        placeholder='Write something...'
        className='h-72 mb-12'
        required
        onChange={(value) => {
          setFormData({ ...formData, content: value });
        }}
      />
      <Button type='submit' gradientDuoTone='purpleToPink' size='sm' outline className='w-[120px] mt-5 mx-auto'>
        Ask
      </Button>
 {publishError && (
        <Alert className='mt-5' color='failure'>
          {publishError}
        </Alert>
      )}  {publishSuccess && (
        <Alert className='mt-5' color='success'>
          {publishSuccess}
        </Alert>
      )} 
    </form>
  </div>
  )
}
