const SearchBarAdmin = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-2">
      <label className="text-sm mr-2 mt-1">Search:</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border px-2 py-1 text-sm rounded-md"
      />
    </div>
  );
};

export default SearchBarAdmin;

