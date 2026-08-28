import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, ShieldAlert, X, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { useAgencies, useCreateAgency, useUpdateAgency, useDeleteAgency } from '@lib';
import './Agencies.css';

export const AgenciesPage = () => {
  const navigate = useNavigate();
  const { data: agenciesResponse, isLoading, error, refetch } = useAgencies(1, 50);
  const createAgency = useCreateAgency();
  const updateAgency = useUpdateAgency();
  const deleteAgency = useDeleteAgency();

  const agencies = agenciesResponse?.response || [];

  // État pour l'édition en Popover
  const [editingAgency, setEditingAgency] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [editFormData, setEditFormData] = useState({ name: '', phone: '', email: '', city: '' });

  // État pour le Modal de Suppression
  const [deletingAgencyId, setDeletingAgencyId] = useState(null);

  const editPopoverRef = useRef(null);

  // Villes disponibles
  const cities = ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Kribi', 'Garoua', 'Maroua'];

  // Fermer le popover au clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editPopoverRef.current && !editPopoverRef.current.contains(event.target)) {
        setEditingAgency(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ouvrir le popover d'édition
  const handleOpenEdit = (event, agency) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Positionne le popover à proximité du bouton cliqué
    setPopoverPosition({
      top: rect.bottom + window.scrollY + 8,
      left: Math.min(rect.left + window.scrollX - 100, window.innerWidth - 320),
    });

    setEditingAgency(agency.reference);
    setEditFormData({
      name: agency.name,
      phone: agency.phone,
      email: agency.email || '',
      city: agency.city?.name || '',
    });
  };

  // Enregistrer les modifications
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingAgency) return;
    
    try {
      await updateAgency.mutateAsync({ ref: editingAgency, data: editFormData });
      refetch();
      setEditingAgency(null);
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  // Confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!deletingAgencyId) return;
    
    try {
      await deleteAgency.mutateAsync(deletingAgencyId);
      refetch();
      setDeletingAgencyId(null);
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  if (isLoading) {
    return (
      <div className="agencies-container flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="agencies-container p-8 text-center">
        <p className="text-red-500">Erreur de chargement des agences</p>
        <button onClick={() => refetch()} className="mt-4 btn-primary">Réessayer</button>
      </div>
    );
  }

  return (
    <div className="agencies-container">
      <div className="agencies-header">
        <div>
          <h1 className="agencies-title">Gestion des Agences</h1>
          <p className="agencies-subtitle">Gérez les points de vente et les localisations réseau.</p>
        </div>

        <button className="add-agency-btn" onClick={() => navigate('/agencies/create')}>
          <Plus size={18} />
          <span>Ajouter Une Agence</span>
        </button>
      </div>

      <div className="agencies-grid">
        {agencies.map((agency) => (
          <div key={agency.reference} className="agency-card">
            <div className="agency-card-header">
              <h3>{agency.name}</h3>
              <div className="agency-actions">
                <button
                  className="icon-btn edit-btn"
                  title="Modifier"
                  onClick={(e) => handleOpenEdit(e, agency)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="icon-btn delete-btn"
                  title="Supprimer"
                  onClick={() => setDeletingAgencyId(agency.reference)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="agency-card-body">
              <div className="info-item">
                <MapPin size={16} />
                <span>{agency.city?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <Phone size={16} />
                <span>{agency.phone}</span>
              </div>
              <div className="info-item">
                <Mail size={16} />
                <span>{agency.email || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popover d'Édition Contextuel */}
      {editingAgency && (
        <div
          ref={editPopoverRef}
          className="edit-popover"
          style={{ top: `${popoverPosition.top}px`, left: `${popoverPosition.left}px` }}
        >
          <div className="popover-header">
            <h4>Modifier l'agence</h4>
            <button className="close-btn" onClick={() => setEditingAgency(null)}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSaveEdit} className="popover-form">
            <div className="form-group-sm">
              <label>Nom</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group-sm">
              <label>Ville</label>
              <select
                value={editFormData.city}
                onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-sm">
              <label>Téléphone</label>
              <input
                type="text"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group-sm">
              <label>Email</label>
              <input
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="save-popover-btn" disabled={updateAgency.isPending}>
              {updateAgency.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </form>
        </div>
      )}

      {/* Modal de Suppression "Action Dangereuse" */}
      {deletingAgencyId && (
        <div className="modal-overlay">
          <div className="modal-container delete-modal">
            <div className="delete-modal-content">
              <div className="danger-icon-wrapper">
                <ShieldAlert size={32} />
              </div>

              <h3 className="danger-title">Action Dangereuse</h3>
              <p className="danger-subtitle">Cette action est irrreversible</p>

              <div className="delete-modal-actions">
                <button className="btn-cancel" onClick={() => setDeletingAgencyId(null)}>
                  Annuler
                </button>
                <button className="btn-delete-danger" onClick={handleConfirmDelete} disabled={deleteAgency.isPending}>
                  {deleteAgency.isPending ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};