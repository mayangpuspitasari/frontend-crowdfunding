import SemuaKegiatan from '../components/SemuaKegiatan';

const KegiatanPage = () => {
  return (
    <div className="bg-orange-50 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold text-orange-500 mb-4">
          Kegiatan Lazismu Asahan
        </h2>
      </div>
      <SemuaKegiatan />
    </div>
  );
};

export default KegiatanPage;

