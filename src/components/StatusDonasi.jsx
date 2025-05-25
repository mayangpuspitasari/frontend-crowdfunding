
const StatusDonasi =({ data }) => {
  return (
    <section className="bg-orange-50 py-6 ">
      <div className=" max-w-6xl mx-auto px-4">
        <div className=" bg-orange-500 flex flex-col md:flex-row justify-between text-center divide-y md:divide-y-0 md:divide-x border rounded-md overflow-hidden">
          <div className="w-full md:w-1/3 py-4 px-4">
            <h3 className="text-sm text-white font-bold">Program Donasi</h3>
            <p className="text-2xl text-white font-semibold mt-1">{data.totalProgram}</p>
          </div>
          <div className="w-full md:w-1/3 py-4 px-4">
            <h3 className="text-sm text-white font-bold">Donasi Terkumpul</h3>
            <p className="text-2xl  text-white font-semibold mt-1 text-orange-500">
              Rp. {data.totalDonasi.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="w-full md:w-1/3 py-4 px-4">
            <h3 className="text-sm text-white font-bold">Donatur Terdaftar</h3>
            <p className="text-2xl text-white font-semibold mt-1">{data.totalDonatur}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatusDonasi;