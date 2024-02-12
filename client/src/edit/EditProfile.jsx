import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function EditProfile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl'>Edit Profile</h1>
      <form className='flex flex-col gap-5'>
        <TextInput defaultValue={currentUser.username}/>
        <TextInput defaultValue={currentUser.email}/>
        <Button type='submit' outline gradientDuoTone='purpleToBlue'>Edit</Button>
      </form>
      
    </div>
  )
}
