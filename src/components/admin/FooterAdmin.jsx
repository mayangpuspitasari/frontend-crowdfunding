import { FaHeart, FaRegCopyright } from 'react-icons/fa';

const FooterAdmin = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-6 flex flex-col md:flex-row justify-center items-center">
        <p className="flex items-center gap-1 text-gray-600 text-sm mb-2 md:mb-0">
          <FaRegCopyright className="text-sm" />
          {new Date().getFullYear()}{' '}
          <span className="font-semibold">Lazismu Asahan</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterAdmin;

