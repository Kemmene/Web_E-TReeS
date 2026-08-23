import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, MapPin, Navigation, Calendar, Tag, DollarSign, Users, Activity,
  Filter, Layers, ChevronDown, Clock, PlayCircle, CheckCircle2, X, Anchor
} from 'lucide-react';
import './Trips.css';

const citiesList = ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Kribi', 'Garoua', 'Maroua'];
const categoriesList = ['VIP', 'Classique', 'Prestige'];

const routesList = [
  { id: 1, name: 'Bafoussam-Douala-Classique', departure: 'Bafoussam', arrival: 'Douala', agency: 'Tresor Voyages' },
  { id: 2, name: 'Bafoussam-Douala-Prestige', departure: 'Bafoussam', arrival: 'Douala', agency: 'Tresor Voyages' },
  { id: 3, name: 'Bafoussam-Yaoundé-Classique', departure: 'Bafoussam', arrival: 'Yaoundé', agency: 'Tresor Voyages' },
  { id: 4, name: 'Bafoussam-Yaoundé-VIP', departure: 'Bafoussam', arrival: 'Yaoundé', agency: 'Tresor Voyages' },
  { id: 5, name: 'DOUALA -YAOUNDÉ - VIP', departure: 'Douala', arrival: 'Yaoundé', agency: 'Tresor Voyages' },
  { id: 6, name: 'Douala-Bafoussam-Classique', departure: 'Douala', arrival: 'Bafoussam', agency: 'Tresor Voyages' },
  { id: 7, name: 'Douala-Bafoussam-Classique', departure: 'Douala', arrival: 'Bafoussam', agency: 'Tresor Voyages' },
  { id: 8, name: 'Douala-Bafoussam Prestige', departure: 'Douala', arrival: 'Bafoussam', agency: 'Tresor Voyages' },
  { id: 9, name: 'Douala-Bafoussam VIP', departure: 'Douala', arrival: 'Bafoussam', agency: 'Tresor Voyages' },
];

const initialTrips = [
  { id: 1, departureCity: 'Douala', arrivalCity: 'Yaoundé', departureDate: '2026-08-22', category: 'Classique', price: 5000, seats: 50, status: 'upcoming' },
  { id: 2, departureCity: 'Yaoundé', arrivalCity: 'Bafoussam', departureDate: '2026-08-21', category: 'VIP', price: 10000, seats: 24, status: 'current' },
  { id: 3, departureCity: 'Douala', arrivalCity: 'Kribi', departureDate: '2026-08-15', category: 'Prestige', price: 15000, seats: 18, status: 'completed' },
];

