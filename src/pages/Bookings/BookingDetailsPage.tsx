import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, QrCode, Printer } from 'lucide-react';
import './BookingDetails.css';

export const BookingDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Données de démonstration basées sur la capture
  const bookingData = {
    ref: id || 'BKG59776030',
    route: 'Mimboman (Yaounde) Bafoussam (Bafoussam) →',
    status: 'Completed',
    departure: 'Aug, 21, 2026 23:30',
    price: '6000 FCFA',
    category: 'Prestige',
    passenger: {
      fullName: 'Aurel',
      seatNumber: '68',
      phoneNumber: '+237675909090',
      cardId: 'Hshw',
      boardingTime: '----',
    },
  };

  return (
    <div className="booking-details-container">
      {/* Barre de recherche d'en-tête */}
      <div className="details-top-bar">
        <button className="back-btn" onClick={() => navigate('/bookings')}>
          <ArrowLeft size={18} />
        </button>
        <div className="search-bar-input">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search for reservation or passenger" />
        </div>
      </div>

      {/* Action Scan another ticket */}
      <div className="scan-action-wrapper">
        <button className="btn-scan-another" onClick={() => navigate('/bookings?scan=true')}>
          <QrCode size={16} />
          <span>Scan another ticket</span>
        </button>
      </div>

      {/* Carte principale des détails */}
      <div className="details-card">
        <div className="details-header">
          <div>
            <h1 className="details-title">Booking details</h1>
            <p className="details-route">{bookingData.route}</p>
          </div>
          <span className="status-badge-completed">{bookingData.status}</span>
        </div>

        {/* Métadonnées */}
        <div className="metadata-grid">
          <div className="meta-item">
            <span className="meta-label">BOOKING REF</span>
            <span className="meta-value font-bold">{bookingData.ref}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">DEPARTURE</span>
            <span className="meta-value">{bookingData.departure}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">PRICE</span>
            <span className="meta-value">{bookingData.price}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">CATEGORY</span>
            <span className="meta-value">{bookingData.category}</span>
          </div>
        </div>

        {/* Tableau Passager */}
        <div className="table-wrapper">
          <table className="passenger-table">
            <thead>
              <tr>
                <th>FULL NAME</th>
                <th>SEAT NUMBER</th>
                <th>PHONE NUMBER</th>
                <th>CARD ID</th>
                <th>BOARDING TIME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bookingData.passenger.fullName}</td>
                <td className="highlight-blue">{bookingData.passenger.seatNumber}</td>
                <td>{bookingData.passenger.phoneNumber}</td>
                <td>{bookingData.passenger.cardId}</td>
                <td>{bookingData.passenger.boardingTime}</td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-confirm">Confirm</button>
                    <button className="btn-print" title="Imprimer le billet">
                      <Printer size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer className="details-footer">
        DISCOM SARL © 2026. All right reserved.
      </footer>
    </div>
  );
};

export default BookingDetailsPage;