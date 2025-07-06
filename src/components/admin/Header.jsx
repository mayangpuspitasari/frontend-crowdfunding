import { useLocation } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [fotoProfil, setFotoProfil] = useState(null);

  useEffect(() => {
    const fetchFoto = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:5000/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.foto) {
          setFotoProfil(`http://localhost:5000${data.foto}`);
        }
      } catch (err) {
        console.error('Gagal memuat foto profil:', err);
      }
    };

    fetchFoto();
  }, [location]);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/user')) return 'Kelola User';
    if (path.includes('/program')) return 'Kelola Program Donasi';
    if (path.includes('/kategori')) return 'Kelola Kategori';
    if (path.includes('/kegiatan')) return 'Kelola Kegiatan';
    if (path.includes('/donasi')) return 'Kelola Donasi';
    if (path.includes('/laporan')) return 'Laporan Donasi';
    if (path.includes('/instansi')) return 'Kelola Instansi';
    if (path.includes('/profil-admin')) return 'Profil Admin';
    return 'Dashboard Admin';
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm relative">
      {/* Judul halaman */}
      <h2 className="text-xl font-bold text-orange-600 tracking-wide">
        {getPageTitle()}
      </h2>

      {/* Info Admin */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">Admin</p>
          <p className="text-xs text-gray-500">Lazismu Asahan</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:ring-2 ring-orange-400 transition overflow-hidden">
          {fotoProfil ? (
            <img
              src={fotoProfil}
              alt="Foto Profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircle2 size={28} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

