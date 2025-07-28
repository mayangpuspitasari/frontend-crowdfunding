import { useNavigate } from 'react-router-dom';
import Komentar from './Komentar';

const DetailProgram = ({
  id_program,
  judul = 'judul tidak ada',
  terkumpul,
  target,
  persentase,
  sisa_hari,
  donatur,
  deskripsi,
  gambar,
  status,
}) => {
  const navigate = useNavigate();

  const handleDonasiClick = () => {
    const id_user = sessionStorage.getItem('id_user');

    if (!id_user) {
      alert('Silakan login terlebih dahulu untuk melakukan donasi.');
      return;
    }

    if (status == 'Tidak Aktif') {
      alert('Program Ini Sudah Tidak Aktif');
      return;
    }

    navigate(`/donasi/${id_program}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Gambar */}
      <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg mb-6">
        <img
          src={`http://109.110.188.170:5000${gambar}`}
          alt={judul}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Judul dan Ringkasan */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{judul}</h1>

      <div className="text-sm text-gray-600 mb-4">
        <span>{donatur} Donatur</span> • <span>{sisa_hari} Hari Lagi</span>
      </div>

      {/* Dana terkumpul */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm">Dana Terkumpul</p>
        <p className="text-orange-500 font-bold text-2xl mb-1">
          Rp {Number(terkumpul).toLocaleString('id-ID')}
        </p>

        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${persentase}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>
            Terkumpul {persentase}% Dari Rp{' '}
            {Number(target).toLocaleString('id-ID')}
          </span>
          <span
            className={`font-semibold ${
              status === 'Aktif' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Deskripsi</h2>
        <p className="text-gray-700 leading-relaxed">{deskripsi}</p>
      </div>

      {/* Tombol Donasi */}
      <div className="mt-8 text-center">
        <button
          onClick={handleDonasiClick}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow transition duration-300"
        >
          Donasi Sekarang
        </button>
      </div>

      {/* Komentar */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tinggalkan Komentar
        </h2>
        <Komentar id_program={id_program} />
      </div>
    </div>
  );
};

export default DetailProgram;

