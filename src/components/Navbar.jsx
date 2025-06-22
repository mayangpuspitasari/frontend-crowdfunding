import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  // Cek status login
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMobileNavigate = () => {
    setTimeout(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
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

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
              >
                <img
                  src="/default-profile.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline">Akun</span>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                  <li>
                    <Link
                      to="/profil"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      Lihat Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 hover:bg-orange-100"
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

          {isLoggedIn ? (
            <div className="space-y-2">
              <Link
                to="/profil"
                onClick={handleMobileNavigate}
                className="block text-gray-700 hover:text-orange-500"
              >
                Lihat Profil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-700 hover:text-orange-500"
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

