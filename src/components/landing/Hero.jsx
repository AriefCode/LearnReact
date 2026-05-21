import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={mounted ? "hero-fade-in" : "opacity-0"}>
            <p className="text-hijau font-medium uppercase tracking-widest text-sm mb-4">
              Selamat Datang di Sedap
            </p>
            <h1 className="font-poppins-extrabold text-teks text-4xl md:text-5xl lg:text-6xl leading-tight">
              Cicipi Sekali, Kenang Selamanya
            </h1>
            <p className="mt-6 text-teks-samping text-lg leading-relaxed">
              Nikmati hidangan Indonesia autentik dengan cita rasa yang
              menggugah selera. Dari masakan rumahan hingga menu spesial chef
              kami.
            </p>
            <a
              href="#products"
              onClick={handleCtaClick}
              className="inline-block mt-8 px-8 py-3 bg-hijau text-white rounded-md font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Lihat Menu
            </a>
          </div>

          <div
            className={`relative ${mounted ? "hero-fade-in-delay" : "opacity-0"}`}
          >
            <div
              className="dots-pattern absolute -left-6 -top-6 w-48 h-48 md:w-64 md:h-64 rounded-3xl -z-10"
              aria-hidden
            />
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/img/hero.jpg"
                alt="Hidangan Sedap"
                className="w-full h-[400px] md:h-[480px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
