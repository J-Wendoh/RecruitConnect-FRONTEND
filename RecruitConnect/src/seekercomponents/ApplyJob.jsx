import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('resume', formData.resume);
    formDataToSend.append('cover_letter', formData.coverLetter); 
    formDataToSend.append('job_id', jobId); 
  
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('http://127.0.0.1:5000/applications', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token here
          // Do not set 'Content-Type' for FormData
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
  
      alert('Application submitted successfully!');
      navigate('/joblist'); // Redirect back to job list
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting your application. Please try again.');
    }
  };

  return (
    <div className="apply-job-form">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>

        <div>
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
