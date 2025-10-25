import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  backgroundImage?: string;
  backgroundImages?: string[];
  headline: string;
  subheadline?: string;
  showCTAs?: boolean;
  height?: "full" | "partial";
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function Hero({
  backgroundImage,
  backgroundImages,
  headline,
  subheadline,
  showCTAs = true,
  height = "full",
  autoSlide = false,
  slideInterval = 5000,
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);

  useEffect(() => {
    if (autoSlide && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, slideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, images.length, slideInterval]);

  return (
    <div className={`relative w-full ${height === "full" ? "h-screen" : "h-[60vh]"} flex items-center justify-center overflow-hidden`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-out ${
            index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center z-10">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-8 leading-[1.1]"
          data-testid="text-hero-headline"
          style={{ letterSpacing: "-0.02em" }}
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            className="text-base md:text-lg text-white/85 leading-relaxed mb-10 max-w-2xl mx-auto font-light"
            data-testid="text-hero-subheadline"
            style={{ letterSpacing: "0.02em" }}
          >
            {subheadline}
          </p>
        )}
        {showCTAs && (
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="https://listings.anthonyruizphoto.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-book"
            >
              <Button
                variant="default"
                size="lg"
                className="backdrop-blur-xl bg-white text-foreground hover:bg-white/90 border-white/20 shadow-xl tracking-[0.1em] text-xs font-semibold px-8 py-6"
              >
                BOOK A SHOOT
              </Button>
            </a>
            <a href="#services" data-testid="link-hero-services">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-xl bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 shadow-lg tracking-[0.1em] text-xs font-semibold px-8 py-6 transition-all duration-300"
              >
                VIEW SERVICES
              </Button>
            </a>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentImageIndex
                  ? "bg-white w-10"
                  : "bg-white/40 hover:bg-white/60 w-10"
              }`}
              data-testid={`slider-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
