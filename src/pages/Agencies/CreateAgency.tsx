import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2 } from 'lucide-react';
import './Agencies.css';

const citiesList = [
  'Douala',
  'Yaoundé',
  'Bafoussam',
  'Bamenda',
  'Kribi',
  'Garoua',
  'Maroua',
  'Ngaoundéré',
  'Ebolowa',
  'Buea'
];

export const CreateAgencyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Douala',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Agence "${formData.name}" ajoutée avec succès pour Tresor Voyages.`);
    navigate('/agencies');
  };

  return (
    <div className="agencies-container">
      <div className="create-agency-wrapper">
        <button className="back-btn" onClick={() => navigate('/agencies')}>
          <ArrowLeft size={18} />
          <span>Retour aux agences</span>
        </button>

        <div className="create-agency-card">
          <div className="create-header">
            <div className="create-icon-badge">
              <Building2 size={24} />
            </div>
            <h1 className="create-title">Create agency for Tresor Voyages</h1>
            <p className="create-subtitle">
              Saisissez les informations pour enregistrer une nouvelle agence dans le réseau.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="create-agency-form">
            <div className="form-group">
              <label>Nom de l'agence</label>
              <input
                type="text"
                placeholder="Ex: Agence Akwa Central"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                placeholder="Ex: +237 6XX XX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Ex: contact.akwa@tresorvoyages.cm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Ville</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {citiesList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions-create">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/agencies')}
              >
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};