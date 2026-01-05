import Image from "next/image";
import Button from "./components/ui/button";
import HeroSection from "./components/home/hero";
import CategoriesSection from "./components/home/categories";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
    </main>
  );
}
