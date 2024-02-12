import {
  
  Button,
  Dropdown,
  Navbar,
  TextInput,
  Avatar
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice'
import {AiOutlineSearch} from 'react-icons/ai';
import {FaSun , FaMoon} from 'react-icons/fa'
import { useLocation } from "react-router-dom";
import { FaStackOverflow } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  const dispatch = useDispatch()
  return (
    <Navbar className="border-b-2 ">
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
      <form >
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
         
        />
      </form>
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
            <Dropdown.Item >Sign out</Dropdown.Item>
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
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
