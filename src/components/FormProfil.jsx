import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalUser from './ModalUser';

const FormProfil = () => {
  const [fotoPreview, setFotoPreview] = useState(null);
  const [tanggalGabung, setTanggalGabung] = useState('');
  const [form, setForm] = useState({
    nama: '',
    email: '',
    no_hp: '',
    password: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setForm({
        nama: data.nama || '',
        email: data.email || '',
        no_hp: data.no_hp || '',
        password: '',
      });

      if (data.foto) {
        setFotoPreview(`http://localhost:5000${data.foto}`);
      }

      const tgl = new Date(data.tanggal_daftar).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setTanggalGabung(tgl);
    } catch (err) {
      console.error('Gagal mengambil profil:', err);
      toast.error('Gagal memuat profil');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUpdate = async (formData) => {
    const token = sessionStorage.getItem('token');

    try {
      const res = await axios.put(
        'http://localhost:5000/user/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      toast.success(res.data.message || 'Profil berhasil diperbarui');
      setIsModalOpen(false);
      fetchUserProfile(); // Refresh data after update
    } catch (err) {
      console.error('Gagal update profil:', err);
      toast.error('Gagal memperbarui profil');
    }
  };

  return (
    <>
      <div className="flex justify-center mt-10 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-orange-100 w-full max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Foto Profil */}
            <div className="flex justify-center md:justify-start">
              <div className="w-32 h-32 rounded-full border-4 border-orange-300 overflow-hidden shadow-md">
                {fotoPreview ? (
                  <img
                    src={fotoPreview}
                    alt="Foto Profil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-100">
                    Tidak Ada Gambar
                  </div>
                )}
              </div>
            </div>

            {/* Info Profil */}
            <div className="md:col-span-2 space-y-2">
              <p className="text-sm text-gray-500 italic">
                Bergabung sejak: {tanggalGabung}
              </p>
              <h2 className="text-2xl font-bold text-orange-600">
                {form.nama}
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {form.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">No HP:</span> {form.no_hp}
              </p>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all"
              >
                Edit Profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        initialData={form}
        mode="edit"
      />
    </>
  );
};

export default FormProfil;

