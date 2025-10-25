import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";

import heroImage from "@assets/generated_images/Commercial_office_space_interior_1dd1161c.png";
import interiorImage from "@assets/generated_images/Luxury_living_room_interior_f9f61881.png";
import commercialImage from "@assets/generated_images/Commercial_office_space_interior_1dd1161c.png";
import droneImage from "@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png";
import kitchenImage from "@assets/generated_images/Luxury_modern_kitchen_interior_ff1c026a.png";
import twilightImage from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";
import bedroomImage from "@assets/generated_images/Master_bedroom_with_ocean_972586b1.png";

export default function Services() {
  const allServices = [
    {
      title: "Real Estate Photography",
      description:
        "Professional interior and exterior photography using advanced HDR techniques. We capture every room, highlight architectural details, and ensure proper lighting to showcase your property's full potential.",
      image: interiorImage,
      pricing: "STARTING AT $199",
    },
    {
      title: "Commercial Real Estate",
      description:
        "Specialized photography for office buildings, retail spaces, restaurants, and commercial properties. We understand the unique requirements of commercial listings and deliver images that attract serious buyers.",
      image: commercialImage,
      pricing: "STARTING AT $349",
    },
    {
      title: "Drone & Aerial Photography",
      description:
        "FAA Part 107 certified aerial photography and 4K video. Perfect for showcasing property location, neighborhood amenities, waterfront views, and large estates from unique perspectives.",
      image: droneImage,
      pricing: "STARTING AT $299",
    },
    {
      title: "3D/Matterport Tours",
      description:
        "Immersive 3D virtual tours that allow potential buyers to explore properties remotely. Industry-leading Matterport technology creates engaging, interactive experiences that drive more qualified leads.",
      image: kitchenImage,
      pricing: "STARTING AT $249",
    },
    {
      title: "Twilight Photography",
      description:
        "Stunning blue-hour photography that captures properties with dramatic evening lighting. Interior and exterior lights create warm, inviting images that make listings stand out on MLS and social media.",
      image: twilightImage,
      pricing: "STARTING AT $249",
    },
    {
      title: "Retouching & Editing",
      description:
        "Professional post-processing including HDR blending, color correction, virtual staging options, and sky replacements. Every image is carefully edited to ensure magazine-quality results.",
      image: bedroomImage,
      pricing: "INCLUDED WITH ALL PACKAGES",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        backgroundImage={heroImage}
        headline="COMPREHENSIVE MEDIA SERVICES"
        subheadline="From photography to video to 3D tours - everything you need to market properties effectively"
        showCTAs={false}
        height="partial"
      />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold uppercase tracking-wide mb-4" data-testid="text-page-heading">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional real estate media services tailored to South Florida's market. Fast
            turnaround, competitive pricing, and exceptional quality guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold uppercase tracking-wide mb-6" data-testid="text-process-heading">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Your Shoot</h3>
              <p className="text-muted-foreground leading-loose">
                Schedule online or contact us directly. We offer flexible scheduling 7 days a week.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Shoot</h3>
              <p className="text-muted-foreground leading-loose">
                We arrive on time with professional equipment and complete the shoot efficiently.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">24-Hour Delivery</h3>
              <p className="text-muted-foreground leading-loose">
                Receive fully edited, high-resolution images via secure online gallery within 24
                hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
