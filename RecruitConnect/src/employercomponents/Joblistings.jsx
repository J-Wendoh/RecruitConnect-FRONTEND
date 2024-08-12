import React, { useEffect, useState } from 'react';
import './joblistings.css'; 
import { useAuth } from '../hooks/useAuth'; // Custom hook for authentication

const Joblistings = ({ employerId }) => {
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth(); // Assuming useAuth provides the JWT token

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/jobs/${employerId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.jobs) {
          setJobs(data.jobs);
        } else {
          console.error('No jobs found or an error occurred.');
        }
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, [employerId, token]);

  return (
    <div className="job-list">
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <p className="job-description">{job.description}</p>
            <p className="job-location">Location: {job.location}</p>
            <p className="job-company-email">Company Email: {job.company_email}</p>
            <p className="job-employer-id">Employer ID: {job.employer_id}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Joblistings;
