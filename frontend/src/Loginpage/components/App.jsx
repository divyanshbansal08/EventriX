import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './Login';
import Home from '../../Homepage/components_Homepage/Home';
import Signin from './Signin';
import Councilspage from '../../Councilspage/components_Councilspage/Councilspage';
import '../../Councilspage/styles_Councilspage/styles_councilspage.css'
import Logo_main from '../../Homepage/components_Homepage/Logo_main';
import ForgotPassword from './Forgot_password';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedroute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/councils" element={
          <ProtectedRoute>
            <Councilspage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
