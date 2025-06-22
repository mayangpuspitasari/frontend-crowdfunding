import React, { useState } from 'react';

const FormProfil = () => {
  const [foto, setFoto] = useState(null);
  const [form, setForm] = useState({
    nama: '',
    password: '',
    email: '',
    noHp: '',
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden">
          {foto ? (
            <img src={foto} alt="Foto Profil" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
          )}
        </div>
        <input type="file" onChange={handleFileChange} className="mt-2 text-sm" />
      </div>

      <div className="w-full space-y-2">
        <p className="text-sm text-gray-600">Tanggal Bergabung: 1 Januari 2024</p>
        <input type="text" name="nama" placeholder="Nama" value={form.nama} onChange={handleInputChange} className="w-full p-2 rounded border" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleInputChange} className="w-full p-2 rounded border" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} className="w-full p-2 rounded border" />
        <input type="text" name="noHp" placeholder="No HP" value={form.noHp} onChange={handleInputChange} className="w-full p-2 rounded border" />
        <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500">Edit Profil</button>
      </div>
    </div>
  );
};

export default FormProfil;