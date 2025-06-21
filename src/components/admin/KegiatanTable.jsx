const KegiatanTable = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow">
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
                    className="w-full md:w-40 h-28 object-cover rounded-md"
                    />
               </td>
                <td className="px-4 py-2 text-center">{kegiatan.judul_kegiatan}</td>
                <td className="px-4 py-2 text-center">{kegiatan.deskripsi}</td>
                <td className="px-4 py-2 text-center">{kegiatan.tanggal_kegiatan}</td>
                
              <td className="px-4 py-2 space-x-2 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
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

export default KegiatanTable;

