import React, { useState, useEffect, useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const dropdownRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const location = useLocation();
  const [fotoProfil, setFotoProfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  // Ambil logo dari API
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('https://109.110.188.170:5000/instansi/logo');
        const data = await res.json();
        setLogoUrl(`https://109.110.188.170:5000${data.logo}`);
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

  useEffect(() => {
    const fetchFoto = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        const res = await fetch('https://109.110.188.170:5000/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.foto) {
          setFotoProfil(`https://109.110.188.170:5000${data.foto}`);
        } else {
          setFotoProfil(null);
        }
      } catch (err) {
        console.error('Gagal memuat foto profil:', err);
        setFotoProfil(null);
      }
    };

    fetchFoto();
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id_user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('nama');
    setFotoProfil(null);
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    navigate('/'); // Tanpa reload
    toast.success('Anda Telah Logout');
  };

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
              <Link
                to="/"
                className={`hover:text-orange-500 ${
                  location.pathname === '/'
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                Beranda
              </Link>
            </li>

            <li>
              <Link
                to="/program"
                className={`hover:text-orange-500 ${
                  location.pathname === '/program'
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                Program Donasi
              </Link>
            </li>
            <li>
              <Link
                to="/kegiatan"
                className={`hover:text-orange-500 ${
                  location.pathname === '/kegiatan'
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-700'
                }`}
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
                      Profil Instansi
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
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 text-xl"
              >
                {fotoProfil ? (
                  <img
                    src={fotoProfil}
                    alt="Foto Profil"
                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-400"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-orange-400" />
                )}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h4 className="text-xs text-gray-400 mt-2">Nama Donatur</h4>
                    <p className="text-sm text-orange-800">
                      {sessionStorage.getItem('nama')}
                    </p>
                  </div>
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link
                        to="/profil-user"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-orange-100 transition"
                      >
                        Lihat Profil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-100 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
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
                  Profil Instansi
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
                onClick={handleLogout}
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

