import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Route as RouteIcon } from 'lucide-react';
import './Routes.css';

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

export const CreateRoutePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    departureAgency: agenciesList[0],
    arrivalAgency: agenciesList[2],
    standardPrice: '',
    standardSeats: '',
    category: 'Classique',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.departureAgency === formData.arrivalAgency) {
      alert("L'agence de départ et l'agence d'arrivée ne peuvent pas être identiques.");
      return;
    }

    const initialRoutes = [
      { id: 1, departure: 'Agence Akwa Central', arrival: 'Agence Yaoundé Nsam', price: 5000, seats: 50, category: 'Classique' },
      { id: 2, departure: 'Agence Yaoundé Nsam', arrival: 'Agence Bafoussam Ville', price: 10000, seats: 24, category: 'VIP' },
      { id: 3, departure: 'Agence Akwa Central', arrival: 'Agence Kribi Plage', price: 15000, seats: 18, category: 'Prestige' },
    ];

    const existingRoutes = JSON.parse(localStorage.getItem('etress_routes')) || initialRoutes;

    const newRoute = {
      id: Date.now(),
      departure: formData.departureAgency,
      arrival: formData.arrivalAgency,
      price: Number(formData.standardPrice),
      seats: Number(formData.standardSeats) || 0,
      category: formData.category,
    };

    localStorage.setItem('etress_routes', JSON.stringify([newRoute, ...existingRoutes]));
    navigate('/routes');
  };

  return (
    <div className="routes-container">
      <div className="create-route-wrapper">
        <button className="back-btn" onClick={() => navigate('/routes')}>
          <ArrowLeft size={18} />
          <span>Retour aux itinéraires</span>
        </button>

        <div className="create-route-card">
          <div className="create-header">
            <div className="create-icon-badge">
              <RouteIcon size={24} />
            </div>
            <h1 className="create-title">Créer un itinéraire pour Tresor Voyages</h1>
            <p className="create-subtitle">
              Saisissez les informations requises pour définir un nouveau trajet inter-agences.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="create-route-form">
            <div className="form-group">
              <label>
                AGENCE DE DÉPART <span className="required">*</span>
              </label>
              <select
                value={formData.departureAgency}
                onChange={(e) => setFormData({ ...formData, departureAgency: e.target.value })}
                required
              >
                {agenciesList.map((agency, index) => (
                  <option key={index} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                AGENCE D’ARRIVÉE <span className="required">*</span>
              </label>
              <select
                value={formData.arrivalAgency}
                onChange={(e) => setFormData({ ...formData, arrivalAgency: e.target.value })}
                required
              >
                {agenciesList.map((agency, index) => (
                  <option key={index} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  PRIX STANDARD (XAF) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Ex: 5000"
                  min="0"
                  value={formData.standardPrice}
                  onChange={(e) => setFormData({ ...formData, standardPrice: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>SIÈGES STANDARDS</label>
                <input
                  type="number"
                  placeholder="Ex: 50"
                  min="1"
                  value={formData.standardSeats}
                  onChange={(e) => setFormData({ ...formData, standardSeats: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                CATÉGORIE <span className="required">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="VIP">VIP</option>
                <option value="Classique">Classique</option>
                <option value="Prestige">Prestige</option>
              </select>
            </div>

            <div className="form-actions-create">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/routes')}
              >
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                Créer l'itinéraire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutePage;