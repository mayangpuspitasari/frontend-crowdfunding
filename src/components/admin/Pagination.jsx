const Pagination = ({ page, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-end mt-6 space-x-1 text-sm flex-wrap">
      {/* Tombol Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-2 rounded-md border ${
          page === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-orange-100 text-gray-700 border-gray-300'
        } transition`}
      >
        Previous
      </button>

      {/* Nomor Halaman */}
      {generatePageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-2 rounded-md border ${
            page === num
              ? 'bg-orange-500 text-white'
              : 'bg-white hover:bg-orange-100 text-gray-700 border-gray-300'
          } transition`}
        >
          {num}
        </button>
      ))}

      {/* Tombol Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-2 rounded-md border ${
          page === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-orange-100 text-gray-700 border-gray-300'
        } transition`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

