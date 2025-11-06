import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import heroImage from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";

export default function Pricing() {
  const packages = [
    {
      name: "Essential",
      price: "$199",
      description: "Perfect for smaller residential properties",
      features: [
        "Up to 2,000 sq ft",
        "20-25 professional photos",
        "HDR editing & color correction",
        "24-hour delivery",
        "Online gallery delivery",
        "Unlimited MLS usage",
      ],
    },
    {
      name: "Premium",
      price: "$299",
      description: "Most popular for standard listings",
      features: [
        "Up to 4,000 sq ft",
        "30-40 professional photos",
        "HDR editing & retouching",
        "Drone aerial photos (5-8)",
        "24-hour delivery",
        "Online gallery delivery",
        "Twilight exterior (1 shot)",
        "Unlimited MLS usage",
      ],
      popular: true,
    },
    {
      name: "Luxury",
      price: "$499",
      description: "Comprehensive package for high-end properties",
      features: [
        "Up to 6,000 sq ft",
        "50+ professional photos",
        "Advanced HDR & retouching",
        "Drone aerial photos (10-15)",
        "Drone video (30-60 sec)",
        "Twilight exteriors (3-5 shots)",
        "Same-day delivery available",
        "Matterport 3D tour",
        "Virtual staging (2 rooms)",
        "Unlimited MLS usage",
      ],
    },
  ];

  const addOns = [
    { service: "Additional Drone Photos", price: "$75" },
    { service: "Drone Video (60-90 sec)", price: "$150" },
    { service: "Matterport 3D Tour", price: "$249" },
    { service: "Additional Twilight Shots", price: "$100 each" },
    { service: "Virtual Staging per Room", price: "$50" },
    { service: "Rush Delivery (Same Day)", price: "$100" },
    { service: "Floor Plans", price: "$75" },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        backgroundImage={heroImage}
        headline="TRANSPARENT PRICING"
        subheadline="Professional photography packages designed for every property and budget"
        showCTAs={false}
        height="partial"
      />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold uppercase tracking-wide mb-4" data-testid="text-packages-heading">
            Photography Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the package that fits your needs. All packages include professional editing and
            24-hour delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={pkg.popular ? "border-primary border-2" : ""}
              data-testid={`card-package-${pkg.name.toLowerCase()}`}
            >
              {pkg.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-base font-semibold tracking-wider">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="text-center p-8">
                <h3 className="text-2xl font-semibold uppercase tracking-wide mb-2" data-testid={`text-package-name-${pkg.name.toLowerCase()}`}>
                  {pkg.name}
                </h3>
                <div className="text-4xl font-bold text-primary mb-2" data-testid={`text-package-price-${pkg.name.toLowerCase()}`}>{pkg.price}</div>
                <p className="text-base text-muted-foreground">{pkg.description}</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`feature-${pkg.name.toLowerCase()}-${index}`}>
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://listings.anthonyruizphoto.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block"
                  data-testid={`button-select-${pkg.name.toLowerCase()}`}
                >
                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    SELECT PACKAGE
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold uppercase tracking-wide text-center mb-12" data-testid="text-addons-heading">
            Add-On Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-card rounded-md border border-card-border"
                data-testid={`addon-${index}`}
              >
                <span className="text-base font-medium">{addon.service}</span>
                <span className="text-lg font-semibold text-primary">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Custom Quote Needed?</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            For properties over 6,000 sq ft, multi-unit complexes, or unique project requirements,
            contact us for a custom quote tailored to your specific needs.
          </p>
          <a href="/contact" data-testid="link-custom-quote">
            <Button variant="default" size="lg">
              REQUEST CUSTOM QUOTE
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
