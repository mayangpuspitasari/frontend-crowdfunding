import {Link} from 'react-router-dom';
const Hero = ({ imageSrc = '/ilus2.png', imageAlt = 'Ilustrasi Donasi' }) => {
  return (
    <section className="bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Konten teks */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 mb-4 leading-snug">
            Mari Bersama Mewujudkan Kebaikan
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Dukung program-program Lazismu Asahan untuk membantu sesama melalui
            platform donasi online.
          </p>
          <Link
            to="/program"
            className="inline-block bg-orange-400 text-white text-sm sm:text-base lg:text-lg font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded hover:bg-orange-500 transition"
          >
            Donasi Sekarang
          </Link>
        </div>

        {/* Gambar ilustrasi */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

