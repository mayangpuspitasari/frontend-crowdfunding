import React, { useState } from 'react';

const KegiatanTable = ({ data, onEdit, onDelete }) => {
  const [selectedDeskripsi, setSelectedDeskripsi] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const handleShowDeskripsi = (deskripsi) => {
    setSelectedDeskripsi(deskripsi);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeskripsi('');
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow relative">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-orange-100 text-orange-800 uppercase font-semibold">
          <tr className="border-b text-center">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Gambar</th>
            <th className="px-4 py-3">Judul Kegiatan</th>
            <th className="px-4 py-3">Deskripsi</th>
            <th className="px-4 py-3">Tanggal Kegiatan</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((kegiatan, i) => (
            <tr
              key={kegiatan.id_kegiatan}
              className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
            >
              <td className="px-4 py-2 text-center">{i + 1}</td>
              <td className="px-4 py-2 text-center">
                <img
                  src={`http://localhost:5000${kegiatan.gambar}`}
                  alt={kegiatan.judul_kegiatan}
                  className="w-full md:w-40 h-28 object-cover rounded-md mx-auto"
                />
              </td>
              <td className="px-4 py-2 text-center">
                {kegiatan.judul_kegiatan}
              </td>
              <td className="px-4 py-2 text-left max-w-xs">
                <p>{truncate(kegiatan.deskripsi, 100)}</p>
                {kegiatan.deskripsi.length > 100 && (
                  <button
                    onClick={() => handleShowDeskripsi(kegiatan.deskripsi)}
                    className="text-blue-500 hover:underline text-sm mt-1"
                  >
                    Lihat Selengkapnya
                  </button>
                )}
              </td>
              <td className="px-4 py-2 text-center">
                {new Date(kegiatan.tanggal_kegiatan).toLocaleDateString(
                  'id-ID',
                )}
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap w-48">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(kegiatan)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(kegiatan.id_kegiatan)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <h2 className="text-lg font-semibold mb-2">Deskripsi Lengkap</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {selectedDeskripsi}
            </p>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KegiatanTable;

