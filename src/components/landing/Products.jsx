import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import productsData from "../../assets/products.json";
import SectionReveal from "./SectionReveal";
import Toast from "./Toast";

const PER_PAGE = 6;

function formatHarga(harga) {
  return `Rp ${harga.toLocaleString("id-ID")}`;
}

async function fetchFoodImageByCategory(category) {
  const res = await fetch(
    `https://foodish-api.com/api/images/${category}`
  );
  if (!res.ok) throw new Error("Gagal memuat gambar");
  const data = await res.json();
  return data.image;
}

function ImageSkeleton() {
  return (
    <div className="w-full aspect-[3/2] bg-garis animate-pulse" aria-hidden />
  );
}

function ProductCardSkeleton() {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md">
      <ImageSkeleton />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-garis rounded animate-pulse w-3/4" />
        <div className="h-4 bg-garis rounded animate-pulse w-1/3" />
      </div>
    </article>
  );
}

function ProductCard({ produk, onImageLoad, onPesan }) {
  const imgRef = useRef(null);
  const showImageSkeleton = !produk.gambar || !produk.imageLoaded;

  useEffect(() => {
    if (imgRef.current?.complete && produk.gambar) {
      onImageLoad(produk.id);
    }
  }, [produk.gambar, produk.id, onImageLoad]);

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full aspect-[3/2] bg-garis overflow-hidden">
        {showImageSkeleton && <ImageSkeleton />}
        {produk.bestSeller && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-md bg-hijau text-white text-xs font-medium shadow-md">
            ⭐ Best Seller
          </span>
        )}
        {produk.gambar && (
          <img
            ref={imgRef}
            src={produk.gambar}
            alt={produk.nama}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              produk.imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => onImageLoad(produk.id)}
          />
        )}
        <button
          type="button"
          onClick={() => onPesan(produk.nama)}
          className="absolute bottom-0 left-0 right-0 z-20 py-3 bg-hijau text-white font-medium translate-y-full group-hover:translate-y-0 transition-all duration-300"
        >
          Pesan
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-poppins text-lg text-teks">{produk.nama}</h3>
        <p className="mt-2 text-hijau font-semibold">
          {formatHarga(produk.harga)}
        </p>
      </div>
    </article>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimeoutRef = useRef(null);

  const totalPages = Math.ceil(productsData.length / PER_PAGE);

  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return productsData.slice(start, start + PER_PAGE);
  }, [currentPage]);

  const visibleProducts = useMemo(
    () =>
      pageProducts
        .map((item) => products.find((p) => p.id === item.id))
        .filter(Boolean),
    [products, pageProducts]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const images = await Promise.all(
          productsData.map((produk) =>
            fetchFoodImageByCategory(produk.category)
          )
        );
        if (cancelled) return;

        setProducts(
          productsData.map((produk, index) => ({
            ...produk,
            gambar: images[index],
            imageLoaded: false,
          }))
        );
      } catch {
        if (!cancelled) {
          setProducts(
            productsData.map((produk) => ({
              ...produk,
              gambar: null,
              imageLoaded: false,
            }))
          );
        }
      } finally {
        if (!cancelled) setFetching(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleImageLoad = useCallback((id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, imageLoaded: true } : p))
    );
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handlePesan = useCallback((nama) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast({
      visible: true,
      message: `🛒 ${nama} berhasil ditambahkan!`,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
      toastTimeoutRef.current = setTimeout(() => {
        setToast({ visible: false, message: "" });
        toastTimeoutRef.current = null;
      }, 350);
    }, 3000);
  }, []);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <section id="products" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-hijau font-medium uppercase tracking-widest text-sm mb-3">
              Produk Unggulan
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl text-teks">
              Hidangan Paling Favorit
            </h2>
            <p className="mt-4 text-teks-samping max-w-2xl mx-auto">
              Pilihan menu terbaik kami yang paling sering dipesan oleh
              pelanggan setia Sedap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fetching
              ? pageProducts.map((produk) => (
                  <ProductCardSkeleton key={produk.id} />
                ))
              : visibleProducts.map((produk) => (
                  <ProductCard
                    key={produk.id}
                    produk={produk}
                    onImageLoad={handleImageLoad}
                    onPesan={handlePesan}
                  />
                ))}
          </div>

          {!fetching && totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-md bg-hijau text-white font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:shadow-md"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-md font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-hijau text-white"
                          : "border border-hijau text-hijau hover:bg-hijau hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <p className="text-teks-samping text-sm sm:hidden">
                Halaman {currentPage} dari {totalPages}
              </p>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-6 py-2 rounded-md bg-hijau text-white font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:shadow-md"
              >
                Next
              </button>
            </div>
          )}
        </SectionReveal>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
