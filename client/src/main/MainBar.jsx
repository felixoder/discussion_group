import {useState, useEffect} from 'react'
import MainSide from './MainSide'
import DashProfile from '../components/DashProfile'
import Home from '../components/Home'
import EditProfile from '../edit/EditProfile'
import Community from './Community'
import Collections from './Collections'
import { useLocation } from 'react-router-dom'
import Main from './Main'
import Jobs from './Jobs'
import Questions from './Questions'
import AnotherBar from './AnotherBar'

export default function MainBar() {
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
    <div className='min-h-screen flex flex-col sm:flex-row '>
      <div className="mid:w-56">

        {/* sidebar */}
        <MainSide/>
      </div>
     {/* for home page */}
      {tab==='home' &&<Main/>}

      {/* for community page  */}
      {tab==='community' &&<Community/>}

      {/* for collections page */}
 
      {tab==='collections' && <Collections/>}

      {/* for jobs page */}

      {tab==='jobs' && <Jobs/>}
      {/* for question asking page  */}
      
      {tab==='questions' && <Questions/>}
      <div className="mid:w-[-56] hidden md:block">

{/* sidebar */}
<AnotherBar/>
</div>
     


      
      
    </div>
  )
}
