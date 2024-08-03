import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" // Default role
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setFormData(prevState => ({
        ...prevState,
        password: "",
        confirmPassword: ""
      }));
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/register", formData);
      alert("Registration successful! Redirecting to login page.");
      // Redirect based on user role
      if (formData.role === "user") {
        navigate("/seeker-login");
      } else if (formData.role === "employer") {
        navigate("/employer-login");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      {error && <p className="register-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="register-input"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="register-input"
        >
          <option value="user">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" disabled={loading} className="register-button">
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
