import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SidebarPimpinan = () => {
  const menuItems = [
    {
      to: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />,
      label: 'Dashboard',
    },
    { to: '/admin/laporan', icon: <FileText size={18} />, label: 'Laporan' },
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-lg flex flex-col justify-between border-r p-6">
      <div>
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
                  to="/admin/profil"
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

      {/* Tombol Logout */}
      <button className="mt-10 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm transition">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default SidebarPimpinan;

