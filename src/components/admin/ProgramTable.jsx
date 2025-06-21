import { useState } from 'react';

const ProgramTable = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      {data.map((program) => (
        <ProgramCard key={program.id_program} program={program} />
      ))}
    </div>
  );
};

const ProgramCard = ({ program }) => {
  const [showFull, setShowFull] = useState(false);
  const toggleDesc = () => setShowFull((prev) => !prev);

  return (
    <div className="border rounded-xl p-5 shadow bg-white hover:shadow-md transition duration-300">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Gambar */}
        <img
          src={`http://localhost:5000${program.gambar}`}
          alt={program.judul_program}
          className="w-full md:w-40 h-28 object-cover rounded-md"
        />

        {/* Konten */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-orange-600 mb-1">
            {program.judul_program}
          </h3>

          {/* Deskripsi */}
          <p className="text-sm text-gray-700 mb-2">
            {showFull
              ? program.deskripsi
              : program.deskripsi.slice(0, 150) + '...'}
            {program.deskripsi.length > 150 && (
              <button
                className="ml-2 text-blue-500 hover:underline text-xs"
                onClick={toggleDesc}
              >
                {showFull ? 'Sembunyikan' : 'Lihat Selengkapnya'}
              </button>
            )}
          </p>

          {/* Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600">
            <Info label="Kategori" value={program.jenis_kategori} />
            <Info label="Tanggal Mulai" value={program.tgl_mulai} />
            <Info label="Tanggal Berakhir" value={program.tgl_berakhir} />
            <Info label="Jumlah Donatur" value={program.jumlah_donatur} />
            <Info
              label="Target Donasi"
              value={`Rp ${Number(program.target_donasi).toLocaleString('id-ID')}`}
            />
            <Info
              label="Total Terkumpul"
              value={`Rp ${Number(program.total_terkumpul).toLocaleString('id-ID')}`}
            />
            <Info label="Status" value={program.status} />
          </div>

          {/* Aksi */}
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

export default ProgramTable;
