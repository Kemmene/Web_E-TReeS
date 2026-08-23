import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { DashboardPage } from './pages/Dashboard/Dashboard';
import { AgenciesPage as Agencies } from "./pages/Agencies/Agencies";
import { CreateAgencyPage } from './pages/Agencies/CreateAgency';
import Cities from './pages/Cities/Cities';
import RoutesPage from './pages/Routes/Routes';
import CreateRoutePage from './pages/Routes/CreateRoute';
import Trips from './pages/Trips/Trips';
import { CreateTripPage } from './pages/Trips/CreateTrip';
import { BulkActionsPage } from './pages/Trips/BulkActionsPage';
import Bookings from './pages/Bookings/Bookings';
import { BookingDetailsPage } from './pages/Bookings/BookingDetailsPage';
import Slips from './pages/Slips/Slips';
import Buses from './pages/Buses/Buses';
import Drivers from './pages/Drivers/Drivers';
import Users from './pages/Users/Users';
import Team from "./pages/Teams/Team";
import { TransactionsPage } from './pages/Transactions/Transactions';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-surface-bg">
        <Sidebar />
        <div className="flex-1 ml-[260px]">
          <Header />
          <main className="pt-20 px-8 pb-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/agencies/create" element={<CreateAgencyPage />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/create" element={<CreateTripPage />} />
              <Route path="/trips/bulk" element={<BulkActionsPage />} />
              <Route path="/routes/create" element={<CreateRoutePage />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<BookingDetailsPage />} />
              <Route path="/slips" element={<Slips />} />
              <Route path="/team" element={<Team />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/buses" element={<Buses />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}