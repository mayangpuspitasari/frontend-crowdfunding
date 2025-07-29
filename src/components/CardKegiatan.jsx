import React from 'react';
import { Link } from 'react-router-dom';

const CardKegiatan = ({
  id_kegiatan,
  judul,
  deskripsi,
  tanggal_kegiatan,
  gambar,
}) => {
  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300">
      <div className="w-full md:w-48 h-40 bg-gray-200 overflow-hidden flex-shrink-0">
        <img
          src={`https://109.110.188.170:5000${gambar}`}
          alt={judul}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="font-semibold text-lg text-gray-800">
          {truncate(judul, 80)}
        </h2>
        <p className="text-gray-600 mt-2 text-sm">{truncate(deskripsi, 300)}</p>
        <p className="text-xs text-gray-500 mt-2">
          Tanggal: {new Date(tanggal_kegiatan).toLocaleDateString('id-ID')}
        </p>
        <div className="mt-3">
          <Link
            to={`/kegiatan/${id_kegiatan}`}
            className="inline-block text-orange-500 text-sm font-semibold hover:underline transition duration-200"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardKegiatan;

