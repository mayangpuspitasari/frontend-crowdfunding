import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown jika klik di luar elemen dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3 pl-6">
        <img src={logo} alt="Logo Lazismu" className="h-10 w-15" />
        <h1 className="text-xl font-bold text-orange-400">LAZISMU Asahan</h1>
      </div>

      {/* Menu + Dropdown + Tombol */}
      <div className="flex items-center gap-6 pr-6">
        <ul className="flex gap-6 relative items-center">
          <li><a href="/" className="text-gray-700 hover:text-orange-500">Beranda</a></li>
          <li><a href="/program" className="text-gray-700 hover:text-orange-500">Program Donasi</a></li>
          <li><a href="/kegiatan" className="text-gray-700 hover:text-orange-500">Kegiatan</a></li>

          {/* Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              Tentang Kami ▾
            </button>
            {dropdownOpen && (
              <ul className="absolute mt-2 w-48 bg-white border rounded shadow z-10">
                <li><a href="/profil" className="block px-4 py-2 hover:bg-orange-100">Profil</a></li>
                <li><a href="/cara-berdonasi" className="block px-4 py-2 hover:bg-orange-100">Cara Berdonasi</a></li>
                <li><a href="/struktur" className="block px-4 py-2 hover:bg-orange-100">Struktur</a></li>
              </ul>
            )}
          </li>
        </ul>

        {/* Tombol Masuk & Daftar */}
        <div className="flex gap-3">
          <a
            href="/masuk"
            className="px-4 py-1 border border-orange-400 text-orange-400 rounded hover:bg-orange-100"
          >
            Masuk
          </a>
          <a
            href="/daftar"
            className="px-4 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
          >
            Daftar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
