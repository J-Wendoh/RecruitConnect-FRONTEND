import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobListing.css';


const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/jobs');
        setJobs(response.data);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="job-listing-container">
      <h1>Job Listings</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="job-item">
              <h2>{job.title}</h2>
              <p>{job.company_name}</p>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <button onClick={() => handleApply(job.id)}>Apply Now</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
};


const handleApply = (jobId) => {

  console.log(`Applying for job ID: ${jobId}`);
};

export default JobListing;
