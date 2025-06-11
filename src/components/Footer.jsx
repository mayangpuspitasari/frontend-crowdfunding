import { useEffect, useState } from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    alamat:
      'Jl. Dr. Setia Budi, Kisaran Kota, Kec. Kota Kisaran Timur, Kabupaten Asahan, Sumatera Utara 21211.',
    kontak: '081265311204',
    email: 'lazismuasahan@gmail.com',
    fb: 'Lazismu Asahan',
    ig: '@lazismuasahan',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetch('http://localhost:5000/instansi/footer');
        const data = await res.json();
        setFooterData(data);
      } catch (err) {
        console.error('Gagal mengambil data footer:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getFooterData();
  }, []);

  if (isLoading) {
    return (
      <footer className="mt-20 bg-zinc-800 text-white text-center py-10">
        <p className="text-gray-300 text-sm animate-pulse">
          Memuat data footer...
        </p>
      </footer>
    );
  }

  return (
    <footer className="mt-20 bg-zinc-800 text-white">
      {/* Konten utama */}
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Tentang Kami */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-3">
            Tentang Kami
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            LAZISMU (Lembaga Amil Zakat, Infaq, dan Shadaqah Muhammadiyah)
            adalah lembaga zakat resmi milik Muhammadiyah yang berkomitmen untuk
            mengelola dana zakat, infak, dan sedekah secara amanah, transparan,
            dan profesional. LAZISMU Asahan hadir untuk membantu masyarakat
            melalui berbagai program sosial, pendidikan, kesehatan, dan
            kemanusiaan.
          </p>
        </div>

        {/* Alamat */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-3">Alamat</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {footerData.alamat}
          </p>
        </div>

        {/* Kontak */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-3">Kontak</h2>

          <div className="flex items-center text-sm text-gray-300 mb-2">
            <FaPhoneAlt className="text-green-600 mr-2" />
            <span>{footerData.kontak}</span>
          </div>

          <div className="flex items-center text-sm text-gray-300 mb-2">
            <FaEnvelope className="text-blue-600 mr-2" />
            <span>{footerData.email}</span>
          </div>

          <div className="flex items-center text-sm text-gray-300 mb-2">
            <FaInstagram className="text-pink-600 mr-2" />
            <a
              href={`https://instagram.com/${footerData.ig}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @{footerData.ig}
            </a>
          </div>

          <div className="flex items-center text-sm text-gray-300">
            <FaFacebook className="text-blue-800 mr-2" />
            <a
              href={`https://facebook.com/${footerData.fb}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {footerData.fb}
            </a>
          </div>
        </div>
      </div>

      {/* Batas bawah */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-700 py-4 px-6">
        &copy; {new Date().getFullYear()} LAZISMU Asahan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

