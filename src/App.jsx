import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import PimpinanLayout from './layout/PimpinanLayout';

// Public Pages
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import DetailProgramPage from './pages/DetailProgramPage';
import DonasiPage from './pages/DonasiPage';
import KegiatanPage from './pages/KegiatanPage';
import DetailKegiatanPage from './pages/DetailKegiatanPage';
import ProfilPage from './pages/ProfilPage';
import TataCaraBerdonasiPage from './pages/TataCaraBerdonasiPage';
import StrukturPage from './pages/StrukturPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilUserPage from './pages/ProfilUserPage';

// Admin Pages
import DashboardPage from './pages/DashboardPage';
import KelolaUserPage from './pages/KelolaUserPage';
import KelolaProgramPage from './pages/KelolaProgramPage';
import KelolaKategoriPage from './pages/KelolaKategoriPage';
import KelolaDonasiPage from './pages/KelolaDonasiPage';
import KelolaKegiatanPage from './pages/KelolaKegiatanPage';
import KelolaKomentarPage from './pages/KelolaKomentarPage';
import ProfilAdminPage from './pages/ProfilAdminPage';
import KelolaLaporanPage from './pages/KelolaLaporanPage';
import KelolaInstansiPage from './pages/KelolaInstansiPage';

//Pimpinan Pages
import DashboardPimpinan from './pages/DashboardPimpinan';
import ProfilPimpinanPage from './pages/ProfilPimpinanPage';

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* ROUTE UTAMA UNTUK USER & DONATUR */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/program" element={<ProgramPage />} />
            <Route
              path="/program/:id_program"
              element={<DetailProgramPage />}
            />
            <Route path="/kegiatan" element={<KegiatanPage />} />
            <Route
              path="/kegiatan/:id_kegiatan"
              element={<DetailKegiatanPage />}
            />
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/cara-berdonasi" element={<TataCaraBerdonasiPage />} />
            <Route path="/struktur" element={<StrukturPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/daftar" element={<RegisterPage />} />

            {/* Khusus Donatur yang sudah login */}
            <Route
              element={<ProtectedRoute allowedRoles={['donatur', 'admin']} />}
            >
              <Route path="/donasi/:id" element={<DonasiPage />} />
              <Route path="/profil-user" element={<ProfilUserPage />} />
            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              <Route path="/admin/user" element={<KelolaUserPage />} />
              <Route path="/admin/program" element={<KelolaProgramPage />} />
              <Route path="/admin/kategori" element={<KelolaKategoriPage />} />
              <Route path="/admin/donasi" element={<KelolaDonasiPage />} />
              <Route path="/admin/kegiatan" element={<KelolaKegiatanPage />} />
              <Route path="/admin/komentar" element={<KelolaKomentarPage />} />
              <Route path="/admin/profil-admin" element={<ProfilAdminPage />} />
              <Route path="/admin/laporan" element={<KelolaLaporanPage />} />
              <Route path="/admin/instansi" element={<KelolaInstansiPage />} />
            </Route>
          </Route>

          {/* PIMPINAN */}
          <Route element={<ProtectedRoute allowedRoles={['pimpinan']} />}>
            <Route element={<PimpinanLayout />}>
              <Route
                path="/pimpinan/dashboard"
                element={<DashboardPimpinan />}
              />
              <Route
                path="/pimpinan/profil-pimpinan"
                element={<ProfilPimpinanPage />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

