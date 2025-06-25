import { useEffect, useState } from 'react';
import SidebarPimpinan from '../components/pimpinan/SidebarPimpinan';
import HeaderPimpinan from '../components/pimpinan/HeaderPimpinan';
import RingkasanCard from '../components/admin/RingkasanCard';
import axios from 'axios';

const DashboardPimpinan = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/program/ringkasan')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Gagal mengambil ringkasan:', err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarPimpinan />
      <div className="flex-1 flex flex-col">
        <HeaderPimpinan />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Dashboard</h1>
          {data ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RingkasanCard
                title="Total Program"
                value={data.totalProgram}
                color="bg-blue-500"
              />
              <RingkasanCard
                title="Total Donasi"
                value={`Rp ${Number(data.totalDonasi).toLocaleString('id-ID')}`}
                color="bg-green-500"
              />
              <RingkasanCard
                title="Total Donatur"
                value={data.totalDonatur}
                color="bg-orange-500"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPimpinan;

