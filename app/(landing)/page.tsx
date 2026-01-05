import Image from "next/image";
import Button from "./components/ui/button";
import HeroSection from "./components/home/hero";
import CategoriesSection from "./components/home/categories";
import ProductsSection from "./components/home/products";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
    </main>
  );
}
