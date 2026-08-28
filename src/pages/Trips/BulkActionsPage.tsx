import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, ListFilter } from 'lucide-react';
import './BulkActions.css';

const citiesList = ['Tous', 'Yaoundé', 'Douala', 'Dschang', 'Bafoussam', 'Kribi'];
const categoriesList = ['Tous', 'VIP', 'Classique', 'Prestige'];

const initialResults = [
  {
    id: 1,
    itineraire: 'Yaoundé-Dschang-Classique',
    depart: 'Yaoundé',
    arrivee: 'Dschang',
    date: '21/08/2026',
    temps: '23:00',
    prix: '6500 FCFA',
    sieges: 37,
    categorie: 'Classique',
  },
  {
    id: 2,
    itineraire: 'Douala-Yaoundé-VIP',
    depart: 'Douala',
    arrivee: 'Yaoundé',
    date: '21/08/2026',
    temps: '08:00',
    prix: '10000 FCFA',
    sieges: 24,
    categorie: 'VIP',
  },
];

export const BulkActionsPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: 'A venir',
    departureCity: 'Tous',
    arrivalCity: 'Tous',
    date: "N'importe quelle date",
    category: 'Tous',
    departureTime: "N'importe quand",
    route: 'Tous les itinéraires',
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bulk-actions-container">
      {/* En-tête de la page */}
      <div className="bulk-header">
        <div>
          <div className="title-with-icon">
            <span className="icon-badge">✏️</span>
            <h1 className="bulk-title">Actions de trajet en vrac</h1>
          </div>
          <p className="bulk-subtitle">
            Modifie ou supprime plusieurs trajets en même temps selon les critères que vous avez choisis
          </p>
        </div>

        <button className="btn-return" onClick={() => navigate('/trips')}>
          <ArrowLeft size={16} />
          <span>Retour aux voyages</span>
        </button>
      </div>

      {/* Bloc Sélection d'affinage */}
      <div className="refinement-box">
        <div className="refinement-header">
          <Filter size={18} className="text-blue" />
          <div>
            <h3>Sélection d'affinage</h3>
            <p>Utilisez les filtres ci-dessous pour cibler des trajets spécifiques</p>
          </div>
        </div>

        <div className="refinement-grid">
          <div className="filter-item">
            <label>STATUT</label>
            <select value={filters.status} onChange={(e) => handleChange('status', e.target.value)}>
              <option value="A venir">A venir</option>
              <option value="Actuel">Actuel</option>
              <option value="Reussi">Réussi</option>
            </select>
          </div>

          <div className="filter-item">
            <label>VILLE DE DÉPART</label>
            <select value={filters.departureCity} onChange={(e) => handleChange('departureCity', e.target.value)}>
              {citiesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>VILLE D'ARRIVÉE</label>
            <select value={filters.arrivalCity} onChange={(e) => handleChange('arrivalCity', e.target.value)}>
              {citiesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>DATE</label>
            <select value={filters.date} onChange={(e) => handleChange('date', e.target.value)}>
              <option value="N'importe quelle date">N'importe quelle date</option>
              <option value="Aujourd'hui">Aujourd'hui</option>
              <option value="Cette semaine">Cette semaine</option>
              <option value="Ce mois-ci">Ce mois-ci</option>
            </select>
          </div>

          <div className="filter-item">
            <label>CATÉGORIE</label>
            <select value={filters.category} onChange={(e) => handleChange('category', e.target.value)}>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>HEURE DU DÉPART</label>
            <select value={filters.departureTime} onChange={(e) => handleChange('departureTime', e.target.value)}>
              <option value="N'importe quand">N'importe quand</option>
              <option value="Matin">Matin (06h - 12h)</option>
              <option value="Après-midi">Après-midi (12h - 18h)</option>
              <option value="Soir">Soir (18h - 23h)</option>
            </select>
          </div>

          <div className="filter-item full-width">
            <label>ITINÉRAIRE</label>
            <select value={filters.route} onChange={(e) => handleChange('route', e.target.value)}>
              <option value="Tous les itinéraires">Tous les itinéraires</option>
              <option value="Yaoundé-Dschang">Yaoundé - Dschang</option>
              <option value="Douala-Yaoundé">Douala - Yaoundé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compteur de résultats */}
      <div className="results-counter-card">
        <div className="counter-badge">76</div>
        <span className="counter-text">76 voyages correspondent à vos critères</span>
      </div>

      {/* Tableau Aperçu */}
      <div className="preview-section">
        <div className="preview-header">
          <ListFilter size={18} />
          <span>Aperçu des sorties correspondantes</span>
        </div>

        <div className="table-responsive">
          <table className="bulk-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ITINÉRAIRE</th>
                <th>DÉPART</th>
                <th>ARRIVÉE</th>
                <th>DATE</th>
                <th>TEMPS</th>
                <th>PRIX</th>
                <th>SIÈGES</th>
                <th>CATÉGORIE</th>
              </tr>
            </thead>
            <tbody>
              {initialResults.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itineraire}</td>
                  <td>{item.depart}</td>
                  <td>{item.arrivee}</td>
                  <td>{item.date}</td>
                  <td>{item.temps}</td>
                  <td>{item.prix}</td>
                  <td>{item.sieges}</td>
                  <td>{item.categorie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPage;