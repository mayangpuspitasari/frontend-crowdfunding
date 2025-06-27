import { useEffect, useState } from 'react';
import axios from 'axios';

const ModalKegiatan = ({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  mode = 'tambah',
}) => {
  const [formKegiatan, setFormKegiatan] = useState({
    judul_kegiatan: '',
    id_kegiatan: '',
    deskripsi: '',
    tanggal_kegiatan: '',
  });

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [programList, setProgramList] = useState([]); // Default array

  //Ambil data program
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get('http://localhost:5000/program');

        // Pastikan ambil array, sesuaikan dengan struktur respons backend kamu
        const dataProgram = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setProgramList(dataProgram);
      } catch (err) {
        console.error('Gagal mengambil data program:', err);
      }
    };

    fetchProgram();
  }, []);

  // Isi ulang form saat edit
  useEffect(() => {
    if (initialData) {
      setFormKegiatan({
        judul_kegiatan: initialData.judul_kegiatan || '',
        deskripsi: initialData.deskripsi || '',
        id_program: initialData.id_program || '',
        tanggal_kegiatan: initialData.tanggal_kegiatan || '',
      });

      if (initialData.gambar) {
        setPreview(`http://localhost:5000${initialData.gambar}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormKegiatan({ ...formKegiatan, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formKegiatan).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (gambar) {
      formData.append('gambar', gambar);
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {mode === 'tambah' ? 'Tambah Program Donasi' : 'Edit Program Donasi'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul Kegiatan"
            name="judul_kegiatan"
            value={formKegiatan.judul_kegiatan}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program
            </label>
            <select
              name="id_program"
              value={formKegiatan.id_program}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">-- Pilih Judul Program --</option>
              {programList.map((program) => (
                <option key={program.id_program} value={program.id_program}>
                  {program.judul_program}
                </option>
              ))}
            </select>
          </div>
          <Textarea
            label="Deskripsi"
            name="deskripsi"
            value={formKegiatan.deskripsi}
            onChange={handleChange}
          />

          <Input
            type="date"
            label="Tanggal Kegiatan"
            name="tanggal_kegiatan"
            value={formKegiatan.tanggal_kegiatan}
            onChange={handleChange}
            required
          />
          {/* Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-40 h-28 object-cover rounded"
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

export default ModalKegiatan;

