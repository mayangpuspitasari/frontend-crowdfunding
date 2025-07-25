import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  LayoutDashboard,
  Users,
  Heart,
  HandCoins,
  Tag,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react'; // ✅ kamu juga bisa pakai Building2 agar lebih sesuai
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id_user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('nama');
    navigate('/');
    toast.success('Anda Telah Logout');
  };

  const menuItems = [
    {
      to: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />,
      label: 'Dashboard',
    },
    {
      to: '/admin/user',
      icon: <Users size={18} />,
      label: 'Kelola User',
    },
    {
      to: '/admin/program',
      icon: <Heart size={18} />,
      label: 'Kelola Program Donasi',
    },
    {
      to: '/admin/donasi',
      icon: <HandCoins size={18} />,
      label: 'Kelola Donasi',
    },
    {
      to: '/admin/kategori',
      icon: <Tag size={18} />,
      label: 'Kelola Kategori',
    },
    {
      to: '/admin/kegiatan',
      icon: <Calendar size={18} />,
      label: 'Kelola Kegiatan',
    },
    {
      to: '/admin/komentar',
      icon: <MessageSquare size={18} />,
      label: 'Kelola Komentar',
    },
    {
      to: '/admin/instansi',
      icon: <Building2 size={18} />, // ✅ Icon Instansi
      label: 'Kelola Instansi',
    },
    {
      to: '/admin/laporan',
      icon: <FileText size={18} />,
      label: 'Laporan',
    },
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-lg flex flex-col border-r p-6">
      {/* Bagian Atas: Logo dan Menu */}
      <div className="flex-grow overflow-y-auto">
        <h1 className="text-xl font-bold text-orange-600 mb-8">
          Lazismu Asahan
        </h1>

        {/* Menu utama */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 font-semibold text-sm mb-2">Menu</p>
            <ul className="space-y-2 text-sm">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                        isActive
                          ? 'bg-orange-100 text-orange-600 font-semibold'
                          : 'text-gray-700 hover:text-orange-500'
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Pengaturan */}
          <div className="mt-6">
            <p className="text-gray-500 font-semibold text-sm mb-2">
              Pengaturan
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/admin/profil-admin"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                      isActive
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'text-gray-700 hover:text-orange-500'
                    }`
                  }
                >
                  <Settings size={18} />
                  Edit Profil
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tombol Logout (Selalu di bawah sidebar) */}
      <div className="pt-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

