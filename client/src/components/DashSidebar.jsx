import { Sidebar } from 'flowbite-react';
import {useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiUser  , HiDocumentText , HiOutlineUserGroup , HiAnnotation , HiArrowSmRight , HiChartPie} from 'react-icons/hi';
import { CiEdit } from "react-icons/ci";

export default function DashSidebar() {
    const {currentUser} = useSelector((state)=> state.user)
    const [tab, setTab] = useState('');
    
    return (
        <Sidebar className='w-full md:w-56'>
          <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              {
                currentUser  && (
                  <Link to='/dashboard?tab=dash'>
                    <Sidebar.Item 
                    active={tab === 'dash' || !tab}
                    icon={HiChartPie}
                    as='div'>
                      Home
                    </Sidebar.Item>
                  </Link>
                )
              }
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin':'User'} labelColor='dark' as='div'>
                  Profile
                </Sidebar.Item>
              </Link> 
             
              {currentUser && (
                <>
                
               
                 <Link to='/dashboard?tab=edit'>
                 <Sidebar.Item active={tab === 'edit'} icon={CiEdit}  labelColor='dark' as='div'>
                   Edit Profile
                 </Sidebar.Item>
               </Link>
                <Link to='/dashboard?tab=posts'>
                  <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                    Your Posts
                  </Sidebar.Item>
                </Link>
                </>
              )} {currentUser.isAdmin && (
                <>
                   <Link to='/dashboard?tab=users'>
                  <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                    Users
                  </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=comments'>
                  <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as='div'>
                    Comments
                  </Sidebar.Item>
                </Link>
                </>
             
              )}
              

              
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      );
}
