import React from 'react';

const InstansiTable = ({ data, onEdit }) => {
  if (!data) {
    return <p className="text-gray-500">Data instansi tidak tersedia.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      {/* Logo */}
      <div className="flex flex-col items-center">
        {data.logo ? (
          <img
            src={encodeURI(`http://localhost:5000${data.logo}`)}
            alt="Logo Instansi"
            className="w-32 h-32 object-contain mb-4 border border-gray-300 p-2 rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-4">
            Logo tidak tersedia
          </div>
        )}
        <p className="text-gray-700 text-center text-sm">{data.deskripsi}</p>
      </div>

      {/* Info Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800">
        <Item label="Visi" value={data.visi} />
        <Item label="Misi" value={data.misi} />
        <Item label="No Rekening" value={data.rekening} />
        <Item label="Alamat" value={data.alamat} />
        <Item label="Email" value={data.email} />
        <Item label="Kontak" value={data.kontak} />
        <Item label="Instagram" value={data.ig} />
        <Item label="Facebook" value={data.fb} />
      </div>

      {/* Struktur Organisasi */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-2">
          Struktur Organisasi:
        </h4>
        {data.struktur ? (
          <div className="overflow-x-auto">
            <img
              src={encodeURI(`http://localhost:5000${data.struktur}`)}
              alt="Struktur Organisasi"
              className="max-w-full h-auto mx-auto rounded shadow-md border border-gray-200"
            />
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">
            Struktur tidak tersedia.
          </p>
        )}
      </div>

      {/* Tombol Edit */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Edit Instansi
        </button>
      </div>
    </div>
  );
};

// Komponen kecil untuk label dan isi
const Item = ({ label, value }) => (
  <div>
    <span className="font-semibold">{label}:</span>{' '}
    <span className="text-gray-700">{value || '-'}</span>
  </div>
);

export default InstansiTable;

