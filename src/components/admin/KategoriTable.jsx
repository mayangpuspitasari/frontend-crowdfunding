const KategoriTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-orange-100 text-orange-800 uppercase font-semibold">
          <tr className="border-b text-center">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Jenis Kategori</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((kategori, i) => (
            <tr
              key={kategori.id_kategori}
              className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
            >
              <td className="px-4 py-2 text-center">{i + 1}</td>
              <td className="px-4 py-2 text-center">{kategori.jenis_kategori}</td>
              <td className="px-4 py-2 space-x-2 text-center">
                <button
                  onClick={() => onEdit(kategori)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button 
                onClick={() => onDelete(kategori.id_kategori)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
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

export default KategoriTable;
