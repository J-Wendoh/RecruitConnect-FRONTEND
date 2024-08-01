import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Seekerlogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isLogin
        ? "http://127.0.0.1:5000/login"
        : "http://127.0.0.1:5000/register";
      const response = await axios.post(url, formData);
      
      if (isLogin) {
        // Save the JWT token in local storage or context
        localStorage.setItem("token", response.data.access_token);
        // Redirect to the home page
        navigate("/");
      } else {
        // Handle registration success if needed
        console.log(response.data);
        // Optionally redirect to login page or show a success message
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to login/register. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : isLogin ? "Login" : "Register"}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
};

export default Seekerlogin;
