import React, { useState } from 'react';
import { Plus, Search, Shield, User, Mail, Lock, Edit2, Trash2 } from 'lucide-react';
import './Users.css';

const initialUsers = [
  { id: 'USR-01', name: 'Tiayong Aurel', email: 'aurel@discom.cm', role: 'Administrateur', agency: 'Douala (Siège)', status: 'Active' },
  { id: 'USR-02', name: 'Ewen DartNet', email: 'ewen@discom.cm', role: 'Guichetier', agency: 'Douala (Akwa)', status: 'Active' },
  { id: 'USR-03', name: 'Aurelle Tchaptchet', email: 'aurelle@discom.cm', role: 'Chef d\'agence', agency: 'Yaoundé (Mvan)', status: 'Active' },
  { id: 'USR-04', name: 'Marc Kengne', email: 'marc@discom.cm', role: 'Guichetier', agency: 'Bafoussam', status: 'Inactive' },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = initialUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.agency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1 className="users-title">Utilisateurs & Personnel</h1>
          <p className="users-subtitle">Gestion des comptes, attributions d'agences et droits d'accès</p>
        </div>
        <button className="users-add-btn">
          <Plus size={18} />
          <span>Ajouter un utilisateur</span>
        </button>
      </div>

      <div className="users-controls">
        <div className="users-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, rôle ou agence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom & Email</th>
              <th>Rôle</th>
              <th>Agence</th>
              <th>Statut</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td><span className="user-id-badge">{user.id}</span></td>
                <td>
                  <div className="user-info-cell">
                    <span className="font-semibold text-navy-900">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 font-medium text-navy-800">
                    <Shield size={14} className="text-teal-600" />
                    <span>{user.role}</span>
                  </div>
                </td>
                <td><span className="text-gray-700">{user.agency}</span></td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="actions-cell">
                    <button className="action-btn" title="Modifier"><Edit2 size={16} /></button>
                    <button className="action-btn delete" title="Supprimer"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}