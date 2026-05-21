import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import testimonials from "../../assets/testimonials.json";
import SectionReveal from "./SectionReveal";

const INTERVAL_MS = 5000;

function avatarUrl(nama) {
  return `https://i.pravatar.cc/300?u=${nama.replace(/\s+/g, "+")}`;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  const total = testimonials.length;
  const current = testimonials[activeIndex];

  const goTo = useCallback(
    (index) => {
      const next = (index + total) % total;
      setActiveIndex(next);
      setSlideKey((k) => k + 1);
    },
    [total]
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
      setSlideKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  return (
    <section id="testimonials" className="bg-latar py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-hijau font-medium uppercase tracking-widest text-sm mb-3">
              Ulasan Pelanggan
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl text-teks">
              Apa Kata Mereka Tentang Sedap
            </h2>
          </div>

          <div
            className="relative bg-white rounded-2xl shadow-lg p-6 md:p-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              key={slideKey}
              className="carousel-slide-enter carousel-slide-active grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="flex justify-center">
                <img
                  src={avatarUrl(current.nama)}
                  alt={current.nama}
                  className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-md transition-all duration-300"
                />
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-hijau text-5xl mb-4 opacity-80" />
                <p className="text-teks-samping text-lg leading-relaxed italic">
                  {current.ulasan}
                </p>
                <h3 className="mt-6 font-poppins text-xl text-teks">
                  {current.nama}
                </h3>
                <p className="text-teks-samping text-sm">Pelanggan Setia</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Testimoni sebelumnya"
                className="p-3 rounded-full border-2 border-hijau text-hijau transition-all duration-300 hover:bg-hijau hover:text-white"
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.nama}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Testimoni ${index + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-hijau w-6"
                        : "bg-garis hover:bg-hijau/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Testimoni berikutnya"
                className="p-3 rounded-full border-2 border-hijau text-hijau transition-all duration-300 hover:bg-hijau hover:text-white"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
