import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Tag, Pencil, Trash2, ShieldAlert, ArrowRight, X } from 'lucide-react';
import './Routes.css';

const defaultRoutes = [
  { id: 1, departure: 'Agence Akwa Central', arrival: 'Agence Yaoundé Nsam', price: 5000, seats: 50, category: 'Classique' },
  { id: 2, departure: 'Agence Yaoundé Nsam', arrival: 'Agence Bafoussam Ville', price: 10000, seats: 24, category: 'VIP' },
  { id: 3, departure: 'Agence Akwa Central', arrival: 'Agence Kribi Plage', price: 15000, seats: 18, category: 'Prestige' },
];

const agenciesList = [
  'Agence Akwa Central',
  'Agence Bonabéri',
  'Agence Yaoundé Nsam',
  'Agence Yaoundé Mvan',
  'Agence Bafoussam Ville',
  'Agence Bamenda Center',
  'Agence Kribi Plage',
  'Agence Garoua Port',
];

export const RoutesPage = () => {
  const navigate = useNavigate();

  const [routesList, setRoutesList] = useState(() => {
    const saved = localStorage.getItem('etress_routes');
    return saved ? JSON.parse(saved) : defaultRoutes;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [deletingRouteId, setDeletingRouteId] = useState(null);

  // État de modification par popover
  const [editingRoute, setEditingRoute] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const [editForm, setEditForm] = useState({ departure: '', arrival: '', price: '', seats: '', category: 'Classique' });

  const popoverRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('etress_routes', JSON.stringify(routesList));
  }, [routesList]);

  // Fermeture au clic extérieur du popover
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setEditingRoute(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenEdit = (e, route) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    setPopoverPos({
      top: rect.bottom + window.scrollY + 8,
      left: Math.min(rect.left + window.scrollX - 220, window.innerWidth - 340),
    });

    setEditingRoute(route.id);
    setEditForm({
      departure: route.departure,
      arrival: route.arrival,
      price: route.price,
      seats: route.seats,
      category: route.category,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setRoutesList((prev) =>
      prev.map((item) =>
        item.id === editingRoute
          ? {
              ...item,
              departure: editForm.departure,
              arrival: editForm.arrival,
              price: Number(editForm.price),
              seats: Number(editForm.seats),
              category: editForm.category,
            }
          : item
      )
    );
    setEditingRoute(null);
  };

  const handleDelete = () => {
    setRoutesList((prev) => prev.filter((item) => item.id !== deletingRouteId));
    setDeletingRouteId(null);
  };

  const filteredRoutes = routesList.filter(
    (route) =>
      route.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.arrival.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="routes-container">
      <div className="routes-header">
        <div>
          <h1 className="routes-title">Gestion des Itinéraires</h1>
          <p className="routes-subtitle">Configurez et gérez l'ensemble des trajets et tarifs inter-agences.</p>
        </div>

        <button className="add-route-btn" onClick={() => navigate('/routes/create')}>
          <Plus size={18} />
          <span>Créer un itinéraire</span>
        </button>
      </div>

      <div className="routes-filter-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une agence de départ, d'arrivée ou catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau Stylisé */}
      <div className="table-responsive">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Trajet (Départ ➔ Arrivée)</th>
              <th>Catégorie</th>
              <th>Prix Standard</th>
              <th>Sièges</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <tr key={route.id}>
                  <td>
                    <div className="route-path-cell">
                      <span className="agency-name">{route.departure}</span>
                      <ArrowRight size={14} className="arrow-icon" />
                      <span className="agency-name">{route.arrival}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${route.category.toLowerCase()}`}>
                      <Tag size={12} />
                      {route.category}
                    </span>
                  </td>
                  <td className="font-semibold">{route.price.toLocaleString()} XAF</td>
                  <td>{route.seats} sièges</td>
                  <td className="text-right">
                    <div className="actions-cell">
                      <button
                        className="icon-btn edit-btn"
                        title="Modifier"
                        onClick={(e) => handleOpenEdit(e, route)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="icon-btn delete-btn"
                        title="Supprimer"
                        onClick={() => setDeletingRouteId(route.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  Aucun itinéraire trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popover d'édition */}
      {editingRoute && (
        <div
          ref={popoverRef}
          className="edit-popover"
          style={{ top: `${popoverPos.top}px`, left: `${popoverPos.left}px` }}
        >
          <div className="popover-header">
            <h4>Modifier l'itinéraire</h4>
            <button className="close-btn" onClick={() => setEditingRoute(null)}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSaveEdit} className="popover-form">
            <div className="form-group-sm">
              <label>Agence Départ</label>
              <select
                value={editForm.departure}
                onChange={(e) => setEditForm({ ...editForm, departure: e.target.value })}
              >
                {agenciesList.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-sm">
              <label>Agence Arrivée</label>
              <select
                value={editForm.arrival}
                onChange={(e) => setEditForm({ ...editForm, arrival: e.target.value })}
              >
                {agenciesList.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-sm">
              <label>Prix (XAF)</label>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group-sm">
              <label>Sièges</label>
              <input
                type="number"
                value={editForm.seats}
                onChange={(e) => setEditForm({ ...editForm, seats: e.target.value })}
                required
              />
            </div>

            <div className="form-group-sm">
              <label>Catégorie</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              >
                <option value="VIP">VIP</option>
                <option value="Classique">Classique</option>
                <option value="Prestige">Prestige</option>
              </select>
            </div>

            <button type="submit" className="save-popover-btn">
              Enregistrer
            </button>
          </form>
        </div>
      )}

      {/* Modal de suppression */}
      {deletingRouteId && (
        <div className="modal-overlay">
          <div className="modal-container delete-modal">
            <div className="delete-modal-content">
              <div className="danger-icon-wrapper">
                <ShieldAlert size={32} />
              </div>
              <h3 className="danger-title">Action Dangereuse</h3>
              <p className="danger-subtitle">Cette action est irréversible</p>

              <div className="delete-modal-actions">
                <button className="btn-cancel" onClick={() => setDeletingRouteId(null)}>
                  Annuler
                </button>
                <button className="btn-delete-danger" onClick={handleDelete}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesPage;