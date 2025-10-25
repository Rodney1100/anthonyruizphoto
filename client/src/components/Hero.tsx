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
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      
      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <h1
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6"
          data-testid="text-hero-headline"
        >
          {headline}
        </h1>
        {subheadline && (
          <p
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto"
            data-testid="text-hero-subheadline"
          >
            {subheadline}
          </p>
        )}
        {showCTAs && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://listings.anthonyruizphoto.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-book"
            >
              <Button
                variant="default"
                size="lg"
                className="backdrop-blur-md bg-primary/90 hover:bg-primary border-primary-border"
              >
                BOOK A SHOOT
              </Button>
            </a>
            <a href="#services" data-testid="link-hero-services">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-md bg-background/20 border-white/30 text-white hover:bg-background/30"
              >
                VIEW SERVICES
              </Button>
            </a>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              data-testid={`slider-dot-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
