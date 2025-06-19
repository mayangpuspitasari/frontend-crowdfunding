// File: KelolaUserPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import UserTable from '../components/admin/UserTable';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import { useEffect, useState } from 'react';

const KelolaUserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setUsers([
      {
        id_user: 1,
        username: 'admin',
        email: 'admin@mail.com',
        no_hp: '0821',
        tanggal_daftar: '2024-01-01',
      },
      {
        id_user: 2,
        username: 'john',
        email: 'john@mail.com',
        no_hp: '0822',
        tanggal_daftar: '2024-02-01',
      },
      {
        id_user: 3,
        username: 'doe',
        email: 'doe@mail.com',
        no_hp: '0823',
        tanggal_daftar: '2024-03-01',
      },
      {
        id_user: 4,
        username: 'alice',
        email: 'alice@mail.com',
        no_hp: '0824',
        tanggal_daftar: '2024-04-01',
      },
      {
        id_user: 5,
        username: 'bob',
        email: 'bob@mail.com',
        no_hp: '0825',
        tanggal_daftar: '2024-05-01',
      },
    ]);
  }, []);

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
            <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <UserTable
              data={users.filter((u) =>
                u.username.toLowerCase().includes(search.toLowerCase()),
              )}
            />
            <Pagination page={page} onPageChange={setPage} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default KelolaUserPage;

