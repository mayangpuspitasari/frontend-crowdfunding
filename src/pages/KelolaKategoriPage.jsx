// File: KelolaKategoriPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import KategoriTable from '../components/admin/KategoriTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import ModalTambahKategori from '../components/admin/ModalTambahKategori';
import { useEffect, useState } from 'react';
import axios from 'axios';

const KelolaKategoriPage = () => {
  const [kategori, setKategori] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/kategori?page=${page}&search=${search}`,
        );
        setKategori(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Gagal mengambil data kategori:', err);
      }
    };

    fetchUsers();
  }, [page, search]);

  const handleTambahKategori = () => {
  setShowModal(true);
};

const handleSimpanKategori = async (kategoriBaru) => {
  try {
    await axios.post('http://localhost:5000/kategori', {
      jenis_kategori: kategoriBaru,
    });
    // Refresh data
    const res = await axios.get(
      `http://localhost:5000/kategori?page=${page}&search=${search}`,
    );
    setKategori(res.data.data);
    setTotalPages(res.data.totalPages);
  } catch (error) {
    console.error('Gagal menambahkan kategori:', error);
  }
};

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">
                Data Kategori
              </h3>
            </div>

          <div className="flex items-center justify-between mb-6">
            <button
                onClick={handleTambahKategori}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm shadow"
              >
                + Tambah Kategori
              </button>

              <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Kategori"
            />
          </div>

            <ModalTambahKategori
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSave={handleSimpanKategori}
/>


            

            <KategoriTable data={kategori} />

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

export default KelolaKategoriPage;
