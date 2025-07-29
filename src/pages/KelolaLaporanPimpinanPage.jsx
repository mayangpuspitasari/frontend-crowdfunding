import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Komponen
import SidebarPimpinan from '../components/pimpinan/SidebarPimpinan';
import HeaderPimpinan from '../components/pimpinan/HeaderPimpinan';
import SearchBarAdmin from '../components/admin/SearchBarAdmin';
import Pagination from '../components/admin/Pagination';
import LaporanTablePimpinan from '../components/pimpinan/LaporanTablePimpinan';
import LaporanPrintPreview from '../components/admin/LaporanPrintPreview';
import DetailPrintPreview from '../components/admin/DetailPrintPreview';

const KelolaLaporanPimpinanPage = () => {
  const [laporan, setLaporan] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fullLaporan, setFullLaporan] = useState([]);

  const [detailData, setDetailData] = useState([]);
  const [detailTotal, setDetailTotal] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isDetailPrint, setIsDetailPrint] = useState(false);

  // Ambil data dengan pagination
  const fetchLaporan = async () => {
    try {
      const query = [
        `page=${page}`,
        `search=${search}`,
        fromDate ? `from=${fromDate}` : '',
        toDate ? `to=${toDate}` : '',
      ]
        .filter(Boolean)
        .join('&');

      const res = await axios.get(
        `https://109.110.188.170:5000/laporan/laporan_program?${query}`,
      );
      setLaporan(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal mengambil data laporan:', err);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, [page, search, fromDate, toDate]);

  // Ambil semua data untuk kebutuhan print
  const fetchAllLaporanForPrint = async () => {
    try {
      const query = [
        search ? `search=${search}` : '',
        fromDate ? `from=${fromDate}` : '',
        toDate ? `to=${toDate}` : '',
      ]
        .filter(Boolean)
        .join('&');

      const res = await axios.get(
        `https://109.110.188.170:5000/laporan/laporan_program_all?${query}`,
      );
      setFullLaporan(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil semua data laporan untuk print:', err);
    }
  };

  // Cetak semua laporan
  const handleCetakLaporan = async () => {
    await fetchAllLaporanForPrint();
    setIsDetailPrint(false); // pastikan bukan mode detail
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Cetak detail donasi per program
  const handleDetail = async (laporan) => {
    try {
      const res = await axios.get(
        `https://109.110.188.170:5000/laporan/laporan_program/${laporan.id_program}`,
      );
      setDetailData(res.data.detail);
      setDetailTotal(res.data.total_donasi);
      setSelectedProgram(laporan);
      setIsDetailPrint(true);

      setTimeout(() => {
        window.print();
        setIsDetailPrint(false);
      }, 500);
    } catch (err) {
      console.error('Gagal mengambil detail laporan:', err);
      Swal.fire('Error', 'Gagal mengambil detail laporan', 'error');
    }
  };

  return (
    <>
      {/* Tampilan normal */}
      <div className="no-print">
        <div className="flex min-h-screen bg-gray-50">
          <SidebarPimpinan />
          <div className="flex-1 flex flex-col">
            <HeaderPimpinan />
            <main className="p-6 flex-1">
              <div className="border rounded-lg p-6 bg-white shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl text-gray-800">
                    Data Laporan
                  </h3>
                </div>

                <div className="flex gap-2 items-center mb-4">
                  <label className="text-sm">Dari:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <label className="text-sm">Sampai:</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleCetakLaporan}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm shadow"
                  >
                    Cetak Laporan
                  </button>

                  <SearchBarAdmin
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari Data Laporan"
                  />
                </div>

                <LaporanTablePimpinan data={laporan} onDetail={handleDetail} />

                <Pagination
                  page={page}
                  onPageChange={setPage}
                  totalPages={totalPages}
                />
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mode Print */}
      <div className="hidden print:block print-area">
        {!isDetailPrint ? (
          <LaporanPrintPreview
            data={fullLaporan}
            fromDate={fromDate}
            toDate={toDate}
          />
        ) : (
          <DetailPrintPreview
            program={selectedProgram}
            detail={detailData}
            total={detailTotal}
          />
        )}
      </div>
    </>
  );
};

export default KelolaLaporanPimpinanPage;

