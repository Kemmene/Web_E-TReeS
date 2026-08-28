import React, { useState } from 'react';
import { 
  Search, Filter, Download, ArrowUpRight, ArrowDownLeft, 
  CheckCircle, Clock, XCircle, FileText, ChevronLeft, ChevronRight
} from 'lucide-react';
import './Transactions.css';

const initialTransactions = [
  { id: 'TXN-9042', date: '2026-08-19 14:22', type: 'Dépôt', method: 'MTN MoMo', amount: 25000, status: 'Succès', reference: 'MOMO-8839201' },
  { id: 'TXN-9041', date: '2026-08-19 12:10', type: 'Retrait', method: 'Orange Money', amount: 15000, status: 'En attente', reference: 'OM-1102938' },
  { id: 'TXN-9040', date: '2026-08-18 18:45', type: 'Dépôt', method: 'Carte Bancaire', amount: 50000, status: 'Succès', reference: 'CARD-9920112' },
  { id: 'TXN-9039', date: '2026-08-18 09:15', type: 'Retrait', method: 'MTN MoMo', amount: 10000, status: 'Échoué', reference: 'MOMO-0029182' },
  { id: 'TXN-9038', date: '2026-08-17 16:30', type: 'Dépôt', method: 'Orange Money', amount: 30000, status: 'Succès', reference: 'OM-4402910' },
];

export const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTransactions = initialTransactions.filter((txn) => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          txn.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesType = typeFilter === 'all' || txn.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Succès':
        return <span className="status-badge success"><CheckCircle size={14} /> Succès</span>;
      case 'En attente':
        return <span className="status-badge pending"><Clock size={14} /> En attente</span>;
      case 'Échoué':
        return <span className="status-badge failed"><XCircle size={14} /> Échoué</span>;
      default:
        return null;
    }
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <div>
          <h1 className="transactions-title">Historique des Transactions</h1>
          <p className="transactions-subtitle">Suivez et gérez l'ensemble des flux financiers de l'agence.</p>
        </div>

        <button className="export-btn">
          <Download size={18} />
          <span>Exporter CSV</span>
        </button>
      </div>

      <div className="filters-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher par ID ou Référence..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-selects">
          <div className="select-wrapper">
            <Filter size={16} />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Tous les types</option>
              <option value="Dépôt">Dépôt</option>
              <option value="Retrait">Retrait</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tous les statuts</option>
              <option value="Succès">Succès</option>
              <option value="En attente">En attente</option>
              <option value="Échoué">Échoué</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-card">
        {filteredTransactions.length > 0 ? (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>ID Transaction</th>
                <th>Référence</th>
                <th>Moyen de paiement</th>
                <th>Date & Heure</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>
                    <div className={`type-icon-wrapper ${txn.type === 'Dépôt' ? 'depot' : 'retrait'}`}>
                      {txn.type === 'Dépôt' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      <span>{txn.type}</span>
                    </div>
                  </td>
                  <td className="font-mono font-bold">{txn.id}</td>
                  <td className="font-mono text-subtle">{txn.reference}</td>
                  <td>{txn.method}</td>
                  <td className="text-subtle">{txn.date}</td>
                  <td className="font-bold">
                    {txn.type === 'Dépôt' ? '+' : '-'}{txn.amount.toLocaleString()} FCFA
                  </td>
                  <td>{getStatusBadge(txn.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-icon-circle">
              <FileText size={28} />
            </div>
            <p className="empty-title">Aucune transaction trouvée</p>
            <p className="empty-desc">Essayez de modifier vos filtres ou vos termes de recherche.</p>
          </div>
        )}

        <div className="table-pagination">
          <span className="pagination-info">
            Affichage de <strong>{filteredTransactions.length}</strong> sur <strong>{initialTransactions.length}</strong> transactions
          </span>
          <div className="pagination-buttons">
            <button disabled><ChevronLeft size={16} /></button>
            <button className="active">1</button>
            <button disabled>  <ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};