import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import JobCard from '../components/Jobcard'; // Ensure correct path
import './SavedJobs.css';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://127.0.0.1:5000/savedjobs', {
          headers: {
            'Authorization': `Bearer ${token}` // Correct template literal syntax
          }
        });

        setSavedJobs(response.data.saved_jobs || []); // Ensure there's a default empty array
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
        setError('An error occurred while fetching saved jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleSaveJob = async (job) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post('http://127.0.0.1:5000/savejob', job, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // After saving the job, redirect to /savedjobs
      navigate('/savedjobs');
    } catch (error) {
      console.error('Error saving job:', error);
      setError('An error occurred while saving the job. Please try again later.');
    }
  };

  return (
    <div className="saved-jobs-container">
      <h2>Saved Jobs</h2>
      {loading && <p>Loading saved jobs...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="job-list">
        {savedJobs.length > 0 ? (
          savedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              detailed={true} 
              onSave={() => handleSaveJob(job)} // Add onSave handler
            />
          ))
        ) : (
          <p>No saved jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
