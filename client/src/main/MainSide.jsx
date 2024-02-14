import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  HiUser,
 
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
} from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import {BsQuestionSquare} from 'react-icons/bs';
import {PiSuitcaseSimple} from 'react-icons/pi';
import {CiStar} from 'react-icons/ci';
import {HiOutlineUserGroup} from 'react-icons/hi';
import {IoHomeOutline} from 'react-icons/io5'

export default function MainSide() {
  const { currentUser } = useSelector((state) => state.user);
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

      <Sidebar className="w-full md:w-56">
        <Sidebar.Items className="md:fixed">
          <Sidebar.ItemGroup className="flex flex-col gap-2  ">
            {currentUser && (
              <Link to="/main?tab=home">
                <Sidebar.Item
                  active={tab === "home" || !tab }
                  icon={IoHomeOutline}
                  as="div"
                >
                  Home
                </Sidebar.Item>
              </Link>
            )}
            {currentUser && (
              <Link to="/main?tab=community">
                <Sidebar.Item
                  active={tab === "community"  }
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Community
                </Sidebar.Item>
              </Link>
            )}
           
           

            {currentUser && (
              <>
                <Link to="/main?tab=collections">
                  <Sidebar.Item
                    active={tab === "collections"}
                    icon={CiStar}
                    labelColor="dark"
                    as="div"
                  >
                    Collections
                  </Sidebar.Item>
                </Link>
                <Link to="/main?tab=jobs">
                  <Sidebar.Item
                    active={tab === "jobs"}
                    icon={PiSuitcaseSimple}
                    as="div"
                  >
                    Find Jobs
                  </Sidebar.Item>
                </Link>
              </>
            )}{" "}
            {currentUser && (
              <>
            
                
                <Link to="/main?tab=questions">
                  <Sidebar.Item
                    active={tab === "questions"}
                    icon={BsQuestionSquare}
                    as="div"
                  >
                    Ask Questions
                  </Sidebar.Item>
                </Link>
              </>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
 
  );
}
