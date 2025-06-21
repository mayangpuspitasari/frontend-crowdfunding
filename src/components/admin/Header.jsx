import { useLocation } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/user')) return 'Kelola User';
    if (path.includes('/program')) return 'Kelola Program Donasi';
    if (path.includes('/kategori')) return 'Kelola Kategori';
    if (path.includes('/kegiatan')) return 'Kelola Kegiatan';
    if (path.includes('/donasi')) return 'Kelola Donasi';
    if (path.includes('/laporan')) return 'Laporan Donasi';
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
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:ring-2 ring-orange-400 transition">
          <UserCircle2 size={28} />
        </div>
      </div>
    </header>
  );
};

export default Header;
