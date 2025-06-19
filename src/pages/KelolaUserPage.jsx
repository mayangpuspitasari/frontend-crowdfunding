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
    // Simulasi fetch data
    setUsers([
      {
        id_user: 1,
        username: 'admin',
        email: 'admin@mail.com',
        no_hp: '0821',
        tanggal_daftar: '2024-01-01',
      },
      // ...data lainnya
    ]);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="border rounded-md p-4 bg-white shadow">
            <h3 className="font-bold mb-4">Data User</h3>
            <SearchBarAdmin
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <UserTable
              data={users.filter((u) => u.username.includes(search))}
            />
            <Pagination page={page} onPageChange={setPage} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default KelolaUserPage;

