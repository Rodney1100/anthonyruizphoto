import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import heroImage1 from "@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png";
import heroImage2 from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";
import heroImage3 from "@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png";
import heroImage4 from "@assets/generated_images/Waterfront_mansion_sunset_hero_e98aa446.png";
import heroImage5 from "@assets/generated_images/Beachfront_villa_aerial_hero_b3a9f476.png";
import interiorImage from "@assets/generated_images/Luxury_living_room_interior_f9f61881.png";
import droneImage from "@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png";
import twilightImage from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";
import commercialImage from "@assets/generated_images/Commercial_office_space_interior_1dd1161c.png";
import kitchenImage from "@assets/generated_images/Luxury_modern_kitchen_interior_ff1c026a.png";
import resortImage from "@assets/generated_images/Resort-style_residential_outdoor_area_61faf604.png";

export default function Home() {
  const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];
  const services = [
    {
      title: "Real Estate Photography",
      description:
        "Professional interior and exterior photography that showcases properties in their best light. High-dynamic-range imaging ensures every detail shines.",
      image: interiorImage,
      pricing: "STARTING AT $199",
    },
    {
      title: "Drone & Aerial Video",
      description:
        "FAA Part 107 certified drone pilot capturing stunning aerial perspectives. Perfect for showcasing property features, neighborhoods, and waterfront locations.",
      image: droneImage,
      pricing: "STARTING AT $299",
    },
    {
      title: "Twilight Photography",
      description:
        "Dramatic blue-hour shots that make properties stand out. Capture the magic of illuminated interiors against stunning evening skies.",
      image: twilightImage,
      pricing: "STARTING AT $249",
    },
  ];

  const features = [
    "24-hour turnaround on all projects",
    "Professional HDR & retouching",
    "High-resolution digital delivery",
    "FAA Part 107 certified drone pilot",
    "Matterport 3D virtual tours",
    "Commercial real estate expertise",
  ];

  return (
    <div className="min-h-screen">
      <Hero
        backgroundImages={heroImages}
        headline="IMAGES THAT IMPACT"
        subheadline="Professional Real Estate Media | Interior & Exterior Photography | Aerial & Drone Video"
        showCTAs={true}
        height="full"
        autoSlide={true}
        slideInterval={5000}
      />

      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-[0.15em] mb-6" data-testid="text-services-heading">
            Our Services
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ letterSpacing: "0.01em" }}>
            Comprehensive real estate media services designed to help your properties sell faster
            and for higher prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={commercialImage}
              alt="Featured Work"
              className="w-full rounded-sm shadow-md"
              data-testid="image-featured-work"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-[0.15em] mb-8" data-testid="text-why-choose-heading">
              Why Choose Us
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10" style={{ letterSpacing: "0.01em" }}>
              With years of experience in South Florida's competitive real estate market, we
              understand what it takes to make properties stand out. Our combination of professional
              equipment, technical expertise, and artistic vision delivers results that exceed
              expectations.
            </p>
            <div className="grid grid-cols-1 gap-5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4" data-testid={`feature-item-${index}`}>
                  <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground" style={{ letterSpacing: "0.01em" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[4/3] overflow-hidden rounded-sm group cursor-pointer">
            <img
              src={kitchenImage}
              alt="Interior Photography"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-testid="image-showcase-1"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-sm group cursor-pointer">
            <img
              src={resortImage}
              alt="Exterior Photography"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-testid="image-showcase-2"
            />
          </div>
        </div>
      </section>

      <section
        className="relative w-full py-40"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${twilightImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8" data-testid="text-cta-heading" style={{ letterSpacing: "-0.01em" }}>
            Ready to Elevate Your Listings?
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed mb-12 font-light" style={{ letterSpacing: "0.02em" }}>
            Book your shoot today and get professional photos delivered within 24 hours.
          </p>
          <a
            href="https://listings.anthonyruizphoto.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-cta-book"
          >
            <Button
              size="lg"
              className="backdrop-blur-xl bg-white text-foreground hover:bg-white/90 border-white/20 shadow-2xl tracking-[0.1em] text-xs font-semibold px-10 py-7"
            >
              BOOK NOW
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
