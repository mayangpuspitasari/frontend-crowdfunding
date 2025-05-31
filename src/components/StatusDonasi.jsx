const StatusDonasi = ({ data }) => {
  return (
    <div>
      <section className=" bg-orange-50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-500 flex flex-col md:flex-row justify-between text-center divide-y md:divide-y-0 md:divide-x border rounded-lg overflow-hidden shadow-md">
            {/* Program Donasi */}
            <div className="w-full md:w-1/3 py-6 px-4">
              <h3 className="text-base text-white font-semibold">
                Program Donasi
              </h3>
              <p className="text-2xl text-white font-bold mt-1">
                {data.totalProgram}
              </p>
            </div>

            {/* Donasi Terkumpul */}
            <div className="w-full md:w-1/3 py-6 px-4">
              <h3 className="text-base text-white font-semibold">
                Donasi Terkumpul
              </h3>
              <p className="text-2xl font-bold mt-1 text-yellow-300">
                Rp. {data.totalDonasi.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Donatur Terdaftar */}
            <div className="w-full md:w-1/3 py-6 px-4">
              <h3 className="text-base text-white font-semibold">
                Donatur Terdaftar
              </h3>
              <p className="text-2xl text-white font-bold mt-1">
                {data.totalDonatur}
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-t-2 border-orange-400 mb-6" />
    </div>
  );
};

export default StatusDonasi;

