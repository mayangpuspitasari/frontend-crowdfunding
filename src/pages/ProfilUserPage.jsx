import React from 'react';
import FormProfil from '../components/FormProfil';
import RiwayatDonasi from '../components/RiwayatDonasi';

const ProfilUserPage = () => {
  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <FormProfil />
        <RiwayatDonasi />
      </div>
    </div>
  );
};

export default ProfilUserPage;