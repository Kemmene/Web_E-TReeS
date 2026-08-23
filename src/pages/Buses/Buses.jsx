import React, { useState } from 'react';
import { Plus, Search, Bus, Gauge, Wrench, CheckCircle, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import './Buses.css';

const initialBuses = [
  { id: 'BUS-01', plate: 'LT-890-AA', model: 'Yutong ZK6129', seats: 70, status: 'Active', lastMaintenance: '2026-07-15' },
  { id: 'BUS-02', plate: 'CE-432-BB', model: 'Coaster Toyota', seats: 35, status: 'Active', lastMaintenance: '2026-08-01' },
  { id: 'BUS-03', plate: 'LT-112-CC', model: 'Yutong ZK6129', seats: 70, status: 'Maintenance', lastMaintenance: '2026-08-10' },
  { id: 'BUS-04', plate: 'LT-554-DD', model: 'Mercedes-Benz Tourismo', seats: 50, status: 'Active', lastMaintenance: '2026-06-20' },
];

export default function Buses() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuses = initialBuses.filter(
    (b) =>
      b.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="buses-page">
      <div className="buses-header">
        <div>
          <h1 className="buses-title">Flotte de Bus</h1>
          <p className="buses-subtitle">Gestion des véhicules, capacités et état technique</p>
        </div>
        <button className="buses-add-btn">
          <Plus size={18} />
          <span>Ajouter un bus</span>
        </button>
      </div>

      <div className="buses-controls">
        <div className="buses-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par immatriculation, modèle ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="buses-grid">
        {filteredBuses.map((bus) => (
          <div key={bus.id} className="bus-card">
            <div className="bus-card-header">
              <div className="flex items-center gap-2">
                <Bus size={20} className="text-teal-600" />
                <span className="font-bold text-navy-900">{bus.id}</span>
              </div>
              <span className={`status-badge ${bus.status.toLowerCase()}`}>
                {bus.status === 'Active' ? <CheckCircle size={12} /> : <Wrench size={12} />}
                <span>{bus.status}</span>
              </span>
            </div>
            <div className="bus-card-body">
              <p className="bus-plate">{bus.plate}</p>
              <p className="bus-model">{bus.model}</p>
              <div className="bus-specs">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Gauge size={15} />
                  <span>{bus.seats} Places</span>
                </div>
                <div className="text-xs text-gray-500">
                  Révision: {bus.lastMaintenance}
                </div>
              </div>
            </div>
            <div className="bus-card-actions">
              <button className="action-btn" title="Modifier"><Edit2 size={16} /></button>
              <button className="action-btn delete" title="Supprimer"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}