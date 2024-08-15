// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Joblist from './components/JobList';
import EmployerDashboard from './components/EmployerDashboard';
import ApplyJob from './seekercomponents/ApplyJob';
import Logout from './components/Logout';
import { useAuth } from './components/AuthContext';
import EmployerLogin from './logincomponent/Employerlogin';
import SeekerLogin from './logincomponent/Seekerlogin';
import Register from './logincomponent/Register';
import JobSeeker from './seekercomponents/JobSeeker';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfService from './pages/terms';
import PrivacyPolicy from './pages/Policy';
import JobPostingForm from './components/JobPostingForm';
import JobPostingDetails from './components/JobPostingDetails';
import JobPostingEdit from './components/JobPostingEditForm';
import JobPostingList from './components/JobPostingList';
import ForgotPassword from './logincomponent/ForgotPassword';
import JobListings from './components/JobListings';
import Chat from './chat/Chat';
import UserSearch from './chat/UseSearch';
import ChatButton from './chat/FloatingChatButton';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/joblist" element={<Joblist />} />
          <Route path="/employer-login" element={<EmployerLogin />} />
          <Route path="/employer-signup" element={<EmployerLogin />} />
          <Route path="/seeker-signup" element={<SeekerLogin />} />
          <Route path="/seeker-login" element={<SeekerLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobseeker/*" element={<JobSeeker />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/jobposting" element={<JobPostingForm />} />
          <Route path="/jobposting/:id" element={<JobPostingDetails />} />
          <Route path="/jobposting/edit/:id" element={<JobPostingEdit />} />
          <Route path="/jobposting/list" element={<JobPostingList />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          {isAuthenticated && <Route path="/logout" element={<Logout />} />}
          <Route path="/apply-job/:jobId" element={<ApplyJob />} />
          <Route path="/joblistings" element={<JobListings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/user-search" element={<UserSearch />} />
        </Routes>
        <Footer />
        {isAuthenticated && <ChatButton />} {/* Show ChatButton only if authenticated */}
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
