const DonasiCard = ({ judul, terkumpul, hariLagi, donatur, gambar }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-[300px]">
      <img src={gambar} alt={judul} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{judul}</h3>
        <p className="text-gray-600 text-sm">Donasi Terkumpul</p>
        <p className="font-bold text-orange-500">Rp.{terkumpul.toLocaleString()}</p>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{hariLagi} Hari Lagi</span>
          <span>{donatur} Donatur</span>
        </div>
      </div>
    </div>
  );
};

export default DonasiCard;
