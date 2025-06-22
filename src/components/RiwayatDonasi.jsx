import React from 'react';

const RiwayatDonasi = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Riwayat Donasi</h2>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 border">No</th>
              <th className="p-2 border">Judul Donasi</th>
              <th className="p-2 border">Jumlah Donasi</th>
              <th className="p-2 border">Tanggal Donasi</th>
              <th className="p-2 border">Status Donasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">1</td>
              <td className="p-2 border">Donasi Pendidikan</td>
              <td className="p-2 border">Rp 100.000</td>
              <td className="p-2 border">20 Juni 2025</td>
              <td className="p-2 border text-green-600 font-semibold">Sukses</td>
            </tr>
            <tr>
              <td className="p-2 border">2</td>
              <td className="p-2 border">Donasi Sosial</td>
              <td className="p-2 border">Rp 50.000</td>
              <td className="p-2 border">15 Juni 2025</td>
              <td className="p-2 border text-yellow-600 font-semibold">Menunggu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatDonasi;