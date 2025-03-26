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
import Change_password from './Change_password';
import CouncilDetails from '../../Councilspage/components_Councilspage/CouncilDetails';
import CouncilList from '../../Councilspage/components_Councilspage/CouncilList';
import Home_admin from '../../Homepage/components_Homepage/Home_admin';
import AdminRoute from './AdminRoute';
import Login_admin from './Login_admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login-admin" element={<Login_admin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/councildetails" element={<CouncilDetails />} />
        <Route path="/councillist" element={<CouncilList />} />
        <Route path="/edit-profile" element={<Change_password />} />
        <Route path="/home" element={
          <Home />
        } />
        <Route path="/home-admin" element={
          <AdminRoute>
            <Home_admin />
          </AdminRoute>
        } />
        <Route path="/dashboard" element={
          <Dashboard />
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
