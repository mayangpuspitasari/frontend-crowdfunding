// File: KeloladonasiPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import KegiatanTable from '../components/admin/KegiatanTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import ModalKegiatan from '../components/admin/ModalKegiatan';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const KelolaKegiatanPage = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null); // null = tambah, ada = edit

  const fetchKegiatan = async () => {
    try {
      const res = await axios.get(
        `https://109.110.188.170:5000/kegiatan?page=${page}&search=${search}`,
      );
      setKegiatan(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data kegiatan:', err);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, [page, search]);

  const handleTambahKegiatan = () => {
    setSelectedKegiatan(null); // mode tambah
    setShowModal(true);
  };

  const handleEditKegiatan = (kegiatan) => {
    setSelectedKegiatan(kegiatan); // mode edit
    setShowModal(true);
  };

  const handleHapusKegiatan = async (id_kegiatan) => {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data pengguna akan dihapus secara permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `https://109.110.188.170:5000/kegiatan/${id_kegiatan}`,
        );
        toast.success('Kegiatan berhasil dihapus');
        fetchKegiatan();
      } catch (err) {
        console.error('Gagal menghapus kegiatan:', err);
        toast.error('Gagal menghapus kegiatan');
      }
    }
  };

  const handleSimpanKegiatan = async (formData) => {
    try {
      if (selectedKegiatan) {
        // Edit
        await axios.put(
          `https://109.110.188.170:5000/kegiatan/${selectedKegiatan.id_kegiatan}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        toast.success('Kegiatan berhasil diupdate');
      } else {
        // Tambah
        await axios.post('https://109.110.188.170:5000/kegiatan', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Kegiatan berhasil ditambahkan');
      }

      setShowModal(false);
      fetchKegiatan();
    } catch (error) {
      console.error('Gagal menyimpan kegiatan:', error);
      toast.error('Gagal menyimpan kegiatan');
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
              <h3 className="font-bold text-xl text-gray-800">Data Kegiatan</h3>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleTambahKegiatan}
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

            {/* modal */}
            <ModalKegiatan
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSimpanKegiatan}
              initialData={selectedKegiatan}
              mode={selectedKegiatan ? 'edit' : 'tambah'}
            />

            <KegiatanTable
              data={kegiatan}
              onEdit={handleEditKegiatan}
              onDelete={handleHapusKegiatan}
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

export default KelolaKegiatanPage;

