import { useSelector , useDispatch } from "react-redux";
import { SlCalender } from "react-icons/sl";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {useState} from 'react'
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch =  useDispatch()
  const [showModel , setShowModel] = useState(false)
  const handleSignOut = async ()=>{
    try {
      const res = await fetch('/api/user/signout',{
        method:'POST'
  
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signOutSuccess())
  
      }
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  const handleDeleteUser=async ()=>{
    setShowModel(false);
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
  
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }
      else{
        dispatch(deleteUserSuccess(data))
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      
    }
  
  }
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row  justify-center items-center ">
        <img
          src={currentUser.profilePicture}
          className="rounded-full h-[170px] w-[170px] mt-5 ml-5"
          alt="picture"
        />
        <div className="mt-5">
          <h1 className="font-bold text-3xl px-2 py-2">
            @{currentUser.username}{" "}
          </h1>
          <h1 className="font-sm text-xl px-2 py-2  ">{currentUser.email}</h1>
          <span className="flex justify-center items-center">
            <SlCalender />
            <h1 className="font-sm text-2xl px-2 py-2">
             Joined..     
              {new Date(currentUser.createdAt).toLocaleString()}
            </h1>
          </span>
        </div>
        <h1></h1>

        <Button className="mx-20" gradientDuoTone='purpleToBlue' outline>
          <Link to='/dashboard?tab=edit'>

          Edit Profile
          </Link>
        </Button>
      </div>
      <div className="">
      <div className="text-red-700 flex justify-between mt-10 ml-5 mr-5 font-semibold">
        <Button gradientDuoTone='purpleToBlue' outline   onClick={()=>setShowModel(true)} className="cursor-pointer">Delete Account</Button>
        <Button type="submit" className="cursor-pointer" onClick={handleSignOut} gradientDuoTone='purpleToPink' outline >Sign-Out</Button>
      </div>
      </div>
      <Modal show={showModel} onClose={()=> setShowModel(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-grey-500 dark:text-grey-400">Are You sure you want to delete your account</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes I am sure</Button>
              <Button color="grey" onClick={()=> setShowModel(false)}>No, Cancel </Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
      
    </div>
    
  );
}
