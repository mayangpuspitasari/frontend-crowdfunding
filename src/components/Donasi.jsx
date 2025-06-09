const Donasi = ({program}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-md shadow-md">
      <div className="text-center bg-gray-100 py-4 mb-6">
        <p className="text-sm">Silahkan Transfer Ke Nomor Rekening Dibawah Ini</p>
        <h2 className="text-xl font-bold mt-2">7765432564</h2>
      </div>

      <form className="space-y-4">
        <div>
          <label>Nama:</label>
          <input type="text" className="w-full border px-3 py-2 rounded-md" />
        </div>
        <div>
         <input
    type="text"
    className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-600"
    value={program.judul}
    disabled
  />
  <input type="hidden" name="judul" value={program.judul} />
        </div>
        <div>
          <label>Masukkan Nominal:</label>
          <input type="number" className="w-full border px-3 py-2 rounded-md" />
        </div>
        <div>
          <label>Dukungan dan Doa:</label>
          <textarea className="w-full border px-3 py-2 rounded-md" rows="4"></textarea>
        </div>
        <div>
          <label>Bukti Transfer:</label>
          <input type="file" className="w-full" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="anonim" />
          <label htmlFor="anonim" className="ml-2">Donasi Sebagai Anonymous</label>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default Donasi;
