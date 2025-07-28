import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Struktur = () => {
  const [struktur, setStruktur] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://109.110.188.170:5000/instansi/struktur',
        );
        setStruktur(response.data.struktur); // Ambil hanya URL gambarnya
      } catch (error) {
        console.error('Gagal mengambil struktur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen px-4 md:px-12 py-10">
      <h1 className="text-2xl font-bold text-orange-600 text-center mb-8">
        Struktur Organisasi LAZISMU Asahan
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">
          Memuat struktur organisasi...
        </p>
      ) : struktur ? (
        <div className="flex justify-center">
          <img
            src={encodeURI(`http://109.110.188.170:5000${struktur}`)}
            alt="Struktur Organisasi"
            className="rounded-lg shadow-xl max-w-full md:max-w-3xl"
          />
        </div>
      ) : (
        <p className="text-center text-red-500">
          Gambar struktur tidak tersedia
        </p>
      )}
    </div>
  );
};

export default Struktur;

