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
    <div className={`relative w-full ${height === "full" ? "h-screen" : "h-[60vh]"} flex items-center justify-center overflow-hidden bg-black`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'opacity',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: index === currentImageIndex ? 'scale(1)' : 'scale(1.05)',
              transition: 'transform 8000ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}
          />
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4))',
            }}
          />
        </div>
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
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://listings.anthonyruizphoto.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-book"
              aria-label="Book a photography shoot - Opens in new window"
            >
              <Button
                variant="default"
                size="lg"
                className="backdrop-blur-xl bg-white text-black hover:bg-white/95 border-2 border-white shadow-2xl tracking-[0.08em] text-base font-bold px-12 py-4 focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4"
              >
                BOOK A SHOOT
              </Button>
            </a>
            <a href="#services" data-testid="link-hero-services" aria-label="View our photography services">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-xl bg-white/10 border-2 border-white text-white hover:bg-white/20 hover:border-white shadow-xl tracking-[0.08em] text-base font-bold px-12 py-4 focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 transition-all duration-300"
              >
                VIEW SERVICES
              </Button>
            </a>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20" role="group" aria-label="Image slider navigation">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
                index === currentImageIndex
                  ? "bg-white w-12"
                  : "bg-white/50 hover:bg-white/70 w-12"
              }`}
              data-testid={`slider-dot-${index}`}
              aria-label={`Go to slide ${index + 1} of ${images.length}`}
              aria-current={index === currentImageIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
