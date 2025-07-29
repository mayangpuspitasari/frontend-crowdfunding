import { useEffect, useState } from 'react';

const ModalInstansi = ({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  mode = 'edit',
}) => {
  const [formInstansi, setFormInstansi] = useState({
    deskripsi: '',
    visi: '',
    misi: '',
    alamat: '',
    kontak: '',
    email: '',
    fb: '',
    ig: '',
    rekening: '',
  });

  const [logo, setLogo] = useState(null);
  const [struktur, setStruktur] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewStruktur, setPreviewStruktur] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormInstansi({
        deskripsi: initialData.deskripsi || '',
        visi: initialData.visi || '',
        misi: initialData.misi || '',
        alamat: initialData.alamat || '',
        kontak: initialData.kontak || '',
        email: initialData.email || '',
        fb: initialData.fb || '',
        ig: initialData.ig || '',
        rekening: initialData.rekening || '',
      });

      // Selalu reset preview saat modal dibuka kembali
      if (initialData.logo) {
        const url = initialData.logo.startsWith('/instansi/')
          ? `https://109.110.188.170:5000${initialData.logo}`
          : `https://109.110.188.170:5000/instansi/${initialData.logo}`;
        setPreviewLogo(url);
      }

      if (initialData.struktur) {
        const url = initialData.struktur.startsWith('/instansi/')
          ? `https://109.110.188.170:5000${initialData.struktur}`
          : `https://109.110.188.170:5000/instansi/${initialData.struktur}`;
        setPreviewStruktur(url);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormInstansi({ ...formInstansi, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleStrukturChange = (e) => {
    const file = e.target.files[0];
    setStruktur(file);
    setPreviewStruktur(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formInstansi).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (logo) formData.append('logo', logo);
    if (struktur) formData.append('struktur', struktur);

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah Instansi' : 'Edit Instansi'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="Deskripsi"
            name="deskripsi"
            value={formInstansi.deskripsi}
            onChange={handleChange}
          />
          <Textarea
            label="Visi"
            name="visi"
            value={formInstansi.visi}
            onChange={handleChange}
          />
          <Textarea
            label="Misi"
            name="misi"
            value={formInstansi.misi}
            onChange={handleChange}
          />
          <Textarea
            label="Alamat"
            name="alamat"
            value={formInstansi.alamat}
            onChange={handleChange}
          />
          <Input
            label="Kontak"
            name="kontak"
            value={formInstansi.kontak}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={formInstansi.email}
            onChange={handleChange}
          />
          <Input
            label="Facebook"
            name="fb"
            value={formInstansi.fb}
            onChange={handleChange}
          />
          <Input
            label="Instagram"
            name="ig"
            value={formInstansi.ig}
            onChange={handleChange}
          />
          <Input
            label="No Rekening"
            name="rekening"
            value={formInstansi.rekening}
            onChange={handleChange}
          />

          {/* Upload Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <input type="file" accept="image/*" onChange={handleLogoChange} />
            {previewLogo && (
              <img
                src={encodeURI(previewLogo)}
                alt="Logo Preview"
                className="mt-2 w-40 h-28 object-contain rounded"
              />
            )}
          </div>

          {/* Upload Struktur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Struktur
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleStrukturChange}
            />
            {previewStruktur && (
              <img
                src={encodeURI(previewStruktur)}
                alt="Struktur Preview"
                className="mt-2 w-40 h-28 object-contain rounded"
              />
            )}
          </div>

          {/* Tombol */}
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

// Komponen input
const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded-md"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full border px-3 py-2 rounded-md"
    />
  </div>
);

export default ModalInstansi;

