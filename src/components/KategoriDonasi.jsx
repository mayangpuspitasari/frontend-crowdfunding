import React from 'react';

const KategoriDonasi = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 bg-orange-50 border-t border-orange-100">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              selected === category
                ? 'bg-orange-500 text-white'
                : 'bg-white text-orange-500 border border-orange-500 hover:bg-orange-100'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default KategoriDonasi;
