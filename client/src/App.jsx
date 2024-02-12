import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import About from './components/About';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import OnlyPrivateRoute from './components/OnlyPrivateRoute';

import Home from './components/Home';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        
        <Route  path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route  element={<OnlyPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard/>} />
          
        </Route>
      </Routes>
    </>
  );
}
