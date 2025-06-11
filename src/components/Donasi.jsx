import { useEffect, useState } from 'react';

const Donasi = ({ program }) => {
  const [rekening, setRekening] = useState('');

  useEffect(() => {
    const fetchRekening = async () => {
      try {
        const res = await fetch('http://localhost:5000/instansi/rekening');
        const data = await res.json();
        setRekening(data.rekening);
      } catch (err) {
        console.error('Gagal mengambil data rekening:', err);
      }
    };

    fetchRekening();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="bg-orange-100 text-center py-5 px-4 rounded-md mb-6">
        <p className="text-sm text-gray-700">
          Silakan Transfer Ke Nomor Rekening Di Bawah Ini
        </p>
        <h2 className="text-2xl font-bold text-orange-500 mt-2 tracking-wide">
          {rekening || 'Memuat...'}
        </h2>
      </div>

      <form className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nama:</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Nama Anda"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Program Donasi:
          </label>
          <input
            type="text"
            className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md border"
            value={program.judul_program}
            disabled
          />
          <input type="hidden" name="judul" value={program.judul_program} />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nominal Donasi:
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            placeholder="Contoh: 100000"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Dukungan dan Doa:
          </label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="4"
            placeholder="Tulis doa terbaik Anda..."
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bukti Transfer:
          </label>
          <input type="file" className="w-full border px-3 py-2 rounded-md" />
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="anonim" className="accent-orange-500" />
          <label htmlFor="anonim" className="ml-2 text-gray-700">
            Donasi sebagai Anonymous
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
        >
          Kirim Donasi
        </button>
      </form>
    </div>
  );
};

export default Donasi;

