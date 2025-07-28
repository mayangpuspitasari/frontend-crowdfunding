import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import ProgramTable from '../components/admin/ProgramTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import ModalProgram from '../components/admin/ModalProgram';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const KelolaProgramPage = () => {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null); // null = tambah, ada = edit

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(
        `http://109.110.188.170:5000/program?page=${page}&search=${search}`,
      );
      setPrograms(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data program:', err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [page, search]);

  const handleTambahProgram = () => {
    setSelectedProgram(null); // mode tambah
    setShowModal(true);
  };

  const handleEditProgram = (program) => {
    setSelectedProgram(program); // mode edit
    setShowModal(true);
  };

  const handleHapusProgram = async (id_program) => {
    try {
      await axios.delete(`http://109.110.188.170:5000/program/${id_program}`);
      toast.success('Program berhasil dihapus');
      fetchPrograms();
    } catch (err) {
      console.error('Gagal menghapus program:', err);
      toast.error('Gagal menghapus program');
    }
  };

  const handleSimpanProgram = async (formData) => {
    try {
      if (selectedProgram) {
        // Edit
        await axios.put(
          `http://109.110.188.170:5000/program/${selectedProgram.id_program}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
        toast.success('Program berhasil diupdate');
      } else {
        // Tambah
        await axios.post('http://109.110.188.170:5000/program', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Program berhasil ditambahkan');
      }

      setShowModal(false);
      fetchPrograms();
    } catch (error) {
      console.error('Gagal menyimpan program:', error);
      toast.error('Gagal menyimpan program');
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
              Data Program Donasi
            </h3>

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleTambahProgram}
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

            {/* Modal */}
            <ModalProgram
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSimpanProgram}
              initialData={selectedProgram}
              mode={selectedProgram ? 'edit' : 'tambah'}
            />

            {/* Table */}
            <ProgramTable
              data={programs}
              onEdit={handleEditProgram}
              onDelete={handleHapusProgram}
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

export default KelolaProgramPage;

