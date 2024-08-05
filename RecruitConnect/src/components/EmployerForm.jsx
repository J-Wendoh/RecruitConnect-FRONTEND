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
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'job_openings') {
      const index = e.target.dataset.index;
      const updatedArray = [...formData[name]];
      updatedArray[index] = value;
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (e, name) => {
    const index = e.target.dataset.index;
    const updatedArray = [...formData[name]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [name]: updatedArray });
  };

  const addArrayField = (name) => {
    setFormData({ ...formData, [name]: [...formData[name], ''] });
  };

  const removeArrayField = (name, index) => {
    const updatedArray = formData[name].filter((_, i) => i !== index);
    setFormData({ ...formData, [name]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { company_name, contact_email } = formData;
    if (!company_name || !contact_email) {
      setMessage('Company Name and Contact Email are required.');
      return;
    }

    const token = getToken();
    if (!token || token.split('.').length !== 3) {
      setMessage('Invalid token format. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/employers/<employer_id>',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Employer added successfully!');
      setFormData({
        company_name: '',
        contact_email: '',
        company_culture: '',
        job_openings: [''],
        address: '',
        phone_number: '',
      });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'There was a server error adding the employer.');
      } else if (error.request) {
        setMessage('No response from the server.');
      } else {
        setMessage('Error setting up the request.');
      }
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
