import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatusDonasi from '../components/StatusDonasi';
import DonasiCard from '../components/DonasiCard';
import Footer from '../components/Footer';

const dataDonasi = [
  {
    judul: "Bantu Pembangunan Masjid",
    terkumpul: 120000,
    target: 200000,
    hariLagi: 5,
    donatur: 10,
    gambar: "/public/ilus2.png",
  },
  {
    judul: "Donasi Pendidikan Anak Yatim",
    terkumpul: 80000,
    target: 150000,
    hariLagi: 7,
    donatur: 8,
    gambar: "/public/ilus2.png",
  },
  {
    judul: "Bantuan Kesehatan Warga",
    terkumpul: 50000,
    target: 100000,
    hariLagi: 3,
    donatur: 5,
    gambar: "/public/ilus2.png",
  },
  
];

const dummyData = {
  totalProgram: 25,
  totalDonasi: 10000000,
  totalDonatur: 25,
};


const HomePage = () => {
    const handleCategorySelect = (category) => {
    console.log("Kategori dipilih:", category);

    
  };
  return (
    <div>
      <Navbar />
      <Hero />
      <StatusDonasi data={dummyData} />

       {/* SECTION: Card Program Donasi */}
      <section className="py-10 px-4 border-t border-orange-500 pt-8 mb-4">
  <div className="flex justify-between items-center mb-4 ">
    <h2 className="text-3xl font-bold text-orange-500">Mari Bantu Mereka</h2>
    <a href="/program" className="text-blue-600 hover:underline">Lihat Semuanya</a>
  </div>
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
    {dataDonasi.slice(0, 3).map((item, index) => (
      <DonasiCard key={index} {...item} />
    ))}
  </div>
</section>

    <Footer/>

    </div>
  );
};

export default HomePage;
