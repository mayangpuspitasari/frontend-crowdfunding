import React, { useEffect, useState } from 'react';
import CardProgram from './CardProgram';
import axios from 'axios';

const SemuaDonasi = () => {
  const [donasi, setDonasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/program?page=${page}&limit=6`);
      setDonasi(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal fetch data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="px-4 md:px-8">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="px-10 flex flex-col gap-6">
            {donasi.map((item) => (
              <CardProgram
                key={item.id_program}
                judul={item.judul_program}
                terkumpul={item.total_terkumpul}
                target={item.target_donasi}
                hariLagi={item.hari_tersisa}
                donatur={item.jumlah_donatur}
                gambar={item.gambar}
              />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-gray-700">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SemuaDonasi;
