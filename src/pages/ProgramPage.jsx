import { useEffect, useState } from 'react';
import KategoriDonasi from '../components/KategoriDonasi';
import SemuaDonasi from '../components/SemuaDonasi';

const ProgramPage = () => {
  const [dataKategori, setDataKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  useEffect(() => {
    fetch('https://109.110.188.170:5000/kategori')
      .then((res) => res.json())
      .then((data) => {
        setDataKategori([
          'Semua',
          ...data.data.map((item) => item.jenis_kategori),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal Mengambil Data Kategori:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen">
      {!loading && (
        <KategoriDonasi
          categories={dataKategori}
          selected={selectedKategori}
          onSelect={setSelectedKategori}
        />
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold text-orange-500 mb-4">
          Program Donasi: {selectedKategori}
        </h2>
        {/* Nanti tampilkan list program donasi sesuai kategori */}
      </div>

      <div className="">
        {!loading && <SemuaDonasi kategori={selectedKategori} />}
      </div>
    </div>
  );
};

export default ProgramPage;

