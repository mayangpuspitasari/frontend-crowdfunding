const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white">
  <div className="max-w-screen-xl mx-auto px-10 py-8 flex flex-col md:flex-row justify-between items-start gap-4">
    <div className="md:w-1/3">
      <h2 className="text-xl font-bold text-orange-400 mb-2">Tentang Kami</h2>
      <p className="text-sm leading-relaxed">
        LAZISMU (Lembaga Amil Zakat, Infaq, dan Shadaqah Muhammadiyah) adalah lembaga zakat resmi milik Muhammadiyah yang berkomitmen untuk mengelola dana zakat, infak, dan sedekah secara amanah, transparan, dan profesional. LAZISMU Asahan hadir untuk membantu masyarakat melalui berbagai program sosial, pendidikan, kesehatan, dan kemanusiaan.
      </p>
    </div>
    <div className="md:w-1/3 pl-20">
      <h2 className="text-xl font-bold text-orange-400 mb-2">Alamat</h2>
      <p className="text-sm leading-relaxed">
        Jl. Dr. Setia Budi, Kisaran Kota, <br />
        Kec. Kota Kisaran Timur, Kabupaten Asahan, <br />
        Sumatera Utara 21211.
      </p>
    </div>
    <div className="md:w-1/3 pl-20">
      <h2 className="text-xl font-bold text-orange-400 mb-2">Kontak</h2>
      <p className="text-sm">Jalan Contoh No. 123, Kisaran, Sumatera Utara</p>
      <p className="text-sm">Email: info@lazismuasahan.or.id</p>
    </div>
  </div>

  <div className="text-center text-xs text-gray-400 mt-2">
    &copy; {new Date().getFullYear()} LAZISMU Asahan. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
