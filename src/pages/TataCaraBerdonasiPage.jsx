import React from 'react';
import {
  CheckCircle,
  ClipboardList,
  Upload,
  UserCheck,
  Info,
  FileText,
} from 'lucide-react';

const TataCaraBerdonasiPage = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6 text-orange-500" />,
      title: 'Pilih Program Donasi',
      desc: 'Telusuri program donasi yang tersedia, lalu pilih salah satu sesuai keinginan Anda.',
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      title: 'Klik Tombol Donasi',
      desc: 'Klik tombol "Donasi Sekarang" pada program yang dipilih untuk masuk ke halaman form donasi.',
    },
    {
      icon: <Info className="w-6 h-6 text-orange-500" />,
      title: 'Isi Formulir Donasi',
      desc: 'Isi data pribadi dan lihat nomor rekening tujuan untuk mentransfer donasi.',
    },
    {
      icon: <Upload className="w-6 h-6 text-orange-500" />,
      title: 'Upload Bukti Pembayaran',
      desc: 'Unggah bukti transfer dengan gambar yang jelas untuk verifikasi sistem.',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
      title: 'Klik Tombol Kirim',
      desc: 'Setelah semua terisi dan bukti diunggah, klik "Kirim" untuk menyelesaikan proses.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-orange-500" />,
      title: 'Verifikasi Admin & Cek Status',
      desc: 'Status donasi dapat dilihat di Profil Donatur. Admin akan memverifikasi bukti transfer Anda.',
    },
  ];

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-orange-600 mb-10 text-center">
        Tata Cara Berdonasi
      </h1>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-xl flex items-start space-x-4"
          >
            <div className="flex-shrink-0">{step.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600">
                {`${index + 1}. ${step.title}`}
              </h3>
              <p className="text-gray-700 mt-1">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TataCaraBerdonasiPage;

