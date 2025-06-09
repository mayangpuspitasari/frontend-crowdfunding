import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailProgram from '../components/DetailProgram';

const DetailProgramPage = () => {
  const { id_program } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/program/${id_program}`,
        );
        setProgram(response.data);
      } catch (error) {
        console.error('Gagal mengambil data program:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id_program]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!program)
    return <p className="text-center mt-10">Program tidak ditemukan</p>;

  return (
    <DetailProgram
      id_program = {program.id_program}
      judul={program.judul}
      terkumpul={program.total_terkumpul}
      target={program.target_donasi}
      persentase={Math.floor(
        (program.total_terkumpul / program.target_donasi) * 100,
      )}
      sisa_hari={program.sisa_hari}
      donatur={program.jumlah_donatur}
      deskripsi={program.deskripsi}
      gambar={program.gambar}
    />
  );
};

export default DetailProgramPage;

