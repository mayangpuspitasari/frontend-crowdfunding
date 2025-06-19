import { useNavigate } from 'react-router-dom';

const DetailKegiatan = ({
 id_kegiatan,
  judul,
  deskripsi,
  tanggal_kegiatan,
  gambar,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Gambar */}
      <div className="w-full h-72 bg-gray-200 overflow-hidden rounded-lg mb-6">
        <img
          src={`http://localhost:5000${gambar}`}
          alt={judul}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Judul dan Ringkasan */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{judul}</h1>

      <div className="text-sm text-gray-600 mb-4">
        <span>Tanggal: {new Date(tanggal_kegiatan).toLocaleDateString('id-ID')}</span>
      </div>


      {/* Deskripsi */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Deskripsi</h2>
        <p className="text-gray-700 leading-relaxed">{deskripsi}</p>
      </div>


      {/* Komentar */}
      {/* <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tinggalkan Komentar</h2>
        <Komentar id_program={id_program} />
      </div> */}
    </div>
  );
};

export default DetailKegiatan;
