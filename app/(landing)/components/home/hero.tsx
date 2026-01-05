import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
    return (
        <section id="hero-section" className="container mx-auto h-screen flex">
            <div className="relative self-center">
                <Image src="/images/img-basketball.png" alt="image sporton" width={432} height={423}
                    className="grayscale absolute left-16 -top-16" />
                <div className="relative ml-40 w-full">
                    <span className="bg-primary/10 rounded-full px-3 py-2 text-primary italic">Friday Sale. 50%</span>
                    <h1 className="font-extrabold text-[95px] italic bg-linear-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent">
                        WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
                    </h1>
                    <p className="w-2/5 mt-10 leading-loose">
                        Engineered for endurance and designed for speed. Experience gear that moves as fast as 
                        you do. Premium fabrics. Unmatched comfort. Limitless motion.
                    </p>
                    <div className="flex gap-5 mt-10">
                        <Button>
                            Explore More <FiFastForward/>
                        </Button>
                        <Button variant="ghost">
                            Watch Video
                            <Image src="/images/icon-play-video.svg" alt="icon play video" 
                                width={24} height={16}
                            />
                        </Button>
                    </div>
                </div>
                <Image className="absolute -right-5 top-2/5 -translate-y-1/2"
                    src="/images/img-hero.png" alt="image sporton hero" width={650} height={900} />
            </div>
            <Image src="/images/img-ornament-hero.svg" alt="image sporton" width={420} height={420}
                className="absolute -right-55 top-1/2 -translate-y-1/2" />
        </section>
    );
};

export default HeroSection;