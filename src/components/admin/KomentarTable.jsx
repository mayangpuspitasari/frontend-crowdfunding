const KomentarTable = ({ data, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow relative">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-orange-100 text-orange-800 uppercase font-semibold">
          <tr className="border-b text-center">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Judul Program</th>
            <th className="px-4 py-3">Komentar</th>
            <th className="px-4 py-3">Tanggal Komentar</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {Array.isArray(data) &&
            data.map((komentar, i) => (
              <tr
                key={komentar.id_komentar}
                className={`${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } border-b`}
              >
                <td className="px-4 py-2 text-center">{i + 1}</td>
                <td className="px-4 py-2 text-center">{komentar.nama_user}</td>
                <td className="px-4 py-2 text-center">
                  {komentar.judul_program}
                </td>
                <td className="px-4 py-2 text-center">{komentar.komentar}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(komentar.tanggal_komentar).toLocaleDateString(
                    'id-ID',
                  )}
                </td>
                <td className="px-4 py-2 text-center whitespace-nowrap w-48">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onDelete(komentar.id_komentar)}
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
    </div>
  );
};

export default KomentarTable;

