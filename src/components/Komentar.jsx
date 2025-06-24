import { useEffect, useState } from 'react';

const Komentar = ({ id_program }) => {
  const [komentar, setKomentar] = useState('');
  const [daftarKomentar, setDaftarKomentar] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id_user = localStorage.getItem('id_user'); // Ambil id_user dari localStorage

  // Ambil komentar dari backend
  const fetchKomentar = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/komentar/program/${id_program}`,
      );
      const data = await res.json();
      setDaftarKomentar(data);
    } catch (err) {
      console.error('Gagal mengambil komentar:', err);
    }
  };

  useEffect(() => {
    fetchKomentar();
  }, [id_program]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!komentar.trim()) return;

    if (!id_user) {
      alert('Silakan login terlebih dahulu untuk mengomentari.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/komentar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_user, id_program, komentar }),
      });

      if (res.ok) {
        setKomentar('');
        await fetchKomentar(); // Refresh komentar dari server
      }
    } catch (err) {
      console.error('Gagal mengirim komentar:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Form komentar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center"
      >
        <input
          type="text"
          placeholder="Tinggalkan Komentar"
          value={komentar}
          onChange={(e) => setKomentar(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition w-full md:w-auto"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>

      {/* Daftar komentar */}
      {daftarKomentar.length === 0 ? (
        <p className="text-gray-500 text-sm">Belum ada komentar.</p>
      ) : (
        daftarKomentar.map((item) => (
          <div
            key={item.id_komentar}
            className="bg-white border px-6 py-4 rounded-md mb-6"
          >
            <p className="font-semibold mb-1">{item.nama_user || 'Anonim'}</p>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(item.tanggal_komentar).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-gray-700 whitespace-pre-line">{item.komentar}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Komentar;

