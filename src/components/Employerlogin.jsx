import React, { useState } from "react";
import axios from "axios";

const Employerlogin = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    company_name: "",
    contact_email: "",
    address: "",
    phone_number: ""
  });

  // State to manage error messages
  const [error, setError] = useState("");

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // State to manage JWT token
  const [jwtToken, setJwtToken] = useState(""); // Ensure token is securely handled

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Make a POST request to the backend with form data and JWT token
      const response = await axios.post("http://127.0.0.1:5000/employers", formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}` // Add JWT token to headers
        }
      });
      
      console.log(response.data);
      // Handle successful employer addition
      alert("Employer added successfully!");
    } catch (error) {
      // Handle errors
      setError(error.response?.data?.error || "Failed to add employer. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Employer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="contact_email"
          placeholder="Contact Email"
          value={formData.contact_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Employer"}
        </button>
      </form>
    </div>
  );
};

export default Employerlogin;
