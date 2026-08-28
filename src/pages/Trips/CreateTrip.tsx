import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LayoutGrid, X } from 'lucide-react';
import './CreateTrip.css';

// Base de données simulée des itinéraires
const routesDatabase = [
  { id: 1, departure: 'Bafoussam (Bafoussam)', arrival: 'Village (Douala)', category: 'Classique', price: 4500 },
  { id: 2, departure: 'Bafoussam (Bafoussam)', arrival: 'Mvan (Yaoundé)', category: 'VIP', price: 6000 },
  { id: 3, departure: 'Akwa (Douala)', arrival: 'Mvan (Yaoundé)', category: 'Prestige', price: 10000 },
];

export const CreateTripPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const routeId = searchParams.get('routeId');

  // Mode d'ajout : "single" (Ajouter un seul trajet) ou "multiple" (Ajouter plusieurs trajets)
  const [addMode, setAddMode] = useState('single');

  // Champs pré-remplis automatiquement depuis l'itinéraire
  const [formData, setFormData] = useState({
    departureAgency: '',
    arrivalAgency: '',
    category: '',
    price: '',
    departureDate: '',
    departureTime: '',
    busType: '',
    busNumber: '',
  });

  // Modal de configuration du plan de bus
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);

  // Pré-remplissage au chargement de la page d'après l'ID reçu
  useEffect(() => {
    if (routeId) {
      const selectedRoute = routesDatabase.find((r) => r.id === Number(routeId)) || routesDatabase[0];
      setFormData((prev) => ({
        ...prev,
        departureAgency: selectedRoute.departure,
        arrivalAgency: selectedRoute.arrival,
        category: selectedRoute.category,
        price: selectedRoute.price,
      }));
    } else {
      // Valeurs par défaut si aucun ID n'est fourni
      setFormData((prev) => ({
        ...prev,
        departureAgency: 'Bafoussam (Bafoussam)',
        arrivalAgency: 'Village (Douala)',
        category: 'Classique',
        price: 4500,
      }));
    }
  }, [routeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trajet créé :', formData);
    navigate('/trips');
  };

  return (
    <div className="create-trip-container">
      <h1 className="page-title">Ajouter des trajets</h1>

      <div className="form-card">
        <h2 className="card-subtitle">Saisissez les informations du voyage</h2>

        {/* Bascule mode d'ajout */}
        <div className="tab-toggle-container">
          <button
            className={`tab-toggle-btn ${addMode === 'single' ? 'active' : ''}`}
            onClick={() => setAddMode('single')}
            type="button"
          >
            Ajouter un seul trajet
          </button>
          <button
            className={`tab-toggle-btn ${addMode === 'multiple' ? 'active' : ''}`}
            onClick={() => setAddMode('multiple')}
            type="button"
          >
            Ajouter plusieurs trajets
          </button>
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-grid">
            {/* Agence de départ (Automatique) */}
            <div className="form-group">
              <label>AGENCE DE DÉPART</label>
              <input
                type="text"
                name="departureAgency"
                value={formData.departureAgency}
                readOnly
                className="input-disabled"
              />
            </div>

            {/* Agence d'arrivée (Automatique) */}
            <div className="form-group">
              <label>AGENCE D'ARRIVÉE</label>
              <input
                type="text"
                name="arrivalAgency"
                value={formData.arrivalAgency}
                readOnly
                className="input-disabled"
              />
            </div>

            {/* Date de départ */}
            <div className="form-group">
              <label>DATE DE DÉPART *</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Heure de départ */}
            <div className="form-group">
              <label>HEURE DE DÉPART *</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Prix */}
            <div className="form-group">
              <label>PRIX (STANDARD : {formData.price} XAF)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* Type de Bus */}
            <div className="form-group">
              <label>BUS TYPE *</label>
              <select
                name="busType"
                value={formData.busType}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un type de bus</option>
                <option value="coaster">Coaster (30 places)</option>
                <option value="gros-porteur">Gros Porteur (70 places)</option>
                <option value="vip-medium">VIP Premium (24 places)</option>
              </select>
            </div>

            {/* Bouton de configuration du plan de bus */}
            <div className="form-group full-width center-content">
              <button
                type="button"
                className="btn-bus-config"
                onClick={() => setIsBusModalOpen(true)}
              >
                <LayoutGrid size={18} />
                <span>Configurez le plan de bus ({selectedSeatsCount})</span>
              </button>
            </div>

            {/* Numéro de Bus */}
            <div className="form-group">
              <label>NUMÉRO DE BUS</label>
              <input
                type="text"
                name="busNumber"
                placeholder="Ex: BUS-01"
                value={formData.busNumber}
                onChange={handleChange}
              />
            </div>

            {/* Catégorie (Automatique) */}
            <div className="form-group">
              <label>CATÉGORIE</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                readOnly
                className="input-disabled"
              />
            </div>
          </div>

          {/* Bouton Ajouter */}
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>

      {/* MODAL CONFIGURATION DU PLAN DE BUS */}
      {isBusModalOpen && (
        <div className="modal-overlay">
          <div className="bus-config-modal">
            <div className="modal-header">
              <h3>Configuration du plan de bus</h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setIsBusModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="bus-modal-desc">
                Définissez la disposition des sièges pour ce voyage.
              </p>

              {/* Exemple de grille de sièges simplifiée */}
              <div className="seats-grid">
                {[...Array(24)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="seat-btn"
                    onClick={() =>
                      setSelectedSeatsCount((prev) => prev + 1)
                    }
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-submit"
                onClick={() => setIsBusModalOpen(false)}
              >
                Valider la configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTripPage;