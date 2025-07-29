import React, { useEffect, useState } from 'react';
import CardKegiatan from './CardKegiatan';
import SearchBar from './SearchBar';
import axios from 'axios';

const SemuaKegiatan = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  const fetchData = async (page, keyword = '') => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://109.110.188.170:5000/kegiatan?page=${page}&limit=6&search=${encodeURIComponent(
          keyword,
        )}`,
      );
      setKegiatan(res.data.data);
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
      <SearchBar onSearch={handleSearch} placeholder="Cari kegiatan..." />

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : kegiatan.length === 0 ? (
        <p className="text-center text-red-500">Kegiatan tidak Ada.</p>
      ) : (
        <>
          <div className="px-2 flex flex-col gap-6">
            {kegiatan.map((item) => (
              <CardKegiatan
                key={item.id_kegiatan}
                id_kegiatan={item.id_kegiatan}
                judul={item.judul_kegiatan}
                deskripsi={item.deskripsi}
                tanggal_kegiatan={item.tanggal_kegiatan}
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

export default SemuaKegiatan;

