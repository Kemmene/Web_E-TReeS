import React, { useState } from 'react';
import { Plus, Search, MapPin, Building2, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import './Cities.css';

const initialCities = [
  { id: 1, name: 'Douala', region: 'Littoral', code: 'DLA', agenciesCount: 4, status: 'Active' },
  { id: 2, name: 'Yaoundé', region: 'Centre', code: 'YDE', agenciesCount: 3, status: 'Active' },
  { id: 3, name: 'Bafoussam', region: 'Ouest', code: 'BFM', agenciesCount: 2, status: 'Active' },
  { id: 4, name: 'Kribi', region: 'Sud', code: 'KBI', agenciesCount: 1, status: 'Inactive' },
];

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = initialCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cities-page">
      {/* En-tête */}
      <div className="cities-header">
        <div>
          <h1 className="cities-title">Villes</h1>
          <p className="cities-subtitle">Gérez les villes desservies et leurs agences associées</p>
        </div>
        <button className="cities-add-btn">
          <Plus size={18} />
          <span>Ajouter une ville</span>
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="cities-controls">
        <div className="cities-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une ville, région ou code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des villes */}
      <div className="cities-table-wrapper">
        <table className="cities-table">
          <thead>
            <tr>
              <th>Ville</th>
              <th>Code</th>
              <th>Région</th>
              <th>Agences</th>
              <th>Statut</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city) => (
              <tr key={city.id}>
                <td>
                  <div className="city-name-cell">
                    <MapPin size={16} className="city-icon" />
                    <span className="font-semibold">{city.name}</span>
                  </div>
                </td>
                <td><span className="city-code-badge">{city.code}</span></td>
                <td>{city.region}</td>
                <td>
                  <div className="city-agencies-cell">
                    <Building2 size={15} />
                    <span>{city.agenciesCount} agence(s)</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${city.status.toLowerCase()}`}>
                    {city.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="actions-cell">
                    <button className="action-btn" title="Modifier">
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
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