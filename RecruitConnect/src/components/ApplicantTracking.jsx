
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApplicantTracking() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {

    axios.get('/api/applicants')
      .then(response => setApplicants(response.data))
      .catch(error => console.error('Error fetching applicants:', error));
  }, []);

  return (
    <div className="applicant-tracking">
      <h2>Applicants</h2>
      <ul>
        {applicants.map(applicant => (
          <li key={applicant.id}>
            <h3>{applicant.name}</h3>
            <p>{applicant.email}</p>
            <p>Status: {applicant.status}</p>
            <button>Update Status</button>
            <button>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicantTracking;
