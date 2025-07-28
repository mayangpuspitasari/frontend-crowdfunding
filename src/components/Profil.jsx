import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInfoCircle, FaEye, FaCheckCircle } from 'react-icons/fa';

const Profil = () => {
  const [profil, setProfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://109.110.188.170:5000/instansi/profil',
        );
        setProfil(response.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk memecah misi menjadi list per huruf (a., b., c.)
  const renderMisiList = (misiText) => {
    return misiText.split(/(?=[a-c]\.)/i).map((item, index) => (
      <li key={index} className="mb-1">
        {item.trim()}
      </li>
    ));
  };

  return (
    <div className="bg-orange-50 px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">
        Tentang LAZISMU Asahan
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : profil ? (
        <div className="grid gap-6">
          {/* Deskripsi */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-500 mb-2 flex items-center">
              <FaInfoCircle className="mr-2" />
              Deskripsi
            </h2>
            <p className="text-justify text-gray-700">{profil.deskripsi}</p>
          </div>

          {/* Visi */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-500 mb-2 flex items-center">
              <FaEye className="mr-2" />
              Visi
            </h2>
            <p className="text-justify text-gray-700">{profil.visi}</p>
          </div>

          {/* Misi */}
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-orange-400">
            <h2 className="text-xl font-semibold text-orange-500 mb-2 flex items-center">
              <FaCheckCircle className="mr-2" />
              Misi
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {renderMisiList(profil.misi)}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Data tidak ditemukan</p>
      )}
    </div>
  );
};

export default Profil;

