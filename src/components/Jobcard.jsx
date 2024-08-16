import React, { useState } from 'react';
import '../jobcard.css';
import { FaSave, FaArrowRight } from 'react-icons/fa'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
const JobCard = ({ job, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleSave = (e) => {
    e.stopPropagation(); 
    fetch('https://recruitconnect-backend-mlpw.onrender.com/savejob', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({ job_id: job.id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Job saved:', data);
        toast.success('Job saved successfully! 🎉'); 
        navigate('/jobseeker/savedjobs')

        
      })
      .catch(error => {
        console.error('Error saving job:', error);
        toast.error('Error saving job. Please try again. 😔'); // Show error toast if saving fails
      });
  };

  const handleApply = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    window.location.href = `/apply-job/${job.id}`;
  };

  return (
    <div 
      className={`job-card ${expanded ? 'expanded' : ''}`} 
      onClick={() => setExpanded(!expanded)}
    >
      <h2>{job.title}</h2>
      <p><strong>Company Email:</strong> {job.company_email}</p>
      <p><strong>Location:</strong> {job.location}</p>
      {expanded && (
        <>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Benefits:</strong> {job.benefits}</p>
          <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
          <p><strong>Posted at:</strong> {new Date(job.posted_at).toLocaleString()}</p>
        </>
      )}
      <div className="job-card-buttons">
        <button className="save-button" onClick={handleSave}>
          <FaSave /> Save
        </button>
        <button className="apply-button" onClick={handleApply}>
          <FaArrowRight /> Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;