const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 flex flex-col justify-between border-r">
      <div>
        <div className="font-bold text-lg mb-6">Lazismu Asahan</div>
        <nav className="space-y-3 text-sm">
          <p className="font-semibold">Menu</p>
          <ul className="space-y-1">
            <li>Dashboard</li>
            <li>Kelola User</li>
            <li>Kelola Program Donasi</li>
            <li>Kelola Donasi</li>
            <li>Kelola Kategori</li>
            <li>Kelola Kegiatan</li>
            <li>Kelola Komentar</li>
            <li>Laporan</li>
          </ul>
        </nav>
        <div className="mt-6 text-sm">
          <p className="font-semibold">Pengaturan</p>
          <ul>
            <li>Edit Profil</li>
          </ul>
        </div>
      </div>
      <button className="bg-gray-300 rounded-md py-2 mt-6">Logout</button>
    </aside>
  );
};

export default Sidebar;

