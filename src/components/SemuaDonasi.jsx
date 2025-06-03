import React, { useEffect, useState } from 'react';
import CardProgram from './CardProgram';
import SearchBar from './SearchBar'; // pastikan import komponen search
import axios from 'axios';

const SemuaDonasi = () => {
  const [donasi, setDonasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  const fetchData = async (page, keyword = '') => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/program?page=${page}&limit=6&search=${encodeURIComponent(
          keyword,
        )}`,
      );
      setDonasi(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, keyword);
  }, [page, keyword]);

  const handleSearch = (value) => {
    setPage(1); // reset ke halaman 1 saat keyword berubah
    setKeyword(value);
  };

  return (
    <div className="bg-orange-50 px-4 md:px-8">
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : donasi.length === 0 ? (
        <p className="text-center text-red-500">Program tidak tersedia.</p>
      ) : (
        <>
          <div className="px-2 flex flex-col gap-6">
            {donasi.map((item) => (
              <CardProgram
                key={item.id_program}
                id_program={item.id_program}
                judul={item.judul_program}
                terkumpul={item.total_terkumpul}
                target={item.target_donasi}
                hariLagi={item.hari_tersisa}
                donatur={item.jumlah_donatur}
                gambar={item.gambar}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-10">
            <nav
              className="inline-flex rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === page;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default SemuaDonasi;

