import React, { useState, useMemo } from 'react';
import { Plus, Search, Shield, Phone, MapPin, Users, UserCheck, UserX, ArrowUpDown, Edit2, Trash2, X } from 'lucide-react';
import './Team.css';

const initialTeamMembers = [
  { id: 'TM-01', firstName: 'Aurel', lastName: 'Tiayong', name: 'Tiayong Aurel', role: 'Vendeur de billets', agency: 'Douala (Siège)', phone: '+237 6 90 12 34 56', email: 'aurel@discom.cm', status: 'Actif', avatarUrl: '' },
  { id: 'TM-02', firstName: 'DartNet', lastName: 'Ewen', name: 'Ewen DartNet', role: 'Contrôleur/Scanner', agency: 'Douala (Siège)', phone: '+237 6 77 88 99 00', email: 'ewen@discom.cm', status: 'Actif', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
  { id: 'TM-03', firstName: 'Tchaptchet', lastName: 'Aurelle', name: 'Aurelle Tchaptchet', role: 'Vendeur de billets', agency: 'Yaoundé (Mvan)', phone: '+237 6 55 44 33 22', email: 'aurelle@discom.cm', status: 'Actif', avatarUrl: '' },
  { id: 'TM-04', firstName: 'Marc', lastName: 'Kengne', name: 'Marc Kengne', role: 'Contrôleur/Scanner', agency: 'Bafoussam', phone: '+237 6 99 11 22 33', email: 'marc@discom.cm', status: 'Inactif', avatarUrl: '' },
  { id: 'TM-05', firstName: 'Alain', lastName: 'Fotso', name: 'Alain Fotso', role: 'Vendeur de billets', agency: 'Douala (Akwa)', phone: '+237 6 70 00 11 22', email: 'alain@discom.cm', status: 'Actif', avatarUrl: '' },
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [displayCount, setDisplayCount] = useState(5);

  // État de la modal et du formulaire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    role: '',
    phone: '',
    agency: 'Douala (Siège)',
  });

  // Statistiques calculées dynamiquement
  const totalCount = teamMembers.length;
  const activeCount = useMemo(() => teamMembers.filter(m => m.status === 'Actif').length, [teamMembers]);
  const inactiveCount = useMemo(() => teamMembers.filter(m => m.status === 'Inactif').length, [teamMembers]);

  // Options du Select
  const countOptions = useMemo(() => {
    const options = [];
    for (let i = 5; i < totalCount; i += 5) {
      options.push(i);
    }
    options.push(totalCount);
    return options;
  }, [totalCount]);

  // Filtrage et tri
  const processedTeam = useMemo(() => {
    return teamMembers
      .filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === 'ASC') return nameA.localeCompare(nameB);
        return nameB.localeCompare(nameA);
      })
      .slice(0, Number(displayCount));
  }, [teamMembers, searchTerm, sortOrder, displayCount]);

  // Gestion des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMember = {
      id: `TM-0${teamMembers.length + 1}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.lastName} ${formData.firstName}`,
      email: formData.email,
      role: formData.role,
      phone: formData.phone || 'Non renseigné',
      agency: formData.agency,
      status: 'Actif',
      avatarUrl: '',
    };

    setTeamMembers((prev) => [newMember, ...prev]);
    setIsModalOpen(false);
    setFormData({
      lastName: '',
      firstName: '',
      email: '',
      role: '',
      phone: '',
      agency: 'Douala (Siège)',
    });
  };

  return (
    <div className="team-page">
      {/* En-tête */}
      <div className="team-header">
        <div>
          <h1 className="team-title">Membres de l'équipe</h1>
          <p className="team-subtitle">Gestion du personnel, des rôles et des agences de rattachement</p>
        </div>
        <button className="team-add-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Ajouter un membre</span>
        </button>
      </div>

      {/* Cartes KPI */}
      <div className="team-stats-grid">
        <div className="stat-card">
          <div className="stat-icon total"><Users size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Personnel</span>
            <span className="stat-value">{totalCount}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active"><UserCheck size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Personnel Actif</span>
            <span className="stat-value">{activeCount}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon inactive"><UserX size={22} /></div>
          <div className="stat-info">
            <span className="stat-label">Personnel Inactif</span>
            <span className="stat-value">{inactiveCount}</span>
          </div>
        </div>
      </div>

      {/* Recherche */}
      <div className="team-controls">
        <div className="team-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher par nom, rôle, agence ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tri et Filtres */}
      <div className="table-top-bar">
        <div className="table-sort-controls">
          <div className="select-wrapper">
            <ArrowUpDown size={16} className="select-icon" />
            <select
              value={`${sortOrder}-${displayCount}`}
              onChange={(e) => {
                const [order, count] = e.target.value.split('-');
                setSortOrder(order);
                setDisplayCount(Number(count));
              }}
              className="alphabetical-select"
            >
              <optgroup label="Ordre Alphabétique (A-Z)">
                {countOptions.map((opt) => (
                  <option key={`ASC-${opt}`} value={`ASC-${opt}`}>
                    A-Z : Afficher {opt} sur {totalCount}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Ordre Alphabétique Inversé (Z-A)">
                {countOptions.map((opt) => (
                  <option key={`DESC-${opt}`} value={`DESC-${opt}`}>
                    Z-A : Afficher {opt} sur {totalCount}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="table-counter-badge">
          <span>Effectif affiché : <strong>{processedTeam.length}</strong> / <strong>{totalCount}</strong></span>
        </div>
      </div>

      {/* Tableau de l'équipe */}
      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Nom & Profil</th>
              <th>Rôle & Poste</th>
              <th>Agence</th>
              <th>Contact</th>
              <th>Statut</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedTeam.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="team-member-cell">
                    {member.avatarUrl ? (
                      <img src={member.avatarUrl} alt={member.name} className="team-avatar-img" />
                    ) : (
                      <div className="team-avatar-fallback">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="member-name-info">
                      <span className="font-semibold text-navy-900">{member.name}</span>
                      <span className="text-xs text-gray-500 block">{member.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-navy-800 font-medium">
                    <Shield size={14} className="text-teal-600" />
                    <span>{member.role}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-gray-700 text-sm">
                    <MapPin size={14} className="text-orange-500" />
                    <span>{member.agency}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <Phone size={14} />
                    <span>{member.phone}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${member.status.toLowerCase()}`}>
                    {member.status}
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

      {/* Modal d'ajout de membre */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Ajouter un membre du personnel</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="lastName">
                  Nom de famille <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Ex: Ndombe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">
                  Prénom <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Ex: Paul"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Adresse Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Ex: paul.ndombe@discom.cm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">
                  Rôle <span className="required">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Sélectionner un rôle</option>
                  <option value="Vendeur de billets">Vendeur de billets</option>
                  <option value="Contrôleur/Scanner">Contrôleur/Scanner</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Ex: +237 6 90 00 00 00"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}