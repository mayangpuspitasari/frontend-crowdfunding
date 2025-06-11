import { useNavigate } from 'react-router-dom';
const DetailProgram = ({
  id_program,
  judul_program,
  terkumpul,
  target,
  persentase,
  sisa_hari,
  donatur,
  deskripsi,
  gambar,
}) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mt-10 mx-auto p-4 border-orange-200 border rounded-lg shadow-md bg-white">
      {/* Gambar */}
      <div className="w-full h-64 bg-gray-200 mb-4 overflow-hidden rounded-md">
        <img
          src={`http://localhost:5000${gambar}`}
          alt={judul_program}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Program */}
      <h1 className="text-2xl font-bold">{judul_program}</h1>
      <p className="text-gray-600 mt-1">Dana Terkumpul</p>
      <p className="text-orange-500 font-bold text-lg">
        Rp {Number(terkumpul).toLocaleString('id-ID')}
      </p>
      <p className="flex justify-end text-sm text-gray-600">
        <span>{donatur} Donatur</span>
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-orange-500 h-3 rounded-full"
          style={{ width: `${persentase}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>
          Terkumpul {persentase}% <br />
          Dari Rp {Number(target).toLocaleString('id-ID')}
        </span>
        <span>{sisa_hari} Hari Lagi</span>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Deskripsi</h2>
        <p className="text-gray-700">{deskripsi}</p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate(`/donasi/${id_program}`)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
        >
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
};

export default DetailProgram;

