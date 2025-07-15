import { Outlet } from 'react-router-dom';
import FooterAdmin from '../components/admin/FooterAdmin';

const PimpinanLayout = () => (
  <div className="flex flex-col min-h-screen bg-orange-50 print:bg-white">
    <main className="flex-grow">
      <Outlet />
    </main>
    <FooterAdmin />
  </div>
);

export default PimpinanLayout;

