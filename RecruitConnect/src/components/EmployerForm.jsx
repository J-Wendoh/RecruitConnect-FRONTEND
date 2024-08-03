import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployerForm.css'; 

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_email: '',
    company_culture: '',
    job_openings: [''],
    address: '',
    phone_number: '',
    feedback_received: ['']
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    return token;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'job_openings' || name === 'feedback_received') {
      const index = e.target.dataset.index;
      const updatedArray = [...formData[name]];
      updatedArray[index] = value;
      setFormData({
        ...formData,
        [name]: updatedArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (e, name) => {
    const index = e.target.dataset.index;
    const updatedArray = [...formData[name]];
    updatedArray[index] = e.target.value;
    setFormData({
      ...formData,
      [name]: updatedArray,
    });
  };

  const addArrayField = (name) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], ''],
    });
  };

  const removeArrayField = (name, index) => {
    const updatedArray = formData[name].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [name]: updatedArray,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token || token.split('.').length !== 3) {
      setMessage('Invalid token format. Please log in again.');
      console.error('Invalid token format:', token);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/employers',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Employer added:', response.data);
      setMessage('Employer added successfully!');
      
      setFormData({
        company_name: '',
        contact_email: '',
        company_culture: '',
        job_openings: [''],
        address: '',
        phone_number: '',
        feedback_received: ['']
      });
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setMessage('There was a server error adding the employer.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setMessage('No response from the server.');
      } else {
        console.error('Error setting up the request:', error.message);
        setMessage('Error setting up the request.');
      }
      console.error('Error config:', error.config);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setMessage('You are not logged in. Please log in to continue.');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="company_name">Company Name:</label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="contact_email">Contact Email:</label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="company_culture">Company Culture:</label>
        <input
          type="text"
          id="company_culture"
          name="company_culture"
          value={formData.company_culture}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="job_openings">Job Openings:</label>
        {formData.job_openings.map((job, index) => (
          <div key={index}>
            <input
              type="text"
              name="job_openings"
              data-index={index}
              value={job}
              onChange={(e) => handleArrayChange(e, 'job_openings')}
            />
            {formData.job_openings.length > 1 && (
              <button type="button" onClick={() => removeArrayField('job_openings', index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('job_openings')}>
          Add Job Opening
        </button>
      </div>
      <div>
        <label htmlFor="feedback_received">Feedback Received:</label>
        {formData.feedback_received.map((feedback, index) => (
          <div key={index}>
            <input
              type="text"
              name="feedback_received"
              data-index={index}
              value={feedback}
              onChange={(e) => handleArrayChange(e, 'feedback_received')}
            />
            {formData.feedback_received.length > 1 && (
              <button type="button" onClick={() => removeArrayField('feedback_received', index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayField('feedback_received')}>
          Add Feedback
        </button>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Employer'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmployerForm;
