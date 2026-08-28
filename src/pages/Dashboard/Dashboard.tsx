import React, { useState } from 'react';
import { 
  Calendar, TrendingUp, Smartphone, Users, Bus, 
  MoreVertical, FileText, ChevronRight, ArrowDownRight, X, ShieldAlert, Clock,
  Loader2
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { useDashboard, useCreatePaymentDemand } from '@lib';
import './Dashboard.css';

const formatChartData = (diagrams: any) => {
  if (!diagrams) return [];
  return diagrams.booking_period?.map((d: any) => ({ day: d.label, val: d.value })) || [];
};

const formatCategoryData = (diagrams: any) => {
  if (!diagrams) return [];
  return diagrams.booking_category?.map((d: any) => ({ name: d.label, value: d.value, color: d.color })) || [
    { name: 'Classique', value: 45, color: '#39BBD0' },
    { name: 'VIP', value: 30, color: '#16293D' },
    { name: 'Prestige', value: 25, color: '#EE7F20' }
  ];
};

const formatBookingTrends = (diagrams: any) => {
  if (!diagrams) return [];
  return diagrams.booking_period?.map((d: any) => ({ day: d.label, count: d.value })) || [
    { day: 'Mon', count: 120 },
    { day: 'Tue', count: 135 },
    { day: 'Wed', count: 110 },
    { day: 'Thu', count: 190 },
    { day: 'Fri', count: 250 },
    { day: 'Sat', count: 280 },
    { day: 'Sun', count: 270 }
  ];
};

export const DashboardPage = () => {
  const [trendView, setTrendView] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState('');
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawSource, setWithdrawSource] = useState('momo');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [agency, setAgency] = useState('');

  const { data: dashboard, isLoading, error, refetch } = useDashboard();
  const createPaymentDemand = useCreatePaymentDemand();

  const handleMaxClick = () => {
    const balances = dashboard ? {
      momo: dashboard.momo_balance,
      om: dashboard.om_balance,
      card: dashboard.card_balance,
    } : { momo: 0, om: 0, card: 0 };
    setWithdrawAmount(balances[withdrawSource] || 0);
  };

  const handleSubmitWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dashboard) return;
    
    try {
      await createPaymentDemand.mutateAsync({
        amount: parseInt(withdrawAmount),
        payment_method: withdrawSource as 'momo' | 'om' | 'card',
        payment_destination: agency,
      });
      alert(`Demande de retrait de ${withdrawAmount} FCFA via ${withdrawSource.toUpperCase()} envoyée avec succès.`);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      refetch();
    } catch (err) {
      alert('Erreur lors de la demande de retrait');
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container p-8 text-center">
        <p className="text-red-500">Erreur de chargement du tableau de bord</p>
        <button onClick={() => refetch()} className="mt-4 btn-primary">Réessayer</button>
      </div>
    );
  }

  const balances = dashboard ? {
    momo: dashboard.momo_balance,
    om: dashboard.om_balance,
    card: dashboard.card_balance,
  } : { momo: 0, om: 0, card: 0 };

  const turnoverData = formatChartData(dashboard?.diagrams);
  const categoryData = formatCategoryData(dashboard?.diagrams);
  const bookingTrendsData = formatBookingTrends(dashboard?.diagrams);

  const userName = 'Utilisateur';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Bonjour, {userName}</h1>
          <p className="dashboard-subtitle">Voici un aperçu de vos opérations aujourd'hui.</p>
        </div>

        <div className="header-actions">
          <div className="date-filter-wrapper">
            <Calendar size={18} className="date-icon" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>

          <button 
            className="withdraw-btn"
            onClick={() => setIsWithdrawModalOpen(true)}
          >
            <ArrowDownRight size={18} />
            <span>Retrait</span>
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="flex justify-between items-start">
            <span className="kpi-title">MTN MOMO</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center font-bold text-yellow-600 text-xs">
              MoMo
            </div>
          </div>
          <div className="mt-3">
            <h3 className="kpi-value">{balances.momo.toLocaleString()} FCFA</h3>
            <p className="kpi-subtext">Total encaissé</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex justify-between items-start">
            <span className="kpi-title">ORANGE MONEY</span>
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-xs">
              OM
            </div>
          </div>
          <div className="mt-3">
            <h3 className="kpi-value">{balances.om.toLocaleString()} FCFA</h3>
            <p className="kpi-subtext">Total encaissé</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex justify-between items-start">
            <span className="kpi-title">TOTAL TURNOVER</span>
            <div className="kpi-icon-wrapper bg-blue-50 text-teal-500">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="kpi-value">{(balances.momo + balances.om + balances.card).toLocaleString()} FCFA</h3>
            <p className="kpi-subtext text-emerald-600">
              ↑ +0.0% <span className="text-gray-400">vs dernière période</span>
            </p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex justify-between items-start">
            <span className="kpi-title">BOOKING</span>
            <div className="kpi-icon-wrapper bg-gray-100 text-navy-900">
              <Smartphone size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="kpi-value">{dashboard?.total_bookings || 0}</h3>
            <p className="kpi-subtext">Réservations du jour</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex justify-between items-start">
            <span className="kpi-title">PASSENGERS</span>
            <div className="kpi-icon-wrapper bg-gray-100 text-navy-900">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="kpi-value">{dashboard?.total_passengers || 0}</h3>
            <p className="kpi-subtext">Total enregistrés</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="flex justify-between items-start">
            <span className="kpi-title">TRAVELS</span>
            <div className="kpi-icon-wrapper bg-gray-100 text-navy-900">
              <Bus size={18} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="kpi-value">{dashboard?.total_travels || 0}</h3>
            <p className="kpi-subtext">Trajets actifs</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card-large">
          <div className="card-header">
            <h2 className="card-title">Aperçu du chiffre d'affaires</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={18} />
            </button>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoverData.length > 0 ? turnoverData : [{ day: '1', val: 0 }]}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `${v}k`} />
                <Tooltip />
                <Line type="monotone" dataKey="val" stroke="#39BBD0" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-gray-400">Jour du mois</p>
        </div>

        <div className="chart-card-small">
          <div className="card-header">
            <h2 className="card-title">Catégories</h2>
          </div>
          <div className="h-48 my-auto relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={categoryData} 
                  innerRadius={55} 
                  outerRadius={80} 
                  paddingAngle={2} 
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-surface-border">
            {categoryData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-navy-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="chart-card-large">
          <div className="card-header">
            <h2 className="card-title">Tendances des réservations</h2>
            <div className="toggle-btn-group">
              <button 
                onClick={() => setTrendView('weekly')}
                className={`toggle-btn ${trendView === 'weekly' ? 'toggle-btn-active' : ''}`}
              >
                Hebdomadaire
              </button>
              <button 
                onClick={() => setTrendView('monthly')}
                className={`toggle-btn ${trendView === 'monthly' ? 'toggle-btn-active' : ''}`}
              >
                Mensuel
              </button>
            </div>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingTrendsData} barSize={36}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4B5563' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" fill="#16293D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="transactions-card">
          <div className="card-header">
            <h2 className="card-title">Dernières transactions</h2>
            <button className="text-teal-500 font-bold text-xs flex items-center gap-1 hover:underline">
              <span>Tout voir</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {dashboard?.transactions && dashboard.transactions.length > 0 ? (
            <div className="space-y-3">
              {dashboard.transactions.slice(0, 5).map((tx: any) => (
                <div key={tx.reference} className="flex justify-between items-center py-2 border-b border-surface-border">
                  <div>
                    <p className="font-medium text-sm">{tx.title}</p>
                    <p className="text-xs text-gray-500">{tx.agency?.name} - {tx.payment_method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-teal-500">{tx.amount.toLocaleString()} FCFA</p>
                    <p className="text-xs text-gray-500 capitalize">{tx.status?.toLowerCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon-circle">
                <FileText size={28} />
              </div>
              <p className="font-title font-bold text-navy-900 text-base">Aucune transaction pour le moment</p>
            </div>
          )}
        </div>
      </div>

      {isWithdrawModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container withdraw-modal">
            <div className="modal-header">
              <h2>Demande de retrait</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setIsWithdrawModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitWithdrawal} className="modal-form">
              <div className="security-notice-box">
                <ShieldAlert size={20} className="notice-icon" />
                <p>« Pour des raisons de sécurité, nous vérifions ces informations avant d'approuver la transaction. »</p>
              </div>

              <div className="form-group">
                <label>Agence</label>
                <select 
                  value={agency} 
                  onChange={(e) => setAgency(e.target.value)}
                  required 
                >
                  {dashboard?.agencies?.map((a: any) => (
                    <option key={a.reference} value={a.reference}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Retrait de</label>
                <select 
                  value={withdrawSource} 
                  onChange={(e) => setWithdrawSource(e.target.value)}
                >
                  <option value="momo">MTN Momo ({balances.momo.toLocaleString()} FCFA)</option>
                  <option value="om">Orange Money ({balances.om.toLocaleString()} FCFA)</option>
                  <option value="card">Par carte ({balances.card.toLocaleString()} FCFA)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Montant du retrait</label>
                <div className="amount-input-wrapper">
                  <input 
                    type="number" 
                    placeholder="Saisissez le montant" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="max-btn"
                    onClick={handleMaxClick}
                  >
                    MAX
                  </button>
                </div>
              </div>

              <div className="pending-notice-box">
                <Clock size={16} />
                <span>Vérification manuelle en attente par le personnel.</span>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsWithdrawModalOpen(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary" disabled={createPaymentDemand.isPending}>
                  {createPaymentDemand.isPending ? 'Traitement...' : 'Valider le retrait'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};