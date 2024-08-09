import React, { useState, useEffect } from 'react';
import axios from 'axios';


const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your backend API URL
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/job');
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

// This function handles the job application process
const handleApply = (jobId) => {
  // Implement your job application logic here
  console.log(`Applying for job ID: ${jobId}`);
};

export default JobListing;
