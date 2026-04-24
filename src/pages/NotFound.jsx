import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-6">
        <h1 className="text-9xl font-medium text-gray-300 leading-none tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl font-medium text-gray-800 mb-2">
          Halaman tidak ditemukan
        </h2>
        <p className="text-gray-500 mb-8">
          Sepertinya halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}