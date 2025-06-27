import { useState } from 'react';
import Swal from 'sweetalert2';

const ProgramTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6">
      {data.map((program) => (
        <ProgramCard
          key={program.id_program}
          program={program}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const ProgramCard = ({ program, onEdit, onDelete }) => {
  const [showFull, setShowFull] = useState(false);
  const toggleDesc = () => setShowFull((prev) => !prev);

  const handleDelete = () => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `Program "${program.judul_program}" akan dihapus secara permanen.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(program.id_program);
      }
    });
  };

  return (
    <div className="border rounded-xl p-5 shadow bg-white hover:shadow-md transition duration-300">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Gambar */}
        <div className="w-full md:w-40 h-28 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
          <img
            src={`http://localhost:5000${program.gambar}`}
            alt={program.judul_program}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Konten */}
        <div className="flex-1">
          {/* Judul */}
          <h3 className="text-lg font-bold text-orange-600 mb-2">
            {program.judul_program}
          </h3>

          {/* Deskripsi */}
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
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

          {/* Info Detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700">
            <Info label="Kategori" value={program.jenis_kategori} />
            <Info
              label="Tanggal Mulai"
              value={new Date(program.tgl_mulai).toLocaleDateString('id-ID')}
            />
            <Info
              label="Tanggal Berakhir"
              value={new Date(program.tgl_berakhir).toLocaleDateString('id-ID')}
            />
            <Info label="Jumlah Donatur" value={program.jumlah_donatur} />
            <Info
              label="Target Donasi"
              value={`Rp ${Number(program.target_donasi).toLocaleString(
                'id-ID',
              )}`}
            />
            <Info
              label="Total Terkumpul"
              value={`Rp ${Number(program.total_terkumpul).toLocaleString(
                'id-ID',
              )}`}
            />
            <Info label="Status" value={program.status} />
          </div>

          {/* Tombol Aksi */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onEdit(program)}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm"
            >
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

