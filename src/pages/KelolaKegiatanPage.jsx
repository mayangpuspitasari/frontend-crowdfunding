// File: KeloladonasiPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import KegiatanTable from '../components/admin/KegiatanTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
// import ModalTambahKegiatan from '../components/admin/ModalTambahKegiatan';
import { useEffect, useState } from 'react';
import axios from 'axios';

const KelolaKegiatanPage = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/kegiatan?page=${page}&search=${search}`,
        );
        setKegiatan(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Gagal mengambil data Kegiatan:', err);
      }
    };

    fetchKegiatan();
  }, [page, search]);

// const handleTambahKegiatan = () => {
//   setShowModal(true);
// };

// const handleSimpanKegiatan = async (kegiatanBaru) => {
//   try {
//     await axios.post('http://localhost:5000/kegiatan', {
//       judul_kegiatan: kegiatanBaru,
//     });
//     // Refresh data
//     const res = await axios.get(
//       `http://localhost:5000/kegiatan?page=${page}&search=${search}`,
//     );
//     setKegiatan(res.data.data);
//     setTotalPages(res.data.totalPages);
//   } catch (error) {
//     console.error('Gagal menambahkan kegiatan:', error);
//   }
// };
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">
                Data Kegiatan
              </h3>
            </div>
              <div className="flex items-center justify-between mb-6">
            <button
                onClick=""
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm shadow"
              >
                + Tambah Kegiatan
              </button>

              <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Kegiatan"
            />
          </div>

            <KegiatanTable data={kegiatan} />

            <Pagination
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default KelolaKegiatanPage;
