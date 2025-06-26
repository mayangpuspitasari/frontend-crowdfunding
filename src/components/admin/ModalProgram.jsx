import { useEffect, useState } from 'react';
import axios from 'axios';

const ModalProgram = ({ isOpen, onClose, onSave, initialData = {}, mode = 'tambah' }) => {
  const [form, setForm] = useState({
    judul_program: '',
    deskripsi: '',
    id_kategori: '',
    tgl_mulai: '',
    tgl_berakhir: '',
    target_donasi: 0,
    status: '',
  });

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [kategoriList, setKategoriList] = useState([]); // Default array

  // ✅ Ambil data kategori
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await axios.get('http://localhost:5000/kategori');

        // Pastikan ambil array, sesuaikan dengan struktur respons backend kamu
        const dataKategori = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setKategoriList(dataKategori);
      } catch (err) {
        console.error('Gagal mengambil data kategori:', err);
      }
    };

    fetchKategori();
  }, []);

  // ✅ Isi ulang form saat edit
  useEffect(() => {
    if (initialData) {
      setForm({
        judul_program: initialData.judul_program || '',
        deskripsi: initialData.deskripsi || '',
        id_kategori: initialData.id_kategori || '',
        tgl_mulai: initialData.tgl_mulai || '',
        tgl_berakhir: initialData.tgl_berakhir || '',
        target_donasi: initialData.target_donasi || 0,
        status: initialData.status || '',
      });

      if (initialData.gambar) {
        setPreview(`http://localhost:5000${initialData.gambar}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
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
          <Input label="Judul Program" name="judul_program" value={form.judul_program} onChange={handleChange} />
          <Textarea label="Deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} />

          {/* ✅ Dropdown Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
           <select
  name="id_kategori"
  value={form.id_kategori}
  onChange={handleChange}
  required
  className="w-full border px-3 py-2 rounded-md"
>
  <option value="">-- Pilih Kategori --</option>
  {kategoriList.map((kategori) => (
    <option key={kategori.id_kategori} value={kategori.id_kategori}>
      {kategori.jenis_kategori}
    </option>
  ))}
</select>

          </div>

         <Input
  type="date"
  label="Tanggal Mulai"
  name="tgl_mulai"
  value={form.tgl_mulai}
  onChange={handleChange}
  required
/>
<Input
  type="date"
  label="Tanggal Berakhir"
  name="tgl_berakhir"
  value={form.tgl_berakhir}
  onChange={handleChange}
  required
/>

          <Input label="Target Donasi" name="target_donasi" value={form.target_donasi} onChange={handleChange} type="number" />
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
  <select
    name="status"
    value={form.status}
    onChange={handleChange}
    required
    className="w-full border px-3 py-2 rounded-md"
  >
    <option value="">-- Pilih Status --</option>
    <option value="Aktif">Aktif</option>
    <option value="Tidak Aktif">Tidak Aktif</option>
  </select>
</div>


          {/* ✅ Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 w-40 h-28 object-cover rounded" />
            )}
          </div>

          {/* ✅ Tombol */}
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
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full border px-3 py-2 rounded-md"
    />
  </div>
);

export default ModalProgram;
