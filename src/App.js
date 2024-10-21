import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Peronboarding from './pages/pre-onboarding';
import Login from './pages/login';
import EmployeeManage from './pages/emp-manage';
import AddEmployee from './pages/add-emp';
import EmployeeView from './pages/emp-view';
import HRHome from './pages/hr-dashboard';
import Dashboard from './pages/dashboard';
import Forgot from './pages/forget';
import LaunchScreen from './pages/launchscreen';
import Info from './pages/info';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
  
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  return (
    <Router>
      <div>
        {isLoading ? (
          <LaunchScreen />
        ) : (
          <Routes>
            <Route path="/Preonboarding" element={<Peronboarding />} />
            <Route path="/info" element={<Info />} />    
            <Route
          path="/"
          element={user ? <HRHome user={user} /> : <Login onLogin={handleLogin} />}
        />
        
            <Route path="/dashboard" element={<Dashboard  user={user}/>} />      
            <Route path="/employee-view" element={<EmployeeView />} />   
            <Route path="/add-employee" element={<AddEmployee />} />   
            <Route path="/manage-employee" element={<EmployeeManage />} />  
            <Route path="/home" element={<HRHome user={user} />} />
            <Route path="/forgot-password" element={<Forgot />} />  
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
