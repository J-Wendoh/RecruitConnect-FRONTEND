<<<<<<< HEAD
import React, { useState } from "react";
import "../jobcard.css";
import { FaSave, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const JobCard = ({ job, onClick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleSave = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    // Add logic to save the job
    fetch("http://127.0.0.1:5000/savejob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobId: job.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Job saved:", data);
        toast.success("Job saved successfully! 🎉");
      })
      .catch((error) => {
        console.error("Error saving job:", error);
        toast.error("Error saving job. Please try again. 😔");
      });
=======
import React from 'react';
import '../jobcard.css';
import { FaSave, FaArrowRight } from 'react-icons/fa'; 
import axios from 'axios';

const JobCard = ({ job, onClick, detailed }) => {
  const handleSave = async (event) => {
    event.stopPropagation(); 

    const token = localStorage.getItem("token"); 
    if (!token) {
      console.error('No access token found');
      alert('Please log in to save jobs.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/savejob',
        { job_id: job.id },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Job saved:', response.data);
    } catch (error) {
      console.error('Error saving job:', error.response ? error.response.data : error.message);
    }
>>>>>>> main
  };

  const handleApply = (e) => {
    e.stopPropagation();
    window.location.href = `/apply-job/${job.id}`;
  };

  return (
    <div
      className={`job-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <h2 className="card-title">{job.title}</h2>
      <p className="small-desc">
        <strong>Company Email:</strong> {job.company_email}
      </p>
      <p className="small-desc">
        <strong>Location:</strong> {job.location}
      </p>
      {expanded && (
        <>
          <p className="small-desc">
            <strong>Description:</strong> {job.description}
          </p>
          <p className="small-desc">
            <strong>Benefits:</strong> {job.benefits}
          </p>
          <p className="small-desc">
            <strong>Responsibilities:</strong> {job.responsibilities}
          </p>
          <p className="small-desc">
            <strong>Posted at:</strong>{" "}
            {new Date(job.posted_at).toLocaleString()}
          </p>
        </>
      )}
      <div className="job-card-buttons">
        <button className="save-button" onClick={handleSave}>
          <FaSave /> Save
        </button>
        <button className="apply-button" onClick={handleApply}>
          <FaArrowRight /> Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;

