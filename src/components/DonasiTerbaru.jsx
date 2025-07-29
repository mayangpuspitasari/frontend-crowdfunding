import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DonasiCard from './DonasiCard';
import axios from 'axios';

const DonasiTerbaru = () => {
  const [donasi, setDonasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://109.110.188.170:5000/program/terbaru')
      .then((res) => {
        setDonasi(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Gagal fetch data:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-orange-50 px-4 md:px-8">
      <div className="flex justify-between items-center px-4 mb-4">
        <h1 className="text-2xl font-bold text-orange-500">
          Mari Bantu Bersama
        </h1>
        <Link to="/program" className="text-blue-600 hover:underline">
          Lihat Semua Program
        </Link>
      </div>

      {/* Loading */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-12 justify-center">
          {donasi.map((item) => (
            <DonasiCard
              key={item.id_program}
              id_program={item.id_program}
              judul={item.judul_program}
              terkumpul={item.total_terkumpul}
              target={item.target_donasi}
              hariLagi={item.hari_tersisa}
              donatur={item.jumlah_donatur}
              gambar={item.gambar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DonasiTerbaru;

