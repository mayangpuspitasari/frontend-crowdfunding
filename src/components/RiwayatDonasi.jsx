import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RiwayatDonasi = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const id_user = localStorage.getItem('id_user');
        console.log('ID user:', id_user);
        const res = await axios.get(
          `http://localhost:5000/donasi/riwayat/${id_user}`,
        );
        setRiwayat(res.data);
      } catch (err) {
        console.error('Gagal mengambil riwayat:', err);
        setRiwayat([]); // jika gagal, tetap kosongkan
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mt-4">
      <h2 className="text-xl font-bold text-orange-500 mb-4">Riwayat Donasi</h2>

      {loading ? (
        <p className="text-gray-500 italic">Memuat data...</p>
      ) : riwayat.length === 0 ? (
        <div className="text-center text-gray-500 italic py-4">
          Belum pernah melakukan donasi.
        </div>
      ) : (
        <div className="overflow-auto rounded">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-orange-100 text-orange-700">
              <tr>
                <th className="p-3 border">No</th>
                <th className="p-3 border">Judul Donasi</th>
                <th className="p-3 border">Jumlah</th>
                <th className="p-3 border">Tanggal</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item, index) => (
                <tr key={item.id_donasi} className="hover:bg-orange-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{item.judul_donasi}</td>
                  <td className="p-3 border">
                    Rp {Number(item.jumlah_donasi).toLocaleString('id-ID')}
                  </td>
                  <td className="p-3 border">
                    {new Date(item.tanggal_donasi).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td
                    className={`p-3 border font-semibold ${
                      item.status_donasi.toLowerCase() === 'berhasil'
                        ? 'text-green-600'
                        : item.status_donasi.toLowerCase() === 'menunggu'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {item.status_donasi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RiwayatDonasi;

