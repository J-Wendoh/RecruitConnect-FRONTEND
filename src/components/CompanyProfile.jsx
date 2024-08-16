import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../CompanyProfile.css";

// Mock data
const mockCompanyProfile = {
  name: "Tech Innovations Inc.",
  address: "123 Tech Lane, Silicon Valley, CA",
  contact_email: "contact@techinnovations.com",
  phone_number: "(123) 456-7890",
  company_culture: "We thrive on innovation and creativity. Our culture promotes continuous learning and growth.",
  job_openings: "Software Engineer, Product Manager, UX Designer",
  picture_url: "https://via.placeholder.com/150"
};

const CompanyProfile = ({ employer_id, token, onProfileUpdate }) => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        // Simulating API call
        console.log(`Fetching company profile for employer_id: ${employer_id}`);
        const response = { data: mockCompanyProfile };
        console.log("API Response:", response.data);
        setCompanyProfile(response.data);
        setUpdatedProfile(response.data);

        if (onProfileUpdate) {
          onProfileUpdate(response.data);
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
        setError("Error fetching company profile");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [employer_id, token, onProfileUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating API call
      console.log("Updating company profile with:", updatedProfile);
      const response = { data: updatedProfile };

      console.log("Update Response:", response.data);

      if (response.data) {
        setCompanyProfile(response.data);
        setUpdatedProfile(response.data);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      } else {
        console.error("Unexpected response structure:", response.data);
        setError("Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
      setError("Error updating company profile");
    }
  };

  if (loading) return <div className="cp-container cp-loading">Loading...</div>;
  if (error) return <div className="cp-container cp-error">Error: {error}</div>;

  if (!companyProfile) {
    return <div className="cp-container">No company profile data available.</div>;
  }

  return (
    <div className="cp-container">
      {successMessage && <div className="cp-success-message">{successMessage}</div>}
      {companyProfile.picture_url && (
        <img
          src={companyProfile.picture_url}
          alt={`${companyProfile.name} logo`}
          className="cp-logo"
        />
      )}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="cp-form">
          <div className="cp-details">
            <p>
              <strong>Company Name:</strong>
              <input
                type="text"
                name="name"
                value={updatedProfile.name || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Company Address:</strong>
              <input
                type="text"
                name="address"
                value={updatedProfile.address || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Contact Email:</strong>
              <input
                type="email"
                name="contact_email"
                value={updatedProfile.contact_email || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Phone Number:</strong>
              <input
                type="text"
                name="phone_number"
                value={updatedProfile.phone_number || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Company Culture:</strong>
              <textarea
                name="company_culture"
                value={updatedProfile.company_culture || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Job Openings:</strong>
              <input
                type="text"
                name="job_openings"
                value={updatedProfile.job_openings || ""}
                onChange={handleInputChange}
              />
            </p>
            <button type="submit" className="cp-button">Save Changes</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cp-button cp-button-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="cp-details">
          <p>
            <strong>Company Name:</strong> {companyProfile.name}
          </p>
          <p>
            <strong>Company Address:</strong> {companyProfile.address}
          </p>
          <p>
            <strong>Contact Email:</strong>
            <a href={`mailto:${companyProfile.contact_email}`}>
              {companyProfile.contact_email}
            </a>
          </p>
          <p>
            <strong>Phone Number:</strong> {companyProfile.phone_number}
          </p>
          <p>
            <strong>Company Culture:</strong> {companyProfile.company_culture}
          </p>
          <p>
            <strong>Job Openings:</strong> {companyProfile.job_openings}
          </p>
          <button onClick={() => setIsEditing(true)} className="cp-button">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile
