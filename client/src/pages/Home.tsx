import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import heroImage from "@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png";
import interiorImage from "@assets/generated_images/Luxury_living_room_interior_f9f61881.png";
import droneImage from "@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png";
import twilightImage from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";
import commercialImage from "@assets/generated_images/Commercial_office_space_interior_1dd1161c.png";
import kitchenImage from "@assets/generated_images/Luxury_modern_kitchen_interior_ff1c026a.png";
import resortImage from "@assets/generated_images/Resort-style_residential_outdoor_area_61faf604.png";

export default function Home() {
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
        backgroundImage={heroImage}
        headline="IMAGES THAT IMPACT"
        subheadline="Professional Real Estate Media | Interior & Exterior Photography | Aerial & Drone Video"
        showCTAs={true}
        height="full"
      />

      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold uppercase tracking-wide mb-4" data-testid="text-services-heading">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive real estate media services designed to help your properties sell faster
            and for higher prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={commercialImage}
              alt="Featured Work"
              className="w-full rounded-md"
              data-testid="image-featured-work"
            />
          </div>
          <div>
            <h2 className="text-4xl font-semibold uppercase tracking-wide mb-6" data-testid="text-why-choose-heading">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground leading-loose mb-8">
              With years of experience in South Florida's competitive real estate market, we
              understand what it takes to make properties stand out. Our combination of professional
              equipment, technical expertise, and artistic vision delivers results that exceed
              expectations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3" data-testid={`feature-item-${index}`}>
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-base text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={kitchenImage}
              alt="Interior Photography"
              className="w-full h-full object-cover"
              data-testid="image-showcase-1"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={resortImage}
              alt="Exterior Photography"
              className="w-full h-full object-cover"
              data-testid="image-showcase-2"
            />
          </div>
        </div>
      </section>

      <section
        className="relative w-full py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${twilightImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6" data-testid="text-cta-heading">
            Ready to Elevate Your Listings?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            Book your shoot today and get professional photos delivered within 24 hours.
          </p>
          <a
            href="https://listings.anthonyruizphoto.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-cta-book"
          >
            <Button
              variant="default"
              size="lg"
              className="backdrop-blur-md bg-primary/90 hover:bg-primary border-primary-border"
            >
              BOOK NOW
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
