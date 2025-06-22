import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const dropdownRef = useRef(null);

  // Ambil logo dari API
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('http://localhost:5000/instansi/logo');
        const data = await res.json();
        setLogoUrl(`http://localhost:5000${data.logo}`);
      } catch (err) {
        console.error('Gagal memuat logo:', err);
      }
    };

    fetchLogo();
  }, []);

  // Fungsi untuk menutup mobile menu dan dropdown setelah klik navigasi
  const handleMobileNavigate = () => {

    setTimeout(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    }, 100);
  };

  // Menutup dropdown jika klik di luar elemen dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 pl-2">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo Lazismu"
              className="h-10 w-15 object-contain"
            />
          )}
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
              <Link to="/" className="text-gray-700 hover:text-orange-500">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/program"
                className="text-gray-700 hover:text-orange-500"
              >
                Program Donasi
              </Link>
            </li>
            <li>
              <Link
                to="/kegiatan"
                className="text-gray-700 hover:text-orange-500"
              >
                Kegiatan
              </Link>
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
                    <Link
                      to="/profil"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cara-berdonasi"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Cara Berdonasi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/struktur"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Struktur
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Tombol Masuk & Daftar */}
          <div className="flex gap-3">
            <Link
              to="/masuk"
              className="px-4 py-1 border border-orange-400 text-orange-400 rounded hover:bg-orange-100"
            >
              Masuk
            </Link>
            <Link
              to="/daftar"
              className="px-4 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <Link
            to="/"
            onClick={handleMobileNavigate}
            className="block text-gray-700 hover:text-orange-500"
          >
            Beranda
          </Link>
          <Link
            to="/program"
            onClick={handleMobileNavigate}
            className="block text-gray-700 hover:text-orange-500"
          >
            Program Donasi
          </Link>
          <Link
            to="/kegiatan"
            onClick={handleMobileNavigate}
            className="block text-gray-700 hover:text-orange-500"
          >
            Kegiatan
          </Link>
          {/* Mobile DropdownRef */}
          <div ref={dropdownRef}>
            {/* Dropdown button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              Tentang Kami ▾
            </button>

            {/* Dropdown content */}
            {dropdownOpen && (
              <div className="ml-4">
                <Link
                  to="/profil"
                  onClick={handleMobileNavigate}
                  className="block text-gray-600 hover:text-orange-500"
                >
                  Profil
                </Link>
                <Link
                  to="/cara-berdonasi"
                  onClick={handleMobileNavigate}
                  className="block text-gray-600 hover:text-orange-500"
                >
                  Cara Berdonasi
                </Link>
                <Link
                  to="/struktur"
                  onClick={handleMobileNavigate}
                  className="block text-gray-600 hover:text-orange-500"
                >
                  Struktur
                </Link>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-3">
            <Link
              to="/masuk"
              onClick={handleMobileNavigate}
              className="px-4 py-1 border border-orange-400 text-orange-400 rounded hover:bg-orange-100"
            >
              Masuk
            </Link>
            <Link
              to="/daftar"
              onClick={handleMobileNavigate}
              className="px-4 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;