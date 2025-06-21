import { useState, useRef } from 'react';
import { UserCircle2 } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm relative">
      <h2 className="text-xl font-bold text-orange-600 tracking-wide">
        Kelola User
      </h2>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Lazismu Asahan</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:ring-2 ring-orange-400 transition">
            <UserCircle2 size={28} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

