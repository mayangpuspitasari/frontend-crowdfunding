import React, { useEffect, useState } from 'react';
import CardProgram from './CardProgram';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import axios from 'axios';

const SemuaDonasi = ({ kategori }) => {
  const [donasi, setDonasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  const fetchData = async (page, keyword = '', kategori = '') => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/program?page=${page}&limit=6&search=${encodeURIComponent(
          keyword,
        )}&kategori=${encodeURIComponent(kategori)}`,
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
    fetchData(page, keyword, kategori === 'Semua' ? '' : kategori);
  }, [page, keyword, kategori]);

  const handleSearch = (value) => {
    setPage(1);
    setKeyword(value);
  };

  return (
    <div className="bg-orange-50 px-4 md:px-8">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Siapa yang ingin kamu bantu hari ini?"
      />

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
                status={item.status}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SemuaDonasi;

