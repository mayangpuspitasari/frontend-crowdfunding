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
    password: '',
    no_hp: '',
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormUser({
        nama: initialData.nama || '',
        email: initialData.email || '',
        password: '', // kosongkan untuk edit
        no_hp: initialData.no_hp || '',
      });

      if (initialData.foto) {
        setPreview(`https://109.110.188.170:5000${initialData.foto}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', formUser.nama);
    formData.append('email', formUser.email);
    formData.append('no_hp', formUser.no_hp);

    if (formUser.password.trim() !== '') {
      formData.append('password', formUser.password);
    }

    if (foto) {
      formData.append('foto', foto);
    }

    onSave(formData);
    if (foto) {
      setTimeout(() => {
        window.location.reload(); // Reload halaman untuk memperbarui foto
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah User' : 'Edit Profil'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama"
            name="nama"
            value={formUser.nama}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={formUser.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            value={formUser.password}
            onChange={handleChange}
            type="password"
            placeholder="Biarkan kosong jika tidak ingin ubah"
          />
          <Input
            label="No Hp"
            name="no_hp"
            value={formUser.no_hp}
            onChange={handleChange}
          />

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview Foto"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

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
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
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

