import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import KategoriDonasi from '../components/KategoriDonasi';
import DonasiCard from '../components/DonasiCard';

const dataDonasi = [
  {
    judul: "Bantu Pembangunan Masjid",
    terkumpul: 200000,
    hariLagi: 5,
    donatur: 10,
    gambar: "/public/ilus2.png", // sesuaikan path gambarnya
  },
  {
    judul: "Donasi Pendidikan Anak Yatim",
    terkumpul: 200000,
    hariLagi: 5,
    donatur: 10,
    gambar: "/public/ilus2.png",
  },
  {
    judul: "Bantuan Kesehatan Warga",
    terkumpul: 200000,
    hariLagi: 5,
    donatur: 10,
    gambar: "/public/ilus2.png",
  },
];

const HomePage = () => {
    const handleCategorySelect = (category) => {
    console.log("Kategori dipilih:", category);

    
  };
  return (
    <div>
      <Navbar />
      <Hero />
       <KategoriDonasi onCategorySelect={handleCategorySelect} />

       {/* SECTION: Card Program Donasi */}
      <section className="py-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Program Donasi</h2>
          <a href="/program" className="text-blue-600 hover:underline">Lihat Semuanya</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {dataDonasi.map((item, index) => (
            <DonasiCard key={index} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
