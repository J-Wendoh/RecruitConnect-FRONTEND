import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Loginform.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOtpExpired(false);

    try {
      await axios.post("http://127.0.0.1:5000/request_reset_password", { email });
      setStep(2); 
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post("http://127.0.0.1:5000/verify_otp", { email, otp });

      if (response.data.message === "OTP is valid") {
        setStep(3); 
      } else if (response.data.request_new_otp) {
        setOtpExpired(true);
        setError(response.data.message);
      } else {
        setError(response.data.error || "Failed to verify OTP. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestNewOtp = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post("http://127.0.0.1:5000/request_new_otp", { email });
      setOtpExpired(false);
      setError('New OTP has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.error || "Failed to request new OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/reset_password", {
        email,
        otp,
        new_password: newPassword
      });

      if (response.data.message === 'Password reset successfully') {
        const roleResponse = await axios.post("http://127.0.0.1:5000/get_user_role_by_email", { email });
        const userRole = roleResponse.data.role;

        if (userRole === 'employer') {
          navigate("/employer-login");
        } else if (userRole === 'user') {
          navigate("/seeker-login");
        } else {
          navigate("/"); 
        }
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      {step === 1 && (
        <form onSubmit={handleRequestOtp} className="forgot-password-form">
          <h2>Forgot Password</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="forgot-password-form">
          <h2>Verify OTP</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="input"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
          {otpExpired && (
            <p>
              Did time run out? 
              <button onClick={handleRequestNewOtp} disabled={loading}>
                Request a new OTP
              </button>
            </p>
          )}
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="forgot-password-form">
          <h2>Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            required
            className="input"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            className="input"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
