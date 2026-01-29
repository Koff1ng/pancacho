import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LogoMarquee } from "./components/LogoMarquee";
import { FeaturedProduct } from "./components/FeaturedProduct";
import { ProductSection } from "./components/ProductSection";
import { InfiniteMarquee } from "./components/InfiniteMarquee";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <LogoMarquee />
      <FeaturedProduct />
      <ProductSection />
      <InfiniteMarquee />
      <Footer />
    </main>
  );
}
