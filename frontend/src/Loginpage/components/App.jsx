import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from './Login';
import Home from '../../Homepage/components_Homepage/Home';
import Signin from './Signin';
import '../../Councilspage/styles_Councilspage/styles_councilspage.css'
import Logo_main from '../../Homepage/components_Homepage/Logo_main';
import ForgotPassword from './Forgot_password';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedroute';
import Change_password from './Change_password';
import Home_admin from '../../Homepage/components_Homepage/Home_admin';
import AdminRoute from './AdminRoute';
import Login_admin from './Login_admin';
import EventCreationForm from '../../../src2/components/EventCreate';
import CouncilList from "../../../src2/components/CouncilList";
import CouncilDetails from "../../../src2/components/CouncilDetails";
import CouncilClubs from "../../../src2/components/CouncilClubs";
import FestDetails from "../../../src2/components/FestDetails";
import CellList from "../../../src2/components/CellList"
import CellDetails from "../../../src2/components/CellDetails"
import FestList from "../../../src2/components/FestList";
import EventDetails from "../../../src2/components/EventDetails";
import EventUpdateForm from '../../../src2/components/EventUpdate';
import ClubDetails from '../../../src2/components/ClubDetails';
import { AllEvents } from '../../../src2/components/AllEvents.jsx';
import Favourites from '../../../src2/components/Favourites.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
    }
  }
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login-admin" element={<Login_admin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/change-password" element={<Change_password />} />
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

          <Route path="/events" element={
            <AllEvents />
          } />

          <Route path="/create-event" element={<EventCreationForm />} />
          <Route path="/update-event" element={<EventUpdateForm />} />
          <Route path="/cells" element={<CellList />} />
          <Route path="/fests" element={<FestList />} />
          <Route path="/cells/:id" element={<CellDetails />} />
          <Route path="/councils/:id" element={<CouncilDetails />} />
          <Route path="/fests/:tag" element={<FestDetails />} />
          <Route path="/councils/clubs/:tag" element={<CouncilClubs />} />
          <Route path="/councils/clubs/:tag/:id" element={<ClubDetails />} />
          <Route path="/councils" element={<CouncilList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
