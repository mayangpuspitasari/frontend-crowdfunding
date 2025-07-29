import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Donasi = ({ program }) => {
  const [rekening, setRekening] = useState('');
  const [form, setForm] = useState({
    nama: '',
    jumlah_donasi: '',
    dukungan: '',
    bukti: null,
    anonymous: false,
  });

  const id_user = sessionStorage.getItem('id_user');
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchRekening = async () => {
      try {
        const res = await fetch(
          'https://109.110.188.170:5000/instansi/rekening',
        );
        const data = await res.json();
        setRekening(data.rekening);
      } catch (err) {
        console.error('Gagal mengambil data rekening:', err);
      }
    };

    fetchRekening();
  }, []);

  useEffect(() => {
    const fetchNamaUser = async () => {
      try {
        const res = await axios.get(
          `https://109.110.188.170:5000/user/profile/${id_user}`,
        );
        setForm((prev) => ({ ...prev, nama: res.data.nama }));
      } catch (err) {
        console.error('Gagal mengambil nama user:', err);
      }
    };

    if (id_user) fetchNamaUser();
  }, [id_user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bukti) {
      return toast.error('Bukti transfer wajib diunggah!');
    }

    const formData = new FormData();
    formData.append('id_user', id_user);
    formData.append('jumlah_donasi', form.jumlah_donasi);
    formData.append('dukungan', form.dukungan);
    formData.append('id_program', program.id_program);
    formData.append('anonymous', form.anonymous ? 1 : 0);
    formData.append('bukti_pembayaran', form.bukti);

    try {
      await axios.post('https://109.110.188.170:5000/donasi', formData);
      toast.success('Donasi berhasil dikirim!');

      setForm({
        nama: form.nama,
        jumlah_donasi: '',
        dukungan: '',
        bukti: null,
        anonymous: false,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null; // reset file input manual
      }
    } catch (err) {
      toast.error('Gagal mengirim donasi.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="bg-orange-100 text-center py-5 px-4 rounded-md mb-6">
        <p className="text-sm text-gray-700">
          Silakan Transfer Ke Nomor Rekening Di Bawah Ini
        </p>
        <h2 className="text-2xl font-bold text-orange-500 mt-2 tracking-wide">
          {rekening || 'Memuat...'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nama:</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.nama}
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Program Donasi:
          </label>
          <input
            type="text"
            className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md border"
            value={program.judul_program}
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nominal Donasi:
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.jumlah_donasi}
            placeholder="Contoh: 100000"
            onChange={(e) =>
              setForm({ ...form, jumlah_donasi: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Dukungan dan Doa:
          </label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            rows="4"
            value={form.dukungan}
            placeholder="Tulis doa terbaik Anda..."
            onChange={(e) => setForm({ ...form, dukungan: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bukti Transfer:
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="w-full border px-3 py-2 rounded-md"
            onChange={(e) => setForm({ ...form, bukti: e.target.files[0] })}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonim"
            className="accent-orange-500"
            checked={form.anonymous}
            onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
          />
          <label htmlFor="anonim" className="ml-2 text-gray-700">
            Donasi sebagai Anonymous
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
        >
          Kirim Donasi
        </button>
      </form>
    </div>
  );
};

export default Donasi;

