import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
} from "react-icons/hi";
import { CiEdit } from "react-icons/ci";

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
        <Sidebar.Items >
          <Sidebar.ItemGroup className="flex flex-col gap-1 ">
            {currentUser && (
              <Link to="/main?tab=home">
                <Sidebar.Item
                  active={tab === "home" || !tab }
                  icon={HiChartPie}
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
                  icon={HiChartPie}
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
                    icon={CiEdit}
                    labelColor="dark"
                    as="div"
                  >
                    Collections
                  </Sidebar.Item>
                </Link>
                <Link to="/main?tab=jobs">
                  <Sidebar.Item
                    active={tab === "jobs"}
                    icon={HiDocumentText}
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
                    icon={HiAnnotation}
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
