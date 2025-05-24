// src/sections/DonationCategory.jsx
import React, { useState } from "react";

const categories = [
  "Donasi Sosial",
  "Donasi Kesehatan",
  "Donasi Pendidikan",
  "Donasi Sukarela",
];

const KategoriDonasi = ({ onCategorySelect }) => {
  const [active, setActive] = useState(null);

  const handleClick = (category) => {
    setActive(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-6 bg-gray-100">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition
            ${
              active === category
                ? "bg-orange-400 text-white border-orange-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default KategoriDonasi;
