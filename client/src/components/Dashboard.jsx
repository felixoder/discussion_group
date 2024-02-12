import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import DashProfile from './DashProfile';
import DashSidebar from './DashSidebar';
import EditProfile from '../edit/EditProfile';


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }

  },[location.search])
  
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="mid:w-56">

        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* profile.... */}
      {tab==='profile' &&<DashProfile/>}
      {/* edit */}
      {tab==='edit' && <EditProfile/>}
      {/* posts */}
      {/* {tab === 'posts'} */}
      {/* users */}
      {/* {tab === 'users' && <DashUsers/>} */}
      {/* comments */}
      {/* {tab === 'comments' && <DashComments/>} */}
      {/* dashboard component */}
      {/* {tab === 'dash' && <DashboardComp/>} */}
      
    </div>
  )
}