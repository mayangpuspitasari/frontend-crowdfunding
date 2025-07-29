import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailKegiatan from '../components/DetailKegiatan';

const DetailKegiatanPage = () => {
  const { id_kegiatan } = useParams();
  const [kegiatan, setKegiatan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await axios.get(
          `https://109.110.188.170:5000/kegiatan/${id_kegiatan}`,
        );
        setKegiatan(response.data);
      } catch (error) {
        console.error('Gagal mengambil data Kegiatan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, [id_kegiatan]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!kegiatan)
    return <p className="text-center mt-10">Kegiatan tidak ditemukan</p>;

  return (
    <DetailKegiatan
      id_kegiatan={kegiatan.id_kegiatan}
      judul_program={kegiatan.judul_program}
      judul={kegiatan.judul_kegiatan}
      tanggal_kegiatan={kegiatan.tanggal_kegiatan}
      deskripsi={kegiatan.deskripsi}
      gambar={kegiatan.gambar}
    />
  );
};

export default DetailKegiatanPage;

