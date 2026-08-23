import React, { useState, useRef } from 'react';
import { Calendar, FileSpreadsheet, TrendingUp, TrendingDown, BarChart2, CreditCard, X } from 'lucide-react';
import './Slips.css';

const initialTransactions = [
  { id: 1, description: 'Paiement Des Billets', agence: 'Mimboman', ville: 'Yaoundé', montant: '6080 XAF', mode: 'MOMO', statut: 'SUCCES', date: '2026-08-21 15:34', displayDate: '21/08/2026 15:34' },
  { id: 2, description: 'Paiement Des Billets', agence: 'Mimboman', ville: 'Yaoundé', montant: '5580 XAF', mode: 'OM', statut: 'SUCCES', date: '2026-08-21 15:29', displayDate: '21/08/2026 15:29' },
  { id: 3, description: 'Paiement Des Billets', agence: 'Mimboman', ville: 'Yaoundé', montant: '5580 XAF', mode: 'MOMO', statut: 'SUCCES', date: '2026-08-16 17:29', displayDate: '16/08/2026 17:29' },
  { id: 4, description: 'Paiement Des Billets', agence: 'Village', ville: 'Douala', montant: '7080 XAF', mode: 'OM', statut: 'SUCCES', date: '2026-08-13 17:59', displayDate: '13/08/2026 17:59' },
  { id: 5, description: 'Paiement Des Billets', agence: 'Village', ville: 'Douala', montant: '7080 XAF', mode: 'OM', statut: 'SUCCES', date: '2026-08-13 17:52', displayDate: '13/08/2026 17:52' },
];

export default function Slips() {
  const [selectedDate, setSelectedDate] = useState('');
  const [activeStat, setActiveStat] = useState('all'); // 'all', 'reservations', 'retraits', 'net'
  const dateInputRef = useRef(null);

  const handleOpenCalendar = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    }
  };

  const filteredTransactions = initialTransactions.filter((tx) => {
    if (!selectedDate) return true;
    return tx.date.startsWith(selectedDate);
  });

  return (
    <div className="slips-container">
      {/* En-tête avec titre et boutons d'action */}
      <div className="slips-header">
        <div>
          <h1 className="slips-title">Transactions</h1>
          <p className="slips-subtitle">Affichage de toutes les transactions</p>
        </div>
        
        <div className="slips-actions-group">
          <div className="period-picker-wrapper">
            <button className="btn-filter-period" onClick={handleOpenCalendar}>
              <Calendar size={14} />
              <span>
                {selectedDate 
                  ? new Date(selectedDate).toLocaleDateString('fr-FR') 
                  : 'Choisissez une période'}
              </span>
            </button>
            <input
              ref={dateInputRef}
              type="date"
              className="date-input-hidden"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            {selectedDate && (
              <button 
                className="btn-clear-date" 
                onClick={() => setSelectedDate('')}
                title="Effacer le filtre"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button className="btn-export">
            <FileSpreadsheet size={14} />
            <span>Historique des exportations</span>
          </button>
          
          <button className="btn-export">
            <FileSpreadsheet size={14} />
            <span>Historique des tickets d'exportation</span>
          </button>
        </div>
      </div>

      {/* Cartes de Statistiques interactives */}
      <div className="stats-grid">
        <div 
          className={`stat-card stat-reservations ${activeStat === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveStat(activeStat === 'reservations' ? 'all' : 'reservations')}
        >
          <div className="stat-info">
            <span className="stat-label">RÉSERVATIONS TOTALES</span>
            <div className="stat-value-group">
              <span className="stat-value">3489190</span>
              <span className="stat-currency">XAF</span>
            </div>
          </div>
          <div className="stat-icon-wrapper text-green">
            <TrendingUp size={18} />
          </div>
        </div>

        <div 
          className={`stat-card stat-retraits ${activeStat === 'retraits' ? 'active' : ''}`}
          onClick={() => setActiveStat(activeStat === 'retraits' ? 'all' : 'retraits')}
        >
          <div className="stat-info">
            <span className="stat-label">RETRAITS TOTAUX</span>
            <div className="stat-value-group">
              <span className="stat-value text-red">2584</span>
              <span className="stat-currency text-red">XAF</span>
            </div>
          </div>
          <div className="stat-icon-wrapper text-red">
            <TrendingDown size={18} />
          </div>
        </div>

        <div 
          className={`stat-card stat-net ${activeStat === 'net' ? 'active' : ''}`}
          onClick={() => setActiveStat(activeStat === 'net' ? 'all' : 'net')}
        >
          <div className="stat-info">
            <span className="stat-label">DIFFÉRENCE NETTE</span>
            <div className="stat-value-group">
              <span className="stat-value text-blue">3486606</span>
              <span className="stat-currency text-blue">XAF</span>
            </div>
          </div>
          <div className="stat-icon-wrapper text-blue">
            <BarChart2 size={18} />
          </div>
        </div>
      </div>

      {/* Tableau des transactions */}
      <div className="table-card">
        <h2 className="table-title">Toutes les transactions</h2>
        <table className="slips-table">
          <thead>
            <tr>
              <th>DESCRIPTION</th>
              <th>AGENCE</th>
              <th>MONTANT</th>
              <th>STATUT</th>
              <th>CRÉE À</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="description-cell">
                    <div className="icon-box">
                      <CreditCard size={14} />
                    </div>
                    <span>{tx.description}</span>
                  </td>
                  <td className="agence-cell">
                    <div>{tx.agence}</div>
                    <div className="sub-city">{tx.ville}</div>
                  </td>
                  <td className="montant-cell">
                    <div className="amount-text">{tx.montant}</div>
                    <div className="payment-mode">{tx.mode}</div>
                  </td>
                  <td>
                    <span className="status-success">{tx.statut}</span>
                  </td>
                  <td className="date-cell">{tx.displayDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  Aucune transaction trouvée pour cette date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}