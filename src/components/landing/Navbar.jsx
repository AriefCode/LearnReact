import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useActiveSection from "../../hooks/useActiveSection";

const navLinks = [
  { label: "Beranda", id: "hero" },
  { label: "Tentang", id: "about" },
  { label: "Produk", id: "products" },
  { label: "Ulasan", id: "testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-poppins text-3xl md:text-4xl text-teks transition-all duration-300"
          >
            Sedap<b className="text-hijau">.</b>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative font-medium transition-all duration-300 nav-link-hover ${
                    activeId === link.id
                      ? "nav-link-active text-hijau"
                      : "text-teks-samping hover:text-hijau"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-block px-5 py-2 border border-hijau text-hijau rounded-md font-medium transition-all duration-300 hover:bg-hijau hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/Register"
              className="px-5 py-2 bg-hijau text-white rounded-md font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>

        <ul className="md:hidden flex justify-center gap-4 pb-3 text-sm">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative transition-all duration-300 nav-link-hover ${
                  activeId === link.id
                    ? "nav-link-active text-hijau font-medium"
                    : "text-teks-samping"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
