const Pagination = ({ page, onPageChange }) => {
  return (
    <div className="flex justify-end mt-4 text-sm">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span className="mx-4">{page}</span>
      <button onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
};

export default Pagination;

