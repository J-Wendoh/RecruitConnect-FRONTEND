import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './JobListing.css';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    companyEmail: '',
    employerId: ''
  });

  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate(); 

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple form validation
    const errors = {};
    if (!form.title) errors.title = 'Title is required';
    if (!form.description) errors.description = 'Description is required';
    if (!form.location) errors.location = 'Location is required';
    if (!form.companyEmail) errors.companyEmail = 'Company Email is required';
    if (!form.employerId) errors.employerId = 'Employer ID is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/jobs', form);
      setJobs([...jobs, form]); 
      setForm({
        title: '',
        description: '',
        location: '',
        companyEmail: '',
        employerId: ''
      }); // Clear form
    } catch (err) {
      setError('Failed to create job listing');
    }
  };

  const handleApply = (jobId) => {
    console.log(`Applying for job ID: ${jobId}`);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="job-listing-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button> {/* Back button */}

      <h1>Explore Job Opportunities</h1>
      
      <form onSubmit={handleSubmit} className="job-form">
        <h2>Add New Job Listing</h2>
        <div className="form-group">
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
          />
          {formErrors.description && <p className="error">{formErrors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleInputChange}
          />
          {formErrors.location && <p className="error">{formErrors.location}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="companyEmail">Company Email:</label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={form.companyEmail}
            onChange={handleInputChange}
          />
          {formErrors.companyEmail && <p className="error">{formErrors.companyEmail}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="employerId">Employer ID:</label>
          <input
            type="text"
            id="employerId"
            name="employerId"
            value={form.employerId}
            onChange={handleInputChange}
          />
          {formErrors.employerId && <p className="error">{formErrors.employerId}</p>}
        </div>

        <button type="submit" className="submit-button">Submit Job Listing</button>
      </form>

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
              <button className="apply-button" onClick={() => handleApply(job.id)}>
                Apply Now
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