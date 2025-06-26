import { useEffect, useState } from 'react';

const ModalUser = ({ isOpen, onClose, onSave, initialData = null, mode = 'tambah' }) => {
  const [formUser, setFormUser] = useState({
    nama: '',
    no_hp: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormUser({
        nama: initialData.nama || '',
        no_hp: initialData.no_hp || '',
      });
    } else {
      setFormUser({ nama: '', no_hp: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah User' : 'Edit User'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={formUser.nama}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md mb-4"
            placeholder="Masukkan nama"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
          <input
            type="text"
            name="no_hp"
            value={formUser.no_hp}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md mb-4"
            placeholder="Masukkan nomor HP"
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

export default ModalUser;
