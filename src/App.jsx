import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import Footer from './components/Footer';
import DetailProgramPage from './pages/DetailProgramPage';
import DonasiPage from './pages/DonasiPage';
import KegiatanPage from './pages/KegiatanPage';
import ProfilPage from './pages/ProfilPage';
import TataCaraBerdonasiPage from './pages/TataCaraBerdonasiPage';
import StrukturPage from './pages/StrukturPage';
import DetailKegiatanPage from './pages/DetailKegiatanPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-orange-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/program" element={<ProgramPage />} />
            <Route
              path="/program/:id_program"
              element={<DetailProgramPage />}
            />
            <Route path="/donasi/:id" element={<DonasiPage />} />
            <Route path="/kegiatan" element={<KegiatanPage />} />
            <Route
              path="/kegiatan/:id_kegiatan"
              element={<DetailKegiatanPage />}
            />
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/cara-berdonasi" element={<TataCaraBerdonasiPage />} />
            <Route path="/struktur" element={<StrukturPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="*" element={<h2 className="text-center">404 Not Found</h2>} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

