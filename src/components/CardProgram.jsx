const CardProgram = ({
  judul = 'Judul tidak tersedia',
  terkumpul = 0,
  target = 0,
  hariLagi = 0,
  donatur = 0,
  gambar = '',
}) => {
  const progress = Math.min(terkumpul / target, 1);

  return (
    <div className="flex bg-white shadow-md rounded-xl overflow-hidden w-full transition hover:scale-[1.01] duration-300">
      {/* Gambar kiri */}
      <div className="w-32 md:w-48 h-32 md:h-40 bg-gray-200 overflow-hidden flex-shrink-0">
        <img
          src={`http://localhost:5000${gambar}`}
          alt={judul}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Isi kanan */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{judul}</h3>
          <p className="text-gray-600 text-sm">Donasi Terkumpul</p>
          <p className="font-bold text-orange-500 text-lg">
            Rp {Number(terkumpul).toLocaleString('id-ID')}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-orange-500 h-3 rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{hariLagi} Hari Lagi</span>
          <span>{donatur} Donatur</span>
        </div>
      </div>
    </div>
  );
};

export default CardProgram;
