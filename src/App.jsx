import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import Footer from './components/Footer';
import DetailProgramPage from './pages/DetailProgramPage';

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
            {/* <Route path="/kegiatan" element={<KegiatanPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/cara-berdonasi" element={<CaraBerdonasiPage />} />
          <Route path="/struktur" element={<StrukturPage />} />
          <Route path="/masuk" element={<MasukPage />} />
          <Route path="/daftar" element={<DaftarPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

