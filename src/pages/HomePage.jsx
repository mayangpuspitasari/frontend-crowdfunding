import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InformasiDonasi from '../components/InformasiDonasi';
import DonasiTerbaru from '../components/DonasiTerbaru';


const HomePage = () => {
  const [dataRingkasan, setDataRingkasan] = useState({
    totalProgram: 0,
    totalDonasi: 0,
    totalDonatur: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/program/ringkasan')
      .then((res) => res.json())
      .then((data) => {
        setDataRingkasan(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil data ringkasan:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Hero />
      {loading ? (
        <p className="text-center py-6 text-orange-500 font-semibold">
          Memuat data donasi...
        </p>
      ) : (
        <InformasiDonasi data={dataRingkasan} />
      )}
      <DonasiTerbaru />
    </div>
  );
};

export default HomePage;

