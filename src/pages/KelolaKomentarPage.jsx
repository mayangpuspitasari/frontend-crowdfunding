import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import KomentarTable from '../components/admin/KomentarTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const KelolaUserPage = () => {
  const [komentar, setKomentar] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchKomentar = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/komentar?page=${page}&search=${search}`,
      );
      setKomentar(res.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data komentar:', err);
    }
  };

  useEffect(() => {
    fetchKomentar();
  }, [page, search]);

  const handleHapusKomentar = async (id_komentar) => {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Komentar akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/komentar/${id_komentar}`);
        toast.success('Komentar berhasil dihapus');
        fetchKomentar();
      } catch (err) {
        console.error('Gagal menghapus komentar:', err);
        toast.error('Gagal menghapus komentar');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-3">
              Data Komentar
            </h3>

            <div className="flex justify-end items-center mb-4">
              <SearchBarAdmin
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari Komentar"
              />
            </div>

            <KomentarTable data={komentar} onDelete={handleHapusKomentar} />
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

export default KelolaUserPage;

