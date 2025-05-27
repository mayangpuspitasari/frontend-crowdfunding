const DonasiCard = ({
  judul,
  terkumpul,
  target = 200000,
  hariLagi,
  donatur,
  gambar,
}) => {
  const progress = Math.min(terkumpul / target, 1); // maksimal 100%

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full sm:w-[360px] transition hover:scale-[1.02] duration-300">
      {/* Gambar */}
      <img
        src={gambar || '/default-image.png'}
        alt={judul}
        className="w-full h-48 object-cover"
      />

      {/* Konten */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg text-gray-800">{judul}</h3>
        <p className="text-gray-600 text-sm">Donasi Terkumpul</p>
        <p className="font-bold text-orange-500 text-lg">
          Rp. {terkumpul.toLocaleString('id-ID')}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Info Bawah */}
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{hariLagi} Hari Lagi</span>
          <span>{donatur} Donatur</span>
        </div>
      </div>
    </div>
  );
};

export default DonasiCard;

