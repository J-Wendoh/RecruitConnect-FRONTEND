import React, { useState } from 'react';


const EmployerForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_email: '',
    address: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/employers', formData);
      console.log('Employer added:', response.data);
      // Reset the form
      setFormData({
        company_name: '',
        contact_email: '',
        address: '',
        phone_number: '',
      });
    } catch (error) {
      console.error('There was an error adding the employer:', error);
    }
  };

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
    </form>
  );
};

export default EmployerForm;
