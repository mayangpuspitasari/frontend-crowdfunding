const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end mt-10">
      <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        {/* Tombol Prev */}
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Tombol Angka Halaman */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === page;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
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

        {/* Tombol Next */}
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

