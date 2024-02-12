import { Button, TextInput , Alert } from "flowbite-react";
import {useState} from "react";
import { useSelector , useDispatch } from "react-redux";
import { updateStart , updateSuccess , updateFailure , signOutSuccess } from "../redux/user/userSlice.js";
export default function EditProfile() {
  const { currentUser , error , loading } = useSelector((state) => state.user);
  const [formData , setFormData] = useState({})
  const[updateUserSuccess , setUpdateUserSuccess] = useState(null)
  const [updateUserError , setUpdateUserError] = useState(null)
  const dispatch = useDispatch();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
    
  }

  const handleSubmit = async (e) => {
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    e.preventDefault();
   
    if (Object.keys(formData).length === 0) {
     setUpdateUserError('No changes are made')
      return;
    }
    
   
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
     
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Users profile is updated successfully')
        
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message)
      
    }
  };
  
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Edit Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextInput id="username" defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput id="email" defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput id="password" type="password"  onChange={handleChange}/>

        <Button type="submit" outline gradientDuoTone="purpleToBlue">
{loading ? 'Loading....':'Update'}
         
        </Button>
        {updateUserSuccess &&(
        <Alert color='success' className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}{updateUserError &&(
        <Alert color='failure' className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error &&(
        <Alert color='failure' className="mt-5">
          {error}
        </Alert>
      )}
      </form>
    </div>
  );
}
