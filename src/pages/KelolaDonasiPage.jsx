// File: KeloladonasiPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import DonasiTable from '../components/admin/DonasiTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
// import ModalTambahKategori from '../components/admin/ModalTambahKategori';
import { useEffect, useState } from 'react';
import axios from 'axios';

const KelolaDonasiPage = () => {
  const [donasi, setDonasi] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDonasi = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/donasi?page=${page}&search=${search}`,
        );
        setDonasi(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Gagal mengambil data Donasi:', err);
      }
    };

    fetchDonasi();
  }, [page, search]);


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">
                Data Donasi
              </h3>
            </div>
              <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Donasi"
            />
            <DonasiTable data={donasi} />

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

export default KelolaDonasiPage;
