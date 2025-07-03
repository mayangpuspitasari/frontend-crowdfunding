// File: KeloladonasiPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import DonasiTable from '../components/admin/DonasiTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
// import ModalTambahKategori from '../components/admin/ModalTambahKategori';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const KelolaDonasiPage = () => {
  const [donasi, setDonasi] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    fetchDonasi();
  }, [page, search]);

  // Fungsi hapus donasi
  const handleHapus = async (id) => {
    Swal.fire({
      title: 'Hapus Donasi?',
      text: 'Apakah kamu yakin ingin menghapus donasi ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/donasi/${id}`);
          Swal.fire('Berhasil!', 'Donasi berhasil dihapus.', 'success');
          fetchDonasi();
        } catch (err) {
          console.error('Gagal menghapus donasi:', err);
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
        }
      }
    });
  };

  const handleVerifikasi = (id_donasi) => {
    Swal.fire({
      title: 'Verifikasi Donasi',
      text: 'Pilih status verifikasi donasi ini:',
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Berhasil',
      denyButtonText: 'Gagal',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await axios.put(
            `http://localhost:5000/donasi/verifikasi_berhasil/${id_donasi}`,
          );
          Swal.fire(
            'Berhasil!',
            'Donasi diverifikasi sebagai Berhasil.',
            'success',
          );
          fetchDonasi(); // refresh data
        } else if (result.isDenied) {
          await axios.put(
            `http://localhost:5000/donasi/verifikasi_gagal/${id_donasi}`,
          );
          Swal.fire(
            'Ditetapkan Gagal!',
            'Donasi ditandai sebagai Gagal.',
            'info',
          );
          fetchDonasi(); // refresh data
        }
      } catch (err) {
        console.error('Gagal memverifikasi:', err);
        Swal.fire('Error', 'Terjadi kesalahan saat verifikasi.', 'error');
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">Data Donasi</h3>
            </div>
            <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Donasi"
            />
            <DonasiTable
              data={donasi}
              onVerifikasi={handleVerifikasi}
              onHapus={handleHapus}
            />

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

