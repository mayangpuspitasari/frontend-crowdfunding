import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import LaporanTable from '../components/admin/LaporanTable';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const KelolaLaporanPage = () => {
  const [laporan, setLaporan] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLaporan = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/laporan/laporan_program?page=${page}&search=${search}`,
      );
      setLaporan(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data laporan:', err);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, [page, search]);

  const handleDetail = (laporan) => {
    const id = laporan.id_program;
    window.open(`http://localhost:5000/download/export/detail/${id}`, '_blank');
  };

  const handleCetakLaporan = () => {
    window.open('http://localhost:5000/download/export/pdf', '_blank');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-gray-800">Data Laporan</h3>
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleCetakLaporan}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm shadow"
              >
                Cetak Laporan
              </button>

              <SearchBarAdmin
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari Data Laporan"
              />
            </div>

            <LaporanTable data={laporan} onDetail={handleDetail} />

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

export default KelolaLaporanPage;

