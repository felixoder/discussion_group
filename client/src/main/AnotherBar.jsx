import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
    FaReact,
    FaNodeJs,
    FaBrain,
    
    FaInstagram,
    FaGithub,
    FaLinkedin
  
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {SiRedux ,SiMongodb , SiFirebase  , SiExpress } from 'react-icons/si'


export default function AnotherBar() {
  const { currentUser } = useSelector((state) => state.user);
  
  

  return (

      <Sidebar className="w-full md:w-56">
        <Sidebar.Items className="md:fixed mt-[130px]">
          <Sidebar.ItemGroup className="flex flex-col gap-2  ">
            {currentUser && (
             <>
      
             <Sidebar.Item>
             <p className="font-bold">Technology used in it</p>
             <ul className="list-disc ml-5 mt-2">
               <li className="flex items-center">
                 <FaReact className="mr-2" />
                 <span>React</span>
               </li>
               <li className="flex items-center">
                 <SiRedux className="mr-2" />
                 
                 <span>Redux</span>
               </li>
               
               <li className="flex items-center">
                 <SiMongodb className="mr-2" />
                 <span>MongoDB</span>
               </li>
               <li className="flex items-center">
                 <SiFirebase className="mr-2" />
                 <span>Firebase</span>
               </li>
               <li className="flex items-center">
                 <FaNodeJs className="mr-2" />
                 <span>Node.js</span>
               </li>
               <li className="flex items-center">
                 <SiExpress className="mr-2" />
                 <span>Express</span>
               </li>
               <li className="flex items-center">
               <FaBrain  className="mr-2"/>
                 <span>some expertise</span>
                 
               </li>
               
               {/* Add more technologies as needed */}
             </ul>
           </Sidebar.Item>
           <Sidebar.Item>
             <p className="font-bold text-center">Contact me</p>
             <ul className="list-disc ml-5 mt-2">
               <li className="flex items-center">
                <Link to='https://twitter.com/DebayanGho59742' className="flex items-center " target='__blank'>
                
                 <FaXTwitter className="mr-2" />
                
                 <span>Twitter / X</span>
                </Link>
               </li>
               <li className="flex items-center">
                <Link to='https://www.instagram.com/felix__12_7/' className="flex justify-center items-center" target="__blank">
                
                 <FaInstagram className="mr-2" />
                 
                 <span>Instagram</span>
                </Link>
               </li>
               
               <li className="flex items-center">
                <Link to='https://github.com/felixoder' className="flex justify-center items-center" target="__blank">
                
                 <FaGithub className="mr-2" />
                 <span>Github</span>
                </Link>
               </li>
               <li className="flex items-center">
                <Link to='https://www.linkedin.com/in/debayan-ghosh-1671b4224/' className="flex justify-center items-center" target="__blank">
                
                 <FaLinkedin className="mr-2" />
                 <span>Linkedin</span>
                </Link>
               </li>
               
               
               {/* Add more technologies as needed */}
             </ul>
           </Sidebar.Item>
           </>
                
    
            )}
           
           
           

          
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
 
  );
}
