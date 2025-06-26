// File: ModalKategori.jsx
import { useEffect, useState } from 'react';

const ModalKategori = ({ isOpen, onClose, onSave, initialValue = '', mode = 'tambah' }) => {
  const [jenisKategori, setJenisKategori] = useState('');

  useEffect(() => {
    setJenisKategori(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jenisKategori.trim()) return;

    onSave(jenisKategori);
    setJenisKategori('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah Kategori' : 'Edit Kategori'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Kategori
          </label>
          <input
            type="text"
            value={jenisKategori}
            onChange={(e) => setJenisKategori(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-4"
            placeholder="Masukkan jenis kategori"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalKategori;
