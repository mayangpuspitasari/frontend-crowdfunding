// File: KelolaInstansiPage.jsx
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import InstansiTable from '../components/admin/InstansiTable';
import ModalInstansi from '../components/admin/ModalInstansi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const KelolaInstansiPage = () => {
  const [instansi, setInstansi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstansi, setSelectedInstansi] = useState(null); // null = edit mode

  const fetchInstansi = async () => {
    try {
      const res = await axios.get(`http://109.110.188.170:5000/instansi`);
      console.log('DATA INSTANSI ADMIN:', res.data);
      setInstansi(res.data); // res.data langsung berupa array
    } catch (err) {
      console.error('Gagal mengambil data instansi:', err);
      setInstansi([]);
    }
  };

  useEffect(() => {
    fetchInstansi();
  }, []);

  const handleEditInstansi = (instansi) => {
    setSelectedInstansi(instansi);
    setShowModal(true);
  };

  const handleSimpanInstansi = async (formData) => {
    try {
      await axios.put(
        `http://109.110.188.170:5000/instansi/${selectedInstansi.id_instansi}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      toast.success('Instansi berhasil diperbarui');
      setShowModal(false);
      fetchInstansi();
    } catch (error) {
      console.error('Gagal menyimpan instansi:', error);
      toast.error('Gagal menyimpan instansi');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">Data Instansi</h3>
            </div>

            {/* Modal untuk edit instansi */}
            <ModalInstansi
              key={selectedInstansi?.id_instansi}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleSimpanInstansi}
              initialData={selectedInstansi}
              mode="edit"
            />

            {/* Tampilkan hanya instansi pertama (asumsi hanya 1 data) */}
            {instansi.length > 0 ? (
              <InstansiTable
                data={instansi[0]}
                onEdit={() => handleEditInstansi(instansi[0])}
              />
            ) : (
              <p className="text-gray-500 mt-4">
                Data instansi belum tersedia.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default KelolaInstansiPage;

