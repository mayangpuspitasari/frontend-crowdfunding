import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    no_hp: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/user/register', form);
      setMessage(res.data || 'Registrasi berhasil');
      setForm({ nama: '', email: '', password: '', no_hp: '' });
    } catch (err) {
      setMessage(err.response?.data || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
      {/* Kiri */}
      <div className="md:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Bergabunglah Bersama Kami!
        </h2>
        <p className="text-center text-sm">
          Mulai langkah kecilmu untuk perubahan besar.
        </p>
      </div>

      {/* Kanan */}
      <div className="md:w-1/2 bg-white p-10 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Buat Akun Anda <span className="text-orange-500">Sekarang</span>
        </h3>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {['nama', 'email', 'password', 'no_hp'].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field === 'no_hp' ? 'No HP' : field}
              </label>
              <input
                type={
                  field === 'email'
                    ? 'email'
                    : field === 'password'
                    ? 'password'
                    : 'text'
                }
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Masukkan ${field === 'no_hp' ? 'No HP' : field}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition-all"
          >
            Daftar
          </button>
        </form>

        {message && (
          <p className="text-sm text-center text-red-600 mt-4">{message}</p>
        )}

        <p className="text-sm text-center text-gray-600 mt-6">
          Sudah Punya Akun?{' '}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

