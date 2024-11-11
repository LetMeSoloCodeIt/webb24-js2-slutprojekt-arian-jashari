import React from 'react';
import './ConfirmationPage.css'; // Importera CSS-fil

const ConfirmationPage = () => {
  return    (
    <div className="confirmation-page">
        {/* Bekräftels efter ett lyckat köp */}
      <h1>Tack för ditt köp!</h1>
      <p>Ditt köp har genomförts framgångsrikt.</p>
    </div>
         );
};

export default ConfirmationPage;
