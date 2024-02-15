import {
  
  Button,
  Dropdown,
  Navbar,
  TextInput,
  Avatar
} from "flowbite-react";
import {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice'
import {AiOutlineSearch} from 'react-icons/ai';
import {FaSun , FaMoon} from 'react-icons/fa'
import { useLocation } from "react-router-dom";
import { FaStackOverflow } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  const dispatch = useDispatch();
  const [searchTerm , setSearchTerm] = useState('');

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
    <Navbar className="border-b-2 sticky top-0 w-full">
      <Link
        to="/main?tab=home"
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
     
      <Button className="w-12 h-10 lg:hidden" color="grey" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="grey" pill onClick={()=> dispatch(toggleTheme())}>
          {theme ==='light'?<FaSun/>:<FaMoon  />}
          
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt={currentUser.username} img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      
    </Navbar>
  );
}
