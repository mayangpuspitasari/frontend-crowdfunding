import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatusDonasi from '../components/StatusDonasi';
import DonasiTerbaru from '../components/DonasiTerbaru';
import Footer from '../components/Footer';

const dummyData = {
  totalProgram: 25,
  totalDonasi: 10000000,
  totalDonatur: 25,
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <StatusDonasi data={dummyData} />

      <DonasiTerbaru />

      <Footer />
    </div>
  );
};

export default HomePage;

