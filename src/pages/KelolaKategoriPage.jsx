// File: KelolaKategoriPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import KategoriTable from '../components/admin/KategoriTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import ModalKategori from '../components/admin/ModalKategori';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const KelolaKategoriPage = () => {
  const [kategori, setKategori] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState(null); // Untuk edit

  const fetchKategori = async () => {
    try {
      const res = await axios.get(
        `http://109.110.188.170:5000/kategori?page=${page}&search=${search}`,
      );
      setKategori(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data kategori:', err);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, [page, search]);

  const handleTambahKategori = () => {
    setSelectedKategori(null); // Mode tambah
    setShowModal(true);
  };

  const handleEditKategori = (kategori) => {
    setSelectedKategori(kategori); // Mode edit
    setShowModal(true);
  };

  const handleHapusKategori = async (id_kategori) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data kategori akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://109.110.188.170:5000/kategori/${id_kategori}`,
        );
        await fetchKategori(); // Refresh

        toast.success('Kategori berhasil dihapus');
      } catch (error) {
        console.error('Gagal menghapus kategori:', error);
        toast.error('Gagal menghapus kategori');
      }
    }
  };

  const handleSimpanKategori = async (jenisKategori) => {
    try {
      if (selectedKategori) {
        // Mode Edit
        await axios.put(
          `http://109.110.188.170:5000/kategori/${selectedKategori.id_kategori}`,
          {
            jenis_kategori: jenisKategori,
          },
        );
      } else {
        // Mode Tambah
        await axios.post(`http://109.110.188.170:5000/kategori`, {
          jenis_kategori: jenisKategori,
        });
      }
      fetchKategori(); // Refresh
      toast.success('Kategori berhasil disimpan');
    } catch (error) {
      console.error('Gagal menyimpan kategori:', error);
      toast.error('Gagal menyimpan kategori');
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
              <h3 className="font-bold text-xl text-gray-800">Data Kategori</h3>
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

            <ModalKategori
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSimpanKategori}
              initialValue={
                selectedKategori ? selectedKategori.jenis_kategori : ''
              }
              mode={selectedKategori ? 'edit' : 'tambah'}
            />

            <KategoriTable
              data={kategori}
              onEdit={handleEditKategori}
              onDelete={handleHapusKategori}
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

export default KelolaKategoriPage;

