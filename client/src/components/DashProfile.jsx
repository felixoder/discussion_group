import { useSelector , useDispatch } from "react-redux";
import { SlCalender } from "react-icons/sl";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch =  useDispatch()
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
        <span className="cursor-pointer ">Delete Account</span>
        <Button type="submit" className="cursor-pointer" onClick={handleSignOut} gradientDuoTone='purpleToPink' outline >Sign-Out</Button>
      </div>
      </div>
      
    </div>
  );
}
