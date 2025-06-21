// File: KelolaUserPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import ProgramTable from '../components/admin/ProgramTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

const KelolaProgramPage = () => {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/program?page=${page}&search=${search}`,
        );
        setPrograms(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Gagal mengambil data program:', err);
      }
    };

    fetchPrograms();
  }, [page, search]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-3">
              Data Program Donasi
            </h3>
           <div className="flex items-center justify-between mb-6">
            <button
                onClick=""
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm shadow"
              >
                + Tambah Program Donasi
              </button>

              <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Program Donasi"
            />
          </div>
            <ProgramTable data={programs} />
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

export default KelolaProgramPage;

