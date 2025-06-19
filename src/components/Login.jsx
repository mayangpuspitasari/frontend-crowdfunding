import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
      {/* Kiri: Ilustrasi dan sambutan */}
      <div className="md:w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Selamat Datang Kembali!
        </h2>
        <p className="text-center text-sm">
          Masuk dan lanjutkan aksi pedulimu melalui platform Lazismu Asahan.
        </p>
      </div>

      {/* Kanan: Form login */}
      <div className="md:w-1/2 bg-white p-10 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Masuk ke Web <span className="text-orange-500">Lazismu Asahan</span>
        </h3>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
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

