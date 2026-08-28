import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import './Header.css';

export const Header = () => {
  return (
    <header className="header-container">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search transactions, bookings, agencies..." 
          className="header-search-input"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="header-icon-btn">
          <Bell size={18} />
          <span className="header-badge"></span>
        </button>
        <button className="header-icon-btn">
          <HelpCircle size={18} />
        </button>

        <div className="h-8 w-px bg-surface-border mx-1"></div>

        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" 
            alt="User avatar" 
            className="header-user-avatar"
          />
          <div className="text-left">
            <p className="text-sm font-bold text-navy-900 leading-none">ROSY</p>
            <p className="text-xs text-gray-500 leading-tight">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};