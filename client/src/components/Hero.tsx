import { Button } from "@/components/ui/button";

interface HeroProps {
  backgroundImage: string;
  headline: string;
  subheadline?: string;
  showCTAs?: boolean;
  height?: "full" | "partial";
}

export default function Hero({
  backgroundImage,
  headline,
  subheadline,
  showCTAs = true,
  height = "full",
}: HeroProps) {
  return (
    <div
      className={`relative w-full ${height === "full" ? "h-screen" : "h-[60vh]"} flex items-center justify-center`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
    </div>
  );
}
