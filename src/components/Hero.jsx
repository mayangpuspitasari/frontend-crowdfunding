import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const imageList = ['/hero1.jpeg', '/hero2.jpeg', '/hero4.jpeg'];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center transition-all duration-1000"
      style={{
        backgroundImage: `url('${imageList[currentImageIndex]}')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-1000"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug mb-4">
          Mari Bersama Mewujudkan Kebaikan
        </h1>
        <p className="text-white text-base sm:text-lg mb-6">
          Dukung program-program Lazismu Asahan untuk membantu sesama melalui
          platform donasi online.
        </p>
        <Link
          to="/program"
          className="inline-block bg-white text-orange-500 font-semibold px-6 py-3 rounded hover:bg-orange-100 transition"
        >
          Donasi Sekarang
        </Link>
      </div>
    </section>
  );
};

export default Hero;

