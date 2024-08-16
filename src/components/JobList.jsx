import React, { useEffect, useState } from "react";
import JobCard from "./Jobcard"; // Fixed typo in the import statement
import "../joblist.css";
import SearchBar from "./Search"; // Fixed import statement for consistency

const Joblist = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://recruitconnect-backend-mlpw.onrender.com/jobs');
        
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("An error occurred while fetching jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBackClick = () => {
    setSelectedJob(null);
  };

  const handleSearch = ({ keywords, location, jobTitle }) => {
    const filtered = jobs.filter((job) => {
      const keywordMatch = keywords
        ? job.title.toLowerCase().includes(keywords.toLowerCase())
        : true;
      const locationMatch = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const titleMatch = jobTitle
        ? job.title.toLowerCase().includes(jobTitle.toLowerCase())
        : true;
      return keywordMatch && locationMatch && titleMatch;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="joblist-container">
      <div className="background-3d">
        <div className="gradient-sphere"></div>
        <div className="floating-particles"></div>
      </div>
      <div className="content-wrapper">
        <SearchBar onSearch={handleSearch} />
        <div className="job-list">
          {loading && <p>Loading jobs...</p>}
          {error && <p>{error}</p>}
          {selectedJob ? (
            <div className="job-details">
              <button onClick={handleBackClick}>Back to job list</button>
              <JobCard job={selectedJob} detailed />
            </div>
          ) : filteredJobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => handleJobClick(job)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Joblist;
