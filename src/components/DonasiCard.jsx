const DonasiCard = ({ judul, terkumpul, target = 200000, hariLagi, donatur, gambar }) => {
  // Hitung progress (max 100%)
  const progress = Math.min(terkumpul / target, 1);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-[300px]">
      <img
        src={gambar || "/default-image.png"} // fallback gambar
        alt={judul}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{judul}</h3>
        <p className="text-gray-600 text-sm">Donasi Terkumpul</p>
        <p className="font-bold text-orange-500">Rp. {terkumpul.toLocaleString()}</p>

        {/* Progress bar container */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          {/* Progress bar fill */}
          <div
            className="bg-orange-500 h-3 rounded-full transition-width duration-500 ease-in-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{hariLagi} Hari Lagi</span>
          <span>{donatur} Donatur</span>
        </div>
      </div>
    </div>
  );
};

export default DonasiCard;
