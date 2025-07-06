import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Untuk redirect
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('donatur');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
        role,
      });

      if (res.data && res.data.token) {
        console.log('Respon Login:', res.data);
        // Simpan token ke sessionStorage atau state global
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('role', res.data.role);

        console.log('Respon Login:', res.data);
        sessionStorage.setItem('id_user', res.data.user.id);
        sessionStorage.setItem('nama', res.data.user.nama);

        // Redirect berdasarkan role
        if (res.data.role.toLowerCase() === 'admin') {
          navigate('/admin/dashboard');
          toast.success('Anda Berhasil Login');
        } else if (res.data.role.toLowerCase() === 'pimpinan') {
          navigate('/pimpinan/dashboard');
          toast.success('Anda Berhasil Login');
        } else {
          navigate('/');
          toast.success('Anda Berhasil Login');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Email atau password salah');
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
      {/* Kiri */}
      <div className="md:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Selamat Datang Kembali!
        </h2>
        <p className="text-center text-sm">
          Masuk dan lanjutkan aksi pedulimu melalui platform Lazismu Asahan.
        </p>
      </div>

      {/* Kanan */}
      <div className="md:w-1/2 bg-white p-10 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Masuk ke Web <span className="text-orange-500">Lazismu Asahan</span>
        </h3>

        <form className="space-y-5" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukkan email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-orange-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="donatur">Donatur</option>
              <option value="admin">Admin</option>
              <option value="pimpinan">Pimpinan</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition-all"
          >
            Masuk
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Belum punya akun?{' '}
          <Link
            to="/daftar"
            className="text-orange-500 font-semibold hover:underline"
          >
            Buat akun
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

