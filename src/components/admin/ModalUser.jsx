import { useEffect, useState } from 'react';

const ModalUser = ({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  mode = 'tambah',
}) => {
  const [formUser, setFormUser] = useState({
    nama: '',
    email: '',
    no_hp: '',
    password: '',
  });

  // Isi ulang form saat edit
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormUser({
        nama: initialData.nama || '',
        email: initialData.email || '',
        no_hp: initialData.no_hp || '',
        password: '', // Kosongkan agar tidak tampil hash
      });
    } else if (mode === 'tambah' && isOpen) {
      setFormUser({
        nama: '',
        email: '',
        no_hp: '',
        password: '',
      });
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formUser);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah User' : 'Edit User'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama"
            name="nama"
            value={formUser.nama}
            onChange={handleChange}
          />

          {/* Email hanya bisa diisi saat tambah */}
          {mode === 'tambah' ? (
            <Input
              label="Email"
              name="email"
              value={formUser.email}
              onChange={handleChange}
              type="email"
              required
            />
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formUser.email}
                disabled
                className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          )}

          <Input
            label="No HP"
            name="no_hp"
            value={formUser.no_hp}
            onChange={handleChange}
          />

          <Input
            label={mode === 'edit' ? 'Password Baru (opsional)' : 'Password'}
            name="password"
            type="password"
            value={formUser.password}
            onChange={handleChange}
            placeholder={
              mode === 'edit' ? 'Kosongkan jika tidak ingin mengubah' : ''
            }
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border px-3 py-2 rounded-md"
    />
  </div>
);

export default ModalUser;

