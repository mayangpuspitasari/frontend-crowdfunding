const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h2 className="font-semibold text-lg">Kelola User</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm">Admin</span>
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>
    </header>
  );
};

export default Header;

