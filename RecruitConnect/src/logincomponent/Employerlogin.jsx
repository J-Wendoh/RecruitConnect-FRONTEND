// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./EmployerLogin.css";

// const EmployerLogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && location.pathname !== "/employer-login") {
//       navigate("/"); // Redirect to home if token found and not on login page
//     }
//   }, [navigate, location.pathname]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/login",
//         formData
//       );
//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("username", response.data.username); // store the username in localStorage
//       localStorage.setItem("user_id", response.data.user_id); // store the user_id
//       localStorage.setItem("employer_id", response.data.employer_id); // store the employer_id
//       alert("Employer logged in successfully!");
//       navigate("/employer-dashboard"); // Redirect to EmployerDashboard
//     } catch (error) {
//       setError(
//         error.response?.data?.error || "Failed to login. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="employer-login-container">
//       <h2 className="employer-login-header">Employer Login</h2>
//       {error && <p className="employer-error-message">{error}</p>}
//       <form onSubmit={handleSubmit} className="employer-login-form">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="employer-login-input"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="employer-login-input"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="employer-login-button"
//         >
//           {loading ? "Submitting..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmployerLogin;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./EmployerLogin.css";

// const EmployerLogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && location.pathname !== "/employer-login") {
//       navigate("/"); // Redirect to home if token found and not on login page
//     }
//   }, [navigate, location.pathname]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/login",
//         formData
//       );
//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("username", response.data.username); // store the username in localStorage
//       localStorage.setItem("user_id", response.data.user_id); // store the user_id
//       localStorage.setItem("employer_id", response.data.employer_id); // store the employer_id
//       alert("Employer logged in successfully!");
//       navigate("/employer-dashboard"); // Redirect to EmployerDashboard
//     } catch (error) {
//       setError(
//         error.response?.data?.error || "Failed to login. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="employer-container">
//       <div className="left">
//         <div className="header">
//           <h2 className="animation a1">Welcome Back</h2>
//           <h4 className="animation a2">
//             Log in to your account using email and password
//           </h4>
//         </div>
//         <div className="form">
//           {error && <p className="employer-error-message">{error}</p>}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="employer-login-input animation a3"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="employer-login-input animation a4"
//           />
//           <p className="animation a5">
//             <a href="#">Forgot Password</a>
//           </p>
//           <button
//             type="submit"
//             disabled={loading}
//             className="employer-login-button animation a6"
//             onClick={handleSubmit}
//           >
//             {loading ? "Submitting..." : "Login"}
//           </button>
//         </div>
//       </div>
//       <div className="right"></div>
//     </div>
//   );
// };

// export default EmployerLogin;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Loginform.css";

const EmployerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname !== "/employer-login") {
      navigate("/"); // Redirect to home if token found and not on login page
    }
  }, [navigate, location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://recruitconnect-backend-mlpw.onrender.com/login",
        formData
      );
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username); // store the username in localStorage
      localStorage.setItem("user_id", response.data.user_id); // store the user_id
      localStorage.setItem("employer_id", response.data.employer_id); // store the employer_id
      alert("Employer logged in successfully!");
      navigate("/employer-dashboard"); // Redirect to EmployerDashboard
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className= "employer-login">
    <div className="employer-container">
      <div className="left">
        <div className="employer-header">
          <h2 className="employer-animation employer-a1">Welcome Back</h2>
          <h4 className="employer-animation employer-a2">
            Sign in to your account using email and password
          </h4>
        </div>
        <form className="employer-form" onSubmit={handleSubmit}>
          {error && (
            <p className="employer-error-message employer-animation employer-a3">
              {error}
            </p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="employer-input employer-animation employer-a3"
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="employer-input employer-animation employer-a4"
            />
          <p className="employer-animation employer-a5">
            <a href="#">Forgot Password</a>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="employer-button employer-animation employer-a6"
            >
            {loading ? "Submitting..." : "Log In"}
          </button>
        </form>
      </div>
      <div className="right"></div>
    </div>
            </div>
  );
};

export default EmployerLogin;

