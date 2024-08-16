// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Loginform.css";

// const Seekerlogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const checkUserProfile = useCallback(() => {
//     const token = localStorage.getItem("token");
//     if (token && location.pathname !== "/seeker-login") {
//       navigate("/");
//     }
//   }, [navigate, location.pathname]);

//   useEffect(() => {
//     checkUserProfile();
//   }, [checkUserProfile]);

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
//       toast.success("Seeker logged in successfully!");
//       navigate("/jobseeker");
//     } catch (error) {
//       setError(
//         error.response?.data?.error || "Failed to login. Please try again."
//       );
//       toast.error(
//         error.response?.data?.error || "Failed to login. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="login-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="login-header">Seeker Login</h2>
//       {error && <p className="error-message">{error}</p>}
//       <motion.form
//         onSubmit={handleSubmit}
//         className="login-form"
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <motion.input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="login-input"
//           whileFocus={{ scale: 1.05 }}
//           transition={{ duration: 0.2 }}
//         />
//         <motion.input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="login-input"
//           whileFocus={{ scale: 1.05 }}
//           transition={{ duration: 0.2 }}
//         />
//         <motion.button
//           type="submit"
//           disabled={loading}
//           className="login-button"
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {loading ? "Submitting..." : "Login"}
//         </motion.button>
//       </motion.form>
//       <Link to="/forgot-password" className="forgot-password-link">
//         Forgot password?
//       </Link>
//     </motion.div>
//   );
// };

// export default Seekerlogin;







// import React, { useState } from "react";
// import "./Loginform.css"; // Assuming your CSS is in a file called SeekerLogin.css

// const SeekerLogin = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your login logic here
//   };

//   return (
//     <div className="seeker-container">
//       <div className="seeker-header">
//         <h2 className="seeker-animation seeker-a1">Welcome Back</h2>
//         <h4 className="seeker-animation seeker-a2">
//           Log in to your account using email and password
//         </h4>
//       </div>
//       <div className="seeker-form" onSubmit={handleSubmit}>
//         {error && (
//           <p className="seeker-error-message seeker-animation seeker-a3">
//             {error}
//           </p>
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="seeker-input seeker-animation seeker-a3"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="seeker-input seeker-animation seeker-a4"
//         />
//         <p className="seeker-animation seeker-a5">
//           <a href="#">Forgot Password</a>
//         </p>
//         <button
//           type="submit"
//           className="seeker-button seeker-animation seeker-a6"
//         >
//           Log In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SeekerLogin;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Seekerlogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUserProfile = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname !== "/seeker-login") {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    checkUserProfile();
  }, [checkUserProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        formData
      );
      localStorage.setItem("token", response.data.access_token);
      toast.success("Seeker logged in successfully!");
      navigate("/jobseeker");
    } catch (error) {
      setError(
        error.response?.data?.error || "Failed to login. Please try again."
      );
      toast.error(
        error.response?.data?.error || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="seeker-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="seeker-container">
        <div className="left">
          <div className="seeker-header">
            <h2>Welcome Back</h2>
            <h4>Sign in to your account using email and password</h4>
          </div>
          <form onSubmit={handleSubmit} className="seeker-form">
            {error && <p className="seeker-error-message">{error}</p>}
            <motion.input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="seeker-input"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <motion.input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="seeker-input"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <motion.button
              type="submit"
              disabled={loading}
              className="seeker-button"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? "Submitting..." : "Log In"}
            </motion.button>
          </form>
        </div>
        <div className="right" />
      </div>
    </motion.div>
  );
};

export default Seekerlogin;
