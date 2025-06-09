import { useParams } from 'react-router-dom';
import Donasi from '../components/Donasi';


const DonasiPage = () => {
    const { id } = useParams();
  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <Donasi />
    </div>
  );
};

export default DonasiPage;
