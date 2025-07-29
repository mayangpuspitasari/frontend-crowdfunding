import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Donasi from '../components/Donasi';

const DonasiPage = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`https://109.110.188.170:5000/program/${id}`);
        const data = await response.json();
        setProgram(data);
        setLoading(false);
      } catch (error) {
        console.error('Gagal mengambil data program:', error);
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (!program)
    return <p className="text-center text-red-500">Program tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <Donasi program={program} />
    </div>
  );
};

export default DonasiPage;

