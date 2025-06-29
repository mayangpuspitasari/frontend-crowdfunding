import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import ProfilAdmin from '../components/admin/ProfilAdmin';

const ProfilAdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-3">
              Profil Admin
            </h3>

            <ProfilAdmin />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilAdminPage;

