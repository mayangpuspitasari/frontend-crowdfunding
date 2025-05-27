import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown jika klik di luar elemen dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 pl-2">
          <img src={logo} alt="Logo Lazismu" className="h-10 w-15" />
          <h1 className="text-xl font-bold text-orange-400">LAZISMU Asahan</h1>
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="md:hidden pr-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1 focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 pr-6">
          <ul className="flex gap-6 relative items-center">
            <li>
              <a href="/" className="text-gray-700 hover:text-orange-500">
                Beranda
              </a>
            </li>
            <li>
              <a
                href="/program"
                className="text-gray-700 hover:text-orange-500"
              >
                Program Donasi
              </a>
            </li>
            <li>
              <a
                href="/kegiatan"
                className="text-gray-700 hover:text-orange-500"
              >
                Kegiatan
              </a>
            </li>

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
                  <li>
                    <a
                      href="/profil"
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Profil
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cara-berdonasi"
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Cara Berdonasi
                    </a>
                  </li>
                  <li>
                    <a
                      href="/struktur"
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Struktur
                    </a>
                  </li>
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <a href="/" className="block text-gray-700 hover:text-orange-500">
            Beranda
          </a>
          <a
            href="/program"
            className="block text-gray-700 hover:text-orange-500"
          >
            Program Donasi
          </a>
          <a
            href="/kegiatan"
            className="block text-gray-700 hover:text-orange-500"
          >
            Kegiatan
          </a>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="block text-gray-700 hover:text-orange-500 focus:outline-none"
          >
            Tentang Kami ▾
          </button>
          {dropdownOpen && (
            <div className="ml-4">
              <a
                href="/profil"
                className="block text-gray-600 hover:text-orange-500"
              >
                Profil
              </a>
              <a
                href="/cara-berdonasi"
                className="block text-gray-600 hover:text-orange-500"
              >
                Cara Berdonasi
              </a>
              <a
                href="/struktur"
                className="block text-gray-600 hover:text-orange-500"
              >
                Struktur
              </a>
            </div>
          )}
          <div className="flex gap-3 mt-3">
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
      )}
    </nav>
  );
};

export default Navbar;

