import { Link } from 'react-router-dom';
const DonasiCard = ({
  id_program,
  judul = 'Judul tidak tersedia',
  terkumpul = 0,
  target = 0,
  hariLagi = 0,
  donatur = 0,
  gambar = '',
}) => {
  const progress = Math.min(terkumpul / target, 1);

  return (
    <div className=" bg-white shadow-md rounded-2xl overflow-hidden w-full sm:w-[360px] transition hover:scale-[1.02] duration-300">
      <img
        src={`http://109.110.188.170:5000${gambar}`}
        alt={judul}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <Link to={`/program/${id_program}`}>
          <h3 className="font-semibold text-lg  hover:text-orange-500 transition duration-200">
            {judul}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm">Donasi Terkumpul</p>
        <p className="font-bold text-orange-500 text-lg">
          Rp{' '}
          {(Number(terkumpul) || 0).toLocaleString('id-ID', {
            minimumFractionDigits: 0,
          })}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-orange-500 h-3 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{hariLagi} Hari Lagi</span>
          <span>{donatur} Donatur</span>
        </div>
      </div>
    </div>
  );
};

export default DonasiCard;

