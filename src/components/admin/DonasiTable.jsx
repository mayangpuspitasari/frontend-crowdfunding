import { useState } from 'react';

const DonasiTable = ({ data, onVerifikasi, onHapus }) => {
  const [selectedBukti, setSelectedBukti] = useState(null);

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
      setSelectedBukti(`http://localhost:5000${url}`);
    } else {
      alert('Bukti belum tersedia.');
    }
  };

  const closeModal = () => {
    setSelectedBukti(null);
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow">
      {selectedBukti && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Bukti Pembayaran
            </h2>
            <img
              src={selectedBukti}
              alt="Bukti Pembayaran"
              className="w-full max-h-[80vh] object-contain rounded"
            />
            <div className="text-center mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

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
              <td className="px-4 py-2 text-center">
                {donasi.anonymous === 1 ? 'Anonymous' : donasi.nama_user || '-'}
              </td>

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
              <td className="px-4 py-2 text-center">
                {donasi.dukungan || '-'}
              </td>
              <td className="px-4 py-2 text-center">
                {new Date(donasi.tanggal_donasi).toLocaleDateString('id-ID')}
              </td>
              <td className="px-4 py-2 text-center">{donasi.status_donasi}</td>
              <td className="px-4 py-2 text-center">
                {donasi.verifikasi === 0 ? (
                  <button
                    onClick={() => handleVerifikasi(donasi.id_donasi)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Verifikasi
                  </button>
                ) : donasi.verifikasi === 1 ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium">
                    Terverifikasi
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md font-medium">
                    Gagal Verifikasi
                  </span>
                )}
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

