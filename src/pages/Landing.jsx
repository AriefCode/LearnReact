import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Products from "../components/landing/Products";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="bg-latar overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Testimonials />
      <Footer />
    </div>
  );
}
