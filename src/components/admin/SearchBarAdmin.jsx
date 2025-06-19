import { Search } from 'lucide-react';

const SearchBarAdmin = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Cari user..."
          className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white text-gray-700"
        />
      </div>
    </div>
  );
};

export default SearchBarAdmin;

