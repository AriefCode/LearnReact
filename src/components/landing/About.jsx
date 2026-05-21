import useInView from "../../hooks/useInView";
import SectionReveal from "./SectionReveal";

const stats = [
  { value: "50+", label: "Menu & Hidangan" },
  { value: "10+", label: "Cabang Restoran" },
  { value: "1000+", label: "Pelanggan Puas" },
  { value: "4.9", label: "Rating Rata-rata" },
];

export default function About() {
  const { ref: imageRef, isVisible: imageVisible } = useInView();
  const { ref: textRef, isVisible: textVisible } = useInView();

  return (
    <section id="about" className="bg-latar py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={imageRef}
              className={`reveal-fade-up ${imageVisible ? "is-visible" : ""}`}
            >
              <img
                src="/img/chef.png"
                alt="Chef Sedap"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl -rotate-2 transition-all duration-300 hover:rotate-0"
              />
            </div>

            <div
              ref={textRef}
              className={`reveal-fade-up ${textVisible ? "is-visible" : ""}`}
            >
              <p className="text-hijau font-medium uppercase tracking-widest text-sm mb-3">
                Tentang Kami
              </p>
              <h2 className="font-poppins text-3xl md:text-4xl text-teks leading-tight">
                Jelajahi Cita Rasa Indonesia Bersama Sedap
              </h2>
              <p className="mt-6 text-teks-samping leading-relaxed">
                Sedap hadir sebagai destinasi kuliner modern yang menghadirkan
                masakan Indonesia berkualitas dengan sentuhan presentasi
                kontemporer. Setiap hidangan disiapkan dari bahan segar pilihan
                oleh chef berpengalaman.
              </p>
              <p className="mt-4 text-teks-samping leading-relaxed">
                Dari warung kekinian hingga restoran keluarga, kami berkomitmen
                memberikan pengalaman makan yang hangat, lezat, dan tak
                terlupakan di setiap kunjungan Anda.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-5 text-center border border-garis transition-all duration-300 hover:shadow-md"
                  >
                    <span className="block font-poppins-extrabold text-3xl text-hijau">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-teks-samping text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
