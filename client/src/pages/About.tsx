import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Award, Clock, MapPin } from "lucide-react";

import heroImage from "@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png";
import interiorImage from "@assets/generated_images/Luxury_living_room_interior_f9f61881.png";

export default function About() {
  const credentials = [
    {
      icon: Camera,
      title: "Professional Equipment",
      description:
        "Full-frame cameras, professional lenses, advanced lighting, and FAA-certified drones",
    },
    {
      icon: Award,
      title: "Part 107 Certified",
      description:
        "FAA certified drone pilot for legal, safe, and professional aerial photography",
    },
    {
      icon: Clock,
      title: "24-Hour Turnaround",
      description:
        "Fast, reliable delivery without compromising on quality or attention to detail",
    },
    {
      icon: MapPin,
      title: "South Florida Expert",
      description:
        "Deep knowledge of local market demands and what makes properties stand out",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        backgroundImage={heroImage}
        headline="ABOUT ANTHONY RUIZ PHOTOGRAPHY"
        subheadline="Professional real estate photography serving South Florida since 2018"
        showCTAs={false}
        height="partial"
      />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-4xl font-semibold uppercase tracking-wide text-center mb-12" data-testid="text-mission-heading">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-loose text-center mb-16">
            At Anthony Ruiz Photography, we believe that exceptional real estate photography is
            more than just taking pictures—it's about telling a property's story and creating an
            emotional connection with potential buyers. Our mission is to provide South Florida
            real estate professionals with the highest quality visual media that helps properties
            sell faster and for top dollar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <img
              src={interiorImage}
              alt="Our Work"
              className="w-full rounded-md"
              data-testid="image-about-work"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold uppercase tracking-wide mb-6" data-testid="text-story-heading">
              Our Story
            </h2>
            <p className="text-base text-muted-foreground leading-loose mb-4">
              Founded in 2018, Anthony Ruiz Photography has become one of South Florida's most
              trusted names in real estate media. What started as a passion for photography and
              architecture has evolved into a full-service media company serving hundreds of real
              estate agents, brokers, and property owners throughout Miami-Dade, Broward, and Palm
              Beach counties.
            </p>
            <p className="text-base text-muted-foreground leading-loose">
              Our founder, Anthony Ruiz, combines technical expertise with an artistic eye to
              capture properties in their absolute best light. With years of experience in both
              residential and commercial real estate photography, we understand the unique
              challenges of the South Florida market and what it takes to make properties stand out
              in competitive listings.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold uppercase tracking-wide text-center mb-12" data-testid="text-credentials-heading">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {credentials.map((item, index) => (
            <Card key={index} data-testid={`card-credential-${index}`}>
              <CardContent className="p-8">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-loose">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold uppercase tracking-wide mb-6" data-testid="text-commitment-heading">
            Our Commitment
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground leading-loose">
              We're committed to providing exceptional service from booking through delivery. Every
              shoot is approached with professionalism, punctuality, and attention to detail. We
              use the latest equipment and techniques to ensure your properties are presented in
              the best possible light.
            </p>
            <p className="text-lg text-muted-foreground leading-loose">
              Our 24-hour turnaround guarantee means you can list properties quickly without
              waiting days for photos. We understand that time is money in real estate, and we're
              here to help you move fast while maintaining the highest quality standards.
            </p>
            <p className="text-lg text-primary font-medium">
              Let's work together to make your listings shine.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold uppercase tracking-wide mb-4">Service Area</h2>
          <p className="text-lg text-muted-foreground leading-loose mb-8">
            Proudly serving Miami-Dade, Broward, and Palm Beach counties including Miami, Fort
            Lauderdale, West Palm Beach, Boca Raton, Hollywood, Coral Gables, Aventura, and
            surrounding areas.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-4 py-2 bg-background rounded-md">Miami</span>
            <span className="px-4 py-2 bg-background rounded-md">Fort Lauderdale</span>
            <span className="px-4 py-2 bg-background rounded-md">West Palm Beach</span>
            <span className="px-4 py-2 bg-background rounded-md">Boca Raton</span>
            <span className="px-4 py-2 bg-background rounded-md">Coral Gables</span>
            <span className="px-4 py-2 bg-background rounded-md">Aventura</span>
            <span className="px-4 py-2 bg-background rounded-md">Hollywood</span>
            <span className="px-4 py-2 bg-background rounded-md">Delray Beach</span>
          </div>
        </div>
      </section>
    </div>
  );
}
