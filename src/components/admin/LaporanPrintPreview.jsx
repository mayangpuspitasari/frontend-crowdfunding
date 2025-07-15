const LaporanPrintPreview = ({ data, fromDate, toDate }) => {
  // Hitung total dana terkumpul
  const totalTerkumpul = data.reduce(
    (acc, curr) => acc + (Number(curr.total_terkumpul) || 0),
    0,
  );

  return (
    <div className="p-8 font-sans text-black">
      <h2 className="text-center text-lg font-bold uppercase mb-2">
        LAZISMU ASAHAN
      </h2>
      <h3 className="text-center font-semibold text-base mb-6 uppercase">
        LAPORAN DONASI
      </h3>

      {/* Tanggal filter */}
      {(fromDate || toDate) && (
        <p className="text-sm mb-4">
          Periode: <strong>{fromDate || '-'}</strong> s/d{' '}
          <strong>{toDate || '-'}</strong>
        </p>
      )}

      <table className="w-full border border-black text-sm">
        <thead>
          <tr className="border bg-white">
            <th className="border px-2 py-1 text-center">No</th>
            <th className="border px-2 py-1 text-center">Judul Program</th>
            <th className="border px-2 py-1 text-center">Target Donasi</th>
            <th className="border px-2 py-1 text-center">Total Terkumpul</th>
            <th className="border px-2 py-1 text-center">Total Donatur</th>
            <th className="border px-2 py-1 text-center">Tanggal Mulai</th>
            <th className="border px-2 py-1 text-center">Tanggal Selesai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((laporan, index) => (
            <tr key={laporan.id_program} className="border">
              <td className="border px-2 py-1 text-center">{index + 1}</td>
              <td className="border px-2 py-1">{laporan.judul_program}</td>
              <td className="border px-2 py-1 text-right">
                Rp{' '}
                {new Intl.NumberFormat('id-ID').format(laporan.target_donasi)}
              </td>
              <td className="border px-2 py-1 text-right">
                Rp{' '}
                {new Intl.NumberFormat('id-ID').format(laporan.total_terkumpul)}
              </td>
              <td className="border px-2 py-1 text-center">
                {laporan.total_donatur}
              </td>
              <td className="border px-2 py-1 text-center">
                {new Date(laporan.tgl_mulai).toLocaleDateString('id-ID')}
              </td>
              <td className="border px-2 py-1 text-center">
                {new Date(laporan.tgl_berakhir).toLocaleDateString('id-ID')}
              </td>
            </tr>
          ))}

          {/* Total keseluruhan */}
          <tr className="border font-semibold bg-white">
            <td className="border px-2 py-1 text-center" colSpan="3">
              Total Keseluruhan
            </td>
            <td className="border px-2 py-1 text-right" colSpan="1">
              Rp {new Intl.NumberFormat('id-ID').format(totalTerkumpul)}
            </td>
            <td colSpan="3" className="border"></td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 text-sm">
        Dicetak pada: {new Date().toLocaleDateString('id-ID')}
      </p>
    </div>
  );
};

export default LaporanPrintPreview;

