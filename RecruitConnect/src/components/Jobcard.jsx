
import React from 'react';
import '../jobcard.css';
import { FaSave, FaArrowRight } from 'react-icons/fa'; 
import axios from 'axios';

const JobCard = ({ job, onClick, detailed }) => {
  const handleSave = async (event) => {
    event.stopPropagation(); 

    const token = localStorage.getItem("token"); 
    if (!token) {
      console.error('No access token found');
      alert('Please log in to save jobs.');
      return;
    }

    try {
      const response = await axios.post(
        'https://recruitconnect-backend-mlpw.onrender.com/savejob',
        { job_id: job.id },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Job saved:', response.data);
    } catch (error) {
      console.error('Error saving job:', error.response ? error.response.data : error.message);
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    window.location.href = `/apply-job/${job.id}`;
  };

  return (
    <div
      className={`job-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <h2 className="card-title">{job.title}</h2>
      <p className="small-desc">
        <strong>Company Email:</strong> {job.company_email}
      </p>
      <p className="small-desc">
        <strong>Location:</strong> {job.location}
      </p>
      {expanded && (
        <>
          <p className="small-desc">
            <strong>Description:</strong> {job.description}
          </p>
          <p className="small-desc">
            <strong>Benefits:</strong> {job.benefits}
          </p>
          <p className="small-desc">
            <strong>Responsibilities:</strong> {job.responsibilities}
          </p>
          <p className="small-desc">
            <strong>Posted at:</strong>{" "}
            {new Date(job.posted_at).toLocaleString()}
          </p>
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

