import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Joblist from './components/Joblist';
import Footer from './components/Footer';
import Employerlogin from './components/Employerlogin';
import Seekerlogin from './components/Seekerlogin';
import EmployerForm from './components/EmployerForm';

import './App.css';


const App = () => {
  return (
    
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/joblist" element={<Joblist />} />
          <Route path="/employer-login" element={<Employerlogin />} />
          <Route path="/employer-signup" element={<Employerlogin />} />
          <Route path="/seeker-signup" element={<Seekerlogin />} />
          <Route path="/seeker-login" element={<Seekerlogin />} />
          <Route path="/employerform" element={<EmployerForm />} />
          
          
        </Routes>
        <Footer />
      </div>
    
  );
};

export default App;
