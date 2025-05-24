const Hero = ({ imageSrc, imageAlt }) => {
  return (
    <section className="bg-orange-50 py-16 px-6">
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
    <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">
        Mari Bersama Mewujudkan Kebaikan
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Dukung program-program Lazismu Asahan untuk membantu sesama melalui platform donasi online.
      </p>
      <a
        href="/program"
        className="inline-block bg-orange-400 text-white text-lg font-semibold px-6 py-3 rounded hover:bg-orange-500 transition"
      >
        Donasi Sekarang
      </a>
    </div>
    <div className="md:w-1/2">
      <img src="/ilus2.png" alt="Ilustrasi Donasi" className="w-85 h-85 object-cover" />

    </div>
  </div>
</section>

  );
};

export default Hero;