export const TripsPage = () => {
  const navigate = useNavigate();
  const [tripsList] = useState(initialTrips);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusTab, setStatusTab] = useState('upcoming');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    departureCity: 'ALL',
    arrivalCity: 'ALL',
    dateRange: 'ALL',
    category: 'ALL',
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectRoute = (route) => {
    setIsModalOpen(false);
    navigate(`/trips/create?routeId=${route.id}`);
  };

  const filteredTrips = tripsList.filter((trip) => {
    if (trip.status !== statusTab) return false;
    if (filters.departureCity !== 'ALL' && trip.departureCity !== filters.departureCity) return false;
    if (filters.arrivalCity !== 'ALL' && trip.arrivalCity !== filters.arrivalCity) return false;
    if (filters.category !== 'ALL' && trip.category !== filters.category) return false;
    return true;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <span className="status-badge upcoming"><Clock size={12} /> À venir</span>;
      case 'current':
        return <span className="status-badge current"><PlayCircle size={12} /> Actuel</span>;
      case 'completed':
        return <span className="status-badge completed"><CheckCircle2 size={12} /> Réussi</span>;
      default:
        return null;
    }
  };

  return (
    <div className="trips-container">
      {/* En-tête de page */}
      <div className="trips-header-single-line">
        <div className="title-with-icon">
          <MapPin size={26} className="text-teal" />
          <h1 className="trips-title">Voyages</h1>
        </div>

        <div className="header-actions-right">
          <button className="btn-white" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            <span>Filtre</span>
          </button>

          <button className="btn-white" onClick={() => navigate('/trips/bulk')}>
            <Layers size={16} />
            <span>Action en Vrac</span>
          </button>

          <button className="add-trip-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Programmer un voyage</span>
          </button>
        </div>
      </div>

      {/* Panneau de filtres intégré */}
      {showFilters && (
        <div className="filter-panel-in-flow">
          <div className="filter-panel-header">
            <div className="filter-panel-title">
              <ChevronDown size={18} />
              <h3>Déclenchements de filtres</h3>
            </div>
            <p className="filter-panel-subtitle">Réduire les résultats par critères</p>
          </div>

          <div className="filter-boxes-single-row">
            <div className="filter-box">
              <label>Ville de départ</label>
              <select value={filters.departureCity} onChange={(e) => handleFilterChange('departureCity', e.target.value)}>
                <option value="ALL">Toutes les villes de départ</option>
                {citiesList.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="filter-box">
              <label>Ville d'arrivée</label>
              <select value={filters.arrivalCity} onChange={(e) => handleFilterChange('arrivalCity', e.target.value)}>
                <option value="ALL">Toutes les villes d'arrivée</option>
                {citiesList.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="filter-box">
              <label>Date de départ</label>
              <select value={filters.dateRange} onChange={(e) => handleFilterChange('dateRange', e.target.value)}>
                <option value="ALL">N'importe quelle date</option>
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
              </select>
            </div>

            <div className="filter-box">
              <label>Catégorie</label>
              <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
                <option value="ALL">Toutes les catégories</option>
                {categoriesList.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Onglets de Statut */}
      <div className="trips-tabs">
        <button className={`tab-btn ${statusTab === 'upcoming' ? 'active' : ''}`} onClick={() => setStatusTab('upcoming')}>
          <Clock size={16} /> <span>À venir</span>
        </button>
        <button className={`tab-btn ${statusTab === 'current' ? 'active' : ''}`} onClick={() => setStatusTab('current')}>
          <PlayCircle size={16} /> <span>Actuel</span>
        </button>
        <button className={`tab-btn ${statusTab === 'completed' ? 'active' : ''}`} onClick={() => setStatusTab('completed')}>
          <CheckCircle2 size={16} /> <span>Réussi</span>
        </button>
      </div>

      {/* Tableau de résultats */}
      <div className="table-responsive">
        <table className="styled-table">
          <thead>
            <tr>
              <th><div className="th-content"><MapPin size={14} /><span>Ville de départ</span></div></th>
              <th><div className="th-content"><Navigation size={14} /><span>Ville d'arrivée</span></div></th>
              <th><div className="th-content"><Calendar size={14} /><span>Date départ</span></div></th>
              <th><div className="th-content"><Tag size={14} /><span>Catégorie</span></div></th>
              <th><div className="th-content"><DollarSign size={14} /><span>Prix (XAF)</span></div></th>
              <th><div className="th-content"><Users size={14} /><span>Sièges</span></div></th>
              <th><div className="th-content"><Activity size={14} /><span>Statut</span></div></th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.id}>
                <td className="font-semibold">{trip.departureCity}</td>
                <td className="font-semibold">{trip.arrivalCity}</td>
                <td>{trip.departureDate}</td>
                <td><span className={`category-badge ${trip.category.toLowerCase()}`}>{trip.category}</span></td>
                <td className="font-semibold">{trip.price.toLocaleString()} XAF</td>
                <td>{trip.seats} sièges</td>
                <td>{renderStatusBadge(trip.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE SÉLECTION D'ITINÉRAIRE */}
      {isModalOpen && (
        <div className="modal-overlay-bg">
          <div className="modal-route-card">
            <div className="modal-route-header">
              <h2>Sélectionnez l'itinéraire</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-route-body">
              <div className="routes-list-container">
                {routesList.map((route) => (
                  <div key={route.id} className="route-item-row" onClick={() => handleSelectRoute(route)}>
                    <div className="route-item-info">
                      <h4 className="route-item-title">{route.name}</h4>
                      <div className="route-item-sub">
                        <MapPin size={13} className="text-teal" />
                        <span>{route.departure} {route.arrival}</span>
                        <Anchor size={13} className="text-muted" />
                      </div>
                    </div>
                    <div className="agency-pill">
                      {route.agency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsPage;