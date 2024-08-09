import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobListing.css';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobId, setAppliedJobId] = useState(null);

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

  const handleApply = (jobId) => {
    setAppliedJobId(jobId);

    // Simulating an API request to apply for a job
    axios.post(`http://127.0.0.1:5000/jobs/${jobId}/apply`)
      .then((response) => {
        alert(`Successfully applied for job ID: ${jobId}`);
      })
      .catch((err) => {
        alert('Failed to apply for the job.');
        console.error(err);
      })
      .finally(() => {
        setAppliedJobId(null);
      });
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="job-listing-container">
      <h1>Explore Job Opportunities</h1>
      {jobs.length > 0 ? (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-item">
              <div className="job-info">
                <h2>{job.title}</h2>
                <p className="company-name">{job.company_name}</p>
                <p className="location">{job.location}</p>
                <p className="description">{job.description}</p>
              </div>
              <button 
                className="apply-button" 
                onClick={() => handleApply(job.id)}
                disabled={appliedJobId === job.id}
              >
                {appliedJobId === job.id ? 'Applying...' : 'Apply Now'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-jobs-message">No job listings available at the moment.</p>
      )}
    </div>
  );
};

export default JobListing;
