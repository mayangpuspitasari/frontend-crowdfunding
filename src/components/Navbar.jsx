import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const dropdownRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
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

        {/* Hamburger (Mobile) */}
        <div className="md:hidden pr-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1 focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
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

            {/* Dropdown Tentang Kami */}
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

          {/* Kondisi Login Desktop */}
          {isLoggedIn ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="text-gray-700 hover:text-orange-500 text-2xl"
              >
                <FaUserCircle />
              </button>
              {profileDropdownOpen && (
                <ul className="absolute mt-2 right-0 w-48 bg-white border rounded shadow z-10">
                  <li>
                    <Link
                      to="/profil-user"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Lihat Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem('token');
                        // localStorage.setItem('foto_user', '/uploads/profile123.jpg');
                        setIsLoggedIn(false);
                        setProfileDropdownOpen(false);
                        window.location.href = '/';
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
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
          )}
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

          <div ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              Tentang Kami ▾
            </button>
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

          {/* Login / Profil Mobile */}
          {isLoggedIn ? (
            <div className="mt-4 space-y-2">
              <Link
                to="/profil-user"
                onClick={handleMobileNavigate}
                className="block text-gray-700 hover:text-orange-500"
              >
                Lihat Profil
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                  handleMobileNavigate();
                  window.location.href = '/';
                }}
                className="block text-left text-gray-700 hover:text-orange-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 mt-3">
              <Link
                to="/login"
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
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
