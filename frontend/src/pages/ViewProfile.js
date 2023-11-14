import React from 'react';
import Dashboard from './PatientDashboard';
import { Link } from 'react-router-dom';


const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
  };

  
  const buttonStyle = {
    margin: '10px',
  };
export default function Profile() {
  return (
    <div style={centerStyle}>
      <h1>My Profile</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/linkfammember/3">
          <button>Link Family Member</button>
        </Link>
        <Link to="/linkpatasfam/3">
          <button>Link Patient as Family Member</button>
        </Link>
        <Link to="/viewfammembers/3">
          <button>View Registered Family Members</button>
        </Link>
        <Link to="/viewhealthrecpat/3">
          <button>View Health Records</button>
        </Link>
        <Link to="/viewHealthPackageSubscription">
          <button>View Health Package Subscription</button>
        </Link>
        <Link to="/cancelHealthPackageSubscription">
          <button>Cancel Health Package Subscription</button>
        </Link>
       
      </div>

      
    </div>
  );
}
