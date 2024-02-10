import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import About from './components/About';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
