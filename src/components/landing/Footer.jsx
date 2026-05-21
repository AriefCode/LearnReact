import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import SectionReveal from "./SectionReveal";

const services = ["Menu Harian", "Catering", "Reservasi", "Promo Spesial"];

const quickLinks = [
  { label: "Beranda", id: "hero" },
  { label: "Tentang", id: "about" },
  { label: "Produk", id: "products" },
  { label: "Ulasan", id: "testimonials" },
];

function scrollToSection(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <span className="font-poppins text-3xl">
                Sedap<b className="text-hijau">.</b>
              </span>
              <p className="mt-4 text-gray-400 leading-relaxed text-sm">
                Restoran Indonesia modern dengan cita rasa autentik dan
                pelayanan terbaik untuk keluarga Anda.
              </p>
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="p-3 rounded-full border border-white/20 transition-all duration-300 hover:bg-hijau hover:border-hijau"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full border border-white/20 transition-all duration-300 hover:bg-hijau hover:border-hijau"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full border border-white/20 transition-all duration-300 hover:bg-hijau hover:border-hijau"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <img
                  src="/logos/rosemary_light.svg"
                  alt="Rosemary"
                  className="h-7 opacity-80"
                />
                <img
                  src="/logos/rosemary_dark.svg"
                  alt="Rosemary"
                  className="h-7 opacity-80 invert"
                />
              </div>
            </div>

            <div>
              <h3 className="font-poppins text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {services.map((item) => (
                  <li
                    key={item}
                    className="transition-all duration-300 hover:text-hijau cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-poppins text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="transition-all duration-300 hover:text-hijau"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-poppins text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Jl. Kuliner No. 88, Jakarta Selatan</li>
                <li>
                  <a
                    href="mailto:info@sedaprestaurant.com"
                    className="transition-all duration-300 hover:text-hijau"
                  >
                    info@sedaprestaurant.com
                  </a>
                </li>
                <li>+62 812-3456-7890</li>
              </ul>
            </div>
          </div>
        </SectionReveal>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="text-center text-gray-400 text-sm">
          &copy; 2025 Sedap Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
