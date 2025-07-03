const DonasiTable = ({ data, onVerifikasi, onHapus }) => {
  const handleVerifikasi = (id) => {
    if (window.confirm('Apakah Anda yakin ingin memverifikasi donasi ini?')) {
      onVerifikasi(id);
    }
  };

  const handleHapus = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus donasi ini?')) {
      onHapus(id);
    }
  };

  const handleLihatBukti = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Bukti belum tersedia.');
    }
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-orange-100 text-orange-800 uppercase font-semibold">
          <tr className="border-b text-center">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Judul Program</th>
            <th className="px-4 py-3">Jumlah Donasi</th>
            <th className="px-4 py-3">Bukti Pembayaran</th>
            <th className="px-4 py-3">Dukungan</th>
            <th className="px-4 py-3">Tanggal Donasi</th>
            <th className="px-4 py-3">Status Donasi</th>
            <th className="px-4 py-3">Verifikasi</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((donasi, i) => (
            <tr
              key={donasi.id_donasi}
              className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
            >
              <td className="px-4 py-2 text-center">{i + 1}</td>
              <td className="px-4 py-2 text-center">{donasi.nama || '-'}</td>
              <td className="px-4 py-2 text-center">{donasi.judul_program}</td>
              <td className="px-4 py-2 text-center">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(donasi.jumlah_donasi)}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleLihatBukti(donasi.bukti_pembayaran)}
                  className="text-blue-600 hover:underline"
                >
                  Lihat Bukti
                </button>
              </td>
              <td className="px-4 py-2 text-center">{donasi.dukungan}</td>
              <td className="px-4 py-2 text-center">{donasi.tanggal_donasi}</td>
              <td className="px-4 py-2 text-center">{donasi.status_donasi}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleVerifikasi(donasi.id_donasi)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Verifikasi
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleHapus(donasi.id_donasi)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonasiTable;

