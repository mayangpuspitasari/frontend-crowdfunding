import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import UserTable from '../components/admin/UserTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import ModalUser from '../components/admin/ModalUser';

const KelolaUserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `https://109.110.188.170:5000/user?page=${page}&search=${search}`,
      );
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data user:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleHapusUser = async (id_user) => {
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
        await axios.delete(`https://109.110.188.170:5000/user/${id_user}`);
        toast.success('User berhasil dihapus');
        fetchUsers();
      } catch (err) {
        console.error('Gagal menghapus user:', err);
        toast.error('Gagal menghapus user');
      }
    }
  };

  const handleSimpanUser = async (formUser) => {
    try {
      if (selectedUser) {
        await axios.put(
          `https://109.110.188.170:5000/user/${selectedUser.id_user}`,
          formUser,
        );
        toast.success('User berhasil diupdate');
      }
      setShowModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Gagal menyimpan user:', err);
      toast.error('Gagal menyimpan user');
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
              Data User
            </h3>

            <div className="flex justify-end items-center mb-4">
              <SearchBarAdmin
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari User"
              />
            </div>

            {/* Modal hanya untuk Edit */}
            {showModal && selectedUser && (
              <ModalUser
                isOpen={showModal}
                onClose={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
                onSave={handleSimpanUser}
                initialData={selectedUser}
                mode="edit"
              />
            )}

            <UserTable
              data={users}
              onEdit={handleEditUser}
              onDelete={handleHapusUser}
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

export default KelolaUserPage;

