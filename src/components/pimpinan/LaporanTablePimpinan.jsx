const LaporanTablePimpinan = ({ data, onDetail }) => {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-orange-100 text-orange-800 uppercase font-semibold">
          <tr className="border-b text-center">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Judul Program</th>
            <th className="px-4 py-3">Target Donasi</th>
            <th className="px-4 py-3">Total Terkumpul</th>
            <th className="px-4 py-3">Total Donatur</th>
            <th className="px-4 py-3">Tanggal Mulai</th>
            <th className="px-4 py-3">Tanggal Selesai</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((laporan, i) => (
            <tr
              key={laporan.id_program}
              className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
            >
              <td className="px-4 py-2 text-center">{i + 1}</td>
              <td className="px-4 py-2 text-center">{laporan.judul_program}</td>
              <td className="px-4 py-2 text-center">{laporan.target_donasi}</td>
              <td className="px-4 py-2 text-center">
                {laporan.total_terkumpul}
              </td>
              <td className="px-4 py-2 text-center">{laporan.total_donatur}</td>
              <td className="px-4 py-2 text-center">
                {new Date(laporan.tgl_mulai).toLocaleDateString('id-ID')}
              </td>
              <td className="px-4 py-2 text-center">
                {new Date(laporan.tgl_berakhir).toLocaleDateString('id-ID')}
              </td>
              <td className="px-4 py-2 space-x-2 text-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  onClick={() => onDetail(laporan)}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanTablePimpinan;

