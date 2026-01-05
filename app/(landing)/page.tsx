import Image from "next/image";
import Button from "./components/ui/button";

export default function Home() {
  return (
    <main className="bg-primary-light">
      <h1 className="font-extrabold">Halo apakah ini poppins</h1>
      <Button variant="dark">
        Klik saya
      </Button>
    </main>
  );
}
