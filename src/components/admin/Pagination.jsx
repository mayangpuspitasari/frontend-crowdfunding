const Pagination = ({ page, onPageChange }) => {
  return (
    <div className="flex justify-end mt-6 space-x-2 text-sm">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded-md border ${
          page === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-orange-100 text-gray-700 border-gray-300'
        } transition duration-200`}
      >
        Previous
      </button>

      <span className="px-4 py-2 bg-orange-500 text-white rounded-md">
        {page}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-md border bg-white hover:bg-orange-100 text-gray-700 border-gray-300 transition duration-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

