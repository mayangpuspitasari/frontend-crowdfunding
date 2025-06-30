import SidebarPimpinan from '../components/pimpinan/SidebarPimpinan';
import HeaderPimpinan from '../components/pimpinan/HeaderPimpinan';
import ProfilPimpinan from '../components/pimpinan/ProfilPimpinan';

const ProfilPimpinanPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarPimpinan />
      <div className="flex-1 flex flex-col">
        <HeaderPimpinan />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-3">
              Profil Pimpinan
            </h3>

            <ProfilPimpinan />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilPimpinanPage;

