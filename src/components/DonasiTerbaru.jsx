import React, { useEffect, useState } from 'react';
import DonasiCard from './DonasiCard';
import axios from 'axios';

const DonasiTerbaru = () => {
  const [donasi, setDonasi] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/program/terbaru')
      .then((res) => {
        console.log('Data donasi terbaru:', res.data);
        setDonasi(res.data);
      })
      .catch((err) => {
        console.error('Gagal fetch data:', err);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {donasi.map((item) => (
        <DonasiCard
          key={item.id_program}
          judul={item.judul_program}
          terkumpul={item.total_terkumpul}
          target={item.target_donasi}
          hariLagi={item.hari_tersisa}
          donatur={item.jumlah_donatur}
          gambar={item.gambar}
        />
      ))}
    </div>
  );
};

export default DonasiTerbaru;

