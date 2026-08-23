import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, QrCode, X, MapPin } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Bookings.css';

export const BookingsPage = () => {
  const navigate = useNavigate();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const videoRef = useRef(null);

  // Données de démonstration identiques à l'image
  const bookingsData = [
    { id: 'BKG59776030', route: 'Yaoundé Bafoussam →', depart: '21/08/2026 23:30', reservation: '21/08/2026 15:33', passagers: '1 1', statut: 'Achèvement' },
    { id: 'BKG59776031', route: 'Yaoundé Bafoussam →', depart: '21/08/2026 22:30', reservation: '21/08/2026 15:28', passagers: '1 1', statut: 'Achèvement' },
    { id: 'BKG59776032', route: 'Yaoundé Bafoussam →', depart: '16/08/2026 22:30', reservation: '16/08/2026 17:29', passagers: '1 1', statut: 'Achèvement' },
    { id: 'BKG59776033', route: 'Douala Bafoussam →', depart: '13/08/2026 22:30', reservation: '13/08/2026 17:57', passagers: '1 1', statut: 'Achèvement' },
    { id: 'BKG59776034', route: 'Douala Bafoussam →', depart: '13/08/2026 22:30', reservation: '13/08/2026 17:52', passagers: '1 1', statut: 'Achèvement' },
    { id: 'BKG59776035', route: 'Yaoundé Bafoussam →', depart: '13/08/2026 22:30', reservation: '', passagers: '2', statut: 'Achèvement' },
  ];

  // Gestion du flux vidéo en direct avec la caméra
  useEffect(() => {
    let codeReader;
    if (isScannerOpen && videoRef.current) {
      codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          codeReader.reset();
          setIsScannerOpen(false);
          // Redirection vers les détails de la réservation scannée
          navigate(`/bookings/${result.getText()}`);
        }
      });
    }

    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [isScannerOpen, navigate]);

  return (
    <div className="bookings-container">
      {/* Titre et Action */}
      <div className="bookings-header">
        <div>
          <h1 className="bookings-title">Réservations complètes</h1>
          <p className="bookings-subtitle">
            Suivez les départs, le statut des passagers et la vérification des billets en un seul endroit.
          </p>
        </div>
        <button className="btn-scan-ticket" onClick={() => setIsScannerOpen(true)}>
          <QrCode size={16} />
          <span>Scanner un billet</span>
        </button>
      </div>

      {/* Tableau des réservations */}
      <div className="table-card">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>VOYAGE</th>
              <th>DATE DE DÉPART</th>
              <th>DATE DE LA RÉSERVATION</th>
              <th>PASSAGERS</th>
              <th>STATUT</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map((item) => (
              <tr key={item.id} onClick={() => navigate(`/bookings/${item.id}`)}>
                <td className="route-cell">
                  <MapPin size={14} className="pin-icon" />
                  <span>{item.route}</span>
                </td>
                <td className="date-cell">{item.depart}</td>
                <td className="date-cell">{item.reservation}</td>
                <td>
                  <span className="passenger-badge">{item.passagers}</span>
                </td>
                <td>
                  <span className="status-badge">{item.statut}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-wrapper">
          <button className="page-nav">«</button>
          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>
          <button className="page-number">4</button>
          <button className="page-nav">»</button>
        </div>
      </div>

      {/* MODAL DU SCANNER (Caméra directe) */}
      {isScannerOpen && (
        <div className="camera-modal-overlay">
          <div className="camera-modal-card">
            <div className="camera-modal-header">
              <h3>Scanner le code QR</h3>
              <button className="close-btn" onClick={() => setIsScannerOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="camera-modal-body">
              <video ref={videoRef} className="camera-video-feed" />
              <div className="scan-overlay-target"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;