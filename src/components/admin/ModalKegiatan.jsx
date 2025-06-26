import { useEffect, useState } from 'react';

const ModalKegiatan = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  mode = 'tambah',
}) => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul || '');
      setDeskripsi(initialData.deskripsi || '');
      setTanggal(initialData.tanggal || '');
      setPreview(initialData.gambar || null);
      setGambar(null); // default-nya kosong dulu
    } else {
      setJudul('');
      setDeskripsi('');
      setTanggal('');
      setGambar(null);
      setPreview(null);
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim() || !tanggal) return;

    // Pakai FormData karena ada file
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('deskripsi', deskripsi);
    formData.append('tanggal', tanggal);

    if (gambar) {
      formData.append('gambar', gambar); // file baru
    }

    onSave(formData); // kirim ke parent
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah Kegiatan' : 'Edit Kegiatan'}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Kegiatan
          </label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-4"
            placeholder="Masukkan judul kegiatan"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-4"
            rows={3}
            placeholder="Masukkan deskripsi kegiatan"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal
          </label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border px-3 py-2 rounded-md mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mb-4"
          />

          {preview && (
            <div className="mb-4">
              <img
                src={preview.startsWith('/kegiatan') ? `http://localhost:5000${preview}` : preview}
                alt="Preview"
                className="rounded w-full h-auto max-h-52 object-cover"
              />
            </div>
          )}

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

export default ModalKegiatan;
