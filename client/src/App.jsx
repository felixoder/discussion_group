import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import About from './components/About';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import OnlyPrivateRoute from './components/OnlyPrivateRoute';

import Home from './components/Home';
import MainSide from './main/MainSide';
import Main from './main/Main';
import MainBar from './main/MainBar';
import PostCard from './main/PostCard';
import ScrollToTop from './components/ScrollToTop';


export default function App() {
  return (
    <>
     <ScrollToTop/>
      <Header />
      <Routes>
        
        <Route  path="/" element={<Main/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
       
        <Route path="/about" element={<About />} />
        <Route  element={<OnlyPrivateRoute />}>
       
        <Route path="/dashboard" element={<Dashboard/>} />
          
        </Route>
        <Route  element={<OnlyPrivateRoute />}>
       
      
          
        <Route  path="/main" element={<MainBar/>} />
        <Route path='/post/:postslug'  element={<PostCard/>}/>
        </Route>
      </Routes>
    </>
  );
}
