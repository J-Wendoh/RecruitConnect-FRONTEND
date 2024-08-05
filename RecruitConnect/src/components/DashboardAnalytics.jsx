
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardAnalytics() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    
    axios.get('/api/analytics')
      .then(response => setAnalytics(response.data))
      .catch(error => console.error('Error fetching analytics:', error));
  }, []);

  return (
    <div className="dashboard-analytics">
      <h2>Analytics</h2>
      <div>
        <h3>Job Postings Performance</h3>
        <p>Views: {analytics.views}</p>
        <p>Applications: {analytics.applications}</p>
        <p>Time to Fill: {analytics.timeToFill}</p>
      </div>
      <div>
        <h3>Applicant Insights</h3>
        <p>Applicants: {analytics.applicants}</p>
        <p>Time to Hire: {analytics.timeToHire}</p>
        <p>Source of Applicants: {analytics.source}</p>
      </div>
    </div>
  );
}

export default DashboardAnalytics;
