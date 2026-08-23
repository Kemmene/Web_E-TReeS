import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, MapPin, Route, Bus, 
  Ticket, FileText, Users, Receipt, Settings, LogOut, Plus 
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Agencies', path: '/agencies', icon: Building2 },
  { name: 'Cities', path: '/cities', icon: MapPin },
  { name: 'Routes', path: '/routes', icon: Route },
  { name: 'Trips', path: '/trips', icon: Bus },
  { name: 'Bookings', path: '/bookings', icon: Ticket },
  { name: 'Slips', path: '/slips', icon: FileText },
  { name: 'Team', path: '/team', icon: Users },
  { name: 'Transactions', path: '/transactions', icon: Receipt },
];

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-4">
          <div className="sidebar-logo-box">E</div>
          <div>
            <h1 className="sidebar-brand-title">DISCOM SARL</h1>
            <p className="sidebar-brand-sub">Logistics Management</p>
          </div>
        </div>

        <button className="sidebar-action-btn">
          <Plus size={18} />
          <span>New Booking</span>
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? 'sidebar-nav-link-active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-700/60 pt-4 space-y-1">
        <button className="sidebar-footer-btn">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="sidebar-footer-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;