import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_email: '',
    address: '',
    phone_number: '',
  });

  const [message, setMessage] = useState('');

  // Function to get the token, modify this according to how you store your token
  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging line
    return token;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      // Reset the form
      setFormData({
        company_name: '',
        contact_email: '',
        address: '',
        phone_number: '',
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
  };

  // Check token on component mount
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
      <button type="submit">Add Employer</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmployerForm;
