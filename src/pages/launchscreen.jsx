import React from 'react';
import '../assets/styles/loader.css'; // Ensure this path points to where your CSS file is located
import logo from '../assets/images/workiy-logo-blacklogo.png'; // Adjust the path to your logo image

const Loader = () => {
  return (
    <div style={{ height: '100vh', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="loader-container">
        <img src={logo} alt="Logo" style={{marginBottom:'10px',height:'50px',opacity:'50%'}} />
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
