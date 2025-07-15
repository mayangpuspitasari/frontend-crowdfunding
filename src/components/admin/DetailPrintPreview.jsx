const DetailPrintPreview = ({ program, detail, total }) => {
  return (
    <div className="p-8 text-black font-sans print-area">
      <h2 className="text-center text-lg font-bold uppercase mb-1">
        LAZISMU ASAHAN
      </h2>
      <h3 className="text-center font-semibold text-base mb-6 uppercase">
        LAPORAN DONASI PER PROGRAM
      </h3>

      <div className="mb-4 text-sm">
        <p>
          <strong>Judul Program:</strong> {program?.judul_program || '-'}
        </p>
        <p>
          <strong>Periode:</strong>{' '}
          {new Date(program?.tgl_mulai).toLocaleDateString('id-ID')} s/d{' '}
          {new Date(program?.tgl_berakhir).toLocaleDateString('id-ID')}
        </p>
        <p>
          <strong>Target Donasi:</strong> Rp{' '}
          {new Intl.NumberFormat('id-ID').format(program?.target_donasi || 0)}
        </p>
      </div>

      <table className="w-full border border-black text-sm">
        <thead>
          <tr className="bg-white">
            <th className="border px-2 py-1">No</th>
            <th className="border px-2 py-1">Nama Donatur</th>
            <th className="border px-2 py-1">Tanggal Donasi</th>
            <th className="border px-2 py-1">Jumlah Donasi</th>
          </tr>
        </thead>
        <tbody>
          {detail.length > 0 ? (
            detail.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-center">{index + 1}</td>
                <td className="border px-2 py-1">{item.nama_donatur}</td>
                <td className="border px-2 py-1 text-center">
                  {new Date(item.tanggal_donasi).toLocaleDateString('id-ID')}
                </td>
                <td className="border px-2 py-1 text-right">
                  Rp {new Intl.NumberFormat('id-ID').format(item.jumlah_donasi)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-2 py-2 text-center">
                Tidak ada data donasi
              </td>
            </tr>
          )}

          <tr className="font-semibold bg-white">
            <td colSpan="3" className="border px-2 py-1 text-center">
              Total Donasi
            </td>
            <td className="border px-2 py-1 text-right">
              Rp {new Intl.NumberFormat('id-ID').format(Number(total) || 0)}

            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 text-sm">
        Dicetak pada: {new Date().toLocaleDateString('id-ID')}
      </p>
    </div>
  );
};

export default DetailPrintPreview;

