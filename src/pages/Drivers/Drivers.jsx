import React, { useState } from 'react';
import { Plus, Search, UserCheck, Phone, ShieldCheck, Edit2, Trash2 } from 'lucide-react';
import './Drivers.css';

const initialDrivers = [
  { id: 'DRV-01', name: 'Paul Ndombe', phone: '+237 6 91 23 45 67', license: 'Permis D (N° 88491)', status: 'On Duty', assignedBus: 'LT-890-AA' },
  { id: 'DRV-02', name: 'Jean Atangana', phone: '+237 6 77 11 22 33', license: 'Permis D (N° 55210)', status: 'On Duty', assignedBus: 'CE-432-BB' },
  { id: 'DRV-03', name: 'Michel Talla', phone: '+237 6 50 99 88 77', license: 'Permis D (N° 90123)', status: 'Available', assignedBus: 'LT-112-CC' },
  { id: 'DRV-04', name: 'Samuel Eto', phone: '+237 6 99 44 55 66', license: 'Permis D (N° 33112)', status: 'Off Duty', assignedBus: 'LT-554-DD' },
];

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = initialDrivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="drivers-page">
      <div className="drivers-header">
        <div>
          <h1 className="drivers-title">Chauffeurs</h1>
          <p className="drivers-subtitle">Gestion du personnel de conduite et de leurs affectations</p>
        </div>
        <button className="drivers-add-btn">
          <Plus size={18} />
          <span>Ajouter un chauffeur</span>
        </button>
      </div>

      <div className="drivers-controls">
        <div className="drivers-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="drivers-table-wrapper">
        <table className="drivers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom complet</th>
              <th>Téléphone</th>
              <th>Permis / Qualification</th>
              <th>Bus Attribué</th>
              <th>Statut</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id}>
                <td><span className="driver-id-badge">{driver.id}</span></td>
                <td><span className="font-semibold text-navy-900">{driver.name}</span></td>
                <td>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Phone size={14} />
                    <span>{driver.phone}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-gray-600">
                    <ShieldCheck size={14} className="text-teal-600" />
                    <span>{driver.license}</span>
                  </div>
                </td>
                <td><span className="font-mono text-xs font-semibold">{driver.assignedBus}</span></td>
                <td>
                  <span className={`status-badge ${driver.status.toLowerCase().replace(' ', '-')}`}>
                    {driver.status}
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