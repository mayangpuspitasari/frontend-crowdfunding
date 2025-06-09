import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardKegiatan = ({
  id_kegiatan,
  judul,
  deskripsi,
  tanggal_kegiatan,
  gambar,
}) => {
  const navigate = useNavigate();

  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
      <div className="w-32 md:w-48 h-32 md:h-40 bg-gray-200 overflow-hidden flex-shrink-0">
        <img
          src={`http://localhost:5000${gambar}`}
          alt={judul}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <h2
          onClick={() => navigate(`/kegiatan/${id_kegiatan}`)}
          className="text-xl font-semibold text-orange-600 cursor-pointer hover:underline"
        >
          {judul}
        </h2>
        <p className="text-gray-600 mt-2 text-sm">{truncate(deskripsi, 150)}</p>
        <p className="text-xs text-gray-500 mt-2">
          Tanggal: {new Date(tanggal_kegiatan).toLocaleDateString('id-ID')}
        </p>
      </div>
    </div>
  );
};

export default CardKegiatan;

