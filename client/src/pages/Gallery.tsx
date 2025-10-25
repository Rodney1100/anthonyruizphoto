import { useState } from "react";
import Hero from "@/components/Hero";
import GalleryGrid from "@/components/GalleryGrid";
import { Button } from "@/components/ui/button";

import heroImage from "@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png";
import image1 from "@assets/generated_images/Luxury_living_room_interior_f9f61881.png";
import image2 from "@assets/generated_images/Luxury_modern_kitchen_interior_ff1c026a.png";
import image3 from "@assets/generated_images/Master_bedroom_with_ocean_972586b1.png";
import image4 from "@assets/generated_images/Commercial_office_space_interior_1dd1161c.png";
import image5 from "@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png";
import image6 from "@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png";
import image7 from "@assets/generated_images/Resort-style_residential_outdoor_area_61faf604.png";
import image8 from "@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "ALL" },
    { id: "residential", label: "RESIDENTIAL" },
    { id: "commercial", label: "COMMERCIAL" },
    { id: "drone", label: "DRONE" },
    { id: "twilight", label: "TWILIGHT" },
  ];

  const allImages = [
    { id: "1", src: image1, alt: "Luxury Living Room", category: "residential" },
    { id: "2", src: image2, alt: "Modern Kitchen", category: "residential" },
    { id: "3", src: image3, alt: "Master Bedroom", category: "residential" },
    { id: "4", src: image4, alt: "Commercial Office Space", category: "commercial" },
    { id: "5", src: image5, alt: "Aerial Waterfront Property", category: "drone" },
    { id: "6", src: image6, alt: "Twilight Exterior", category: "twilight" },
    { id: "7", src: image7, alt: "Resort Style Outdoor", category: "residential" },
    { id: "8", src: image8, alt: "Luxury Pool Home", category: "residential" },
    { id: "9", src: image1, alt: "Interior Detail", category: "residential" },
    { id: "10", src: image4, alt: "Office Interior", category: "commercial" },
    { id: "11", src: image5, alt: "Aerial Coastal View", category: "drone" },
    { id: "12", src: image6, alt: "Evening Exterior", category: "twilight" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Hero
        backgroundImage={heroImage}
        headline="OUR PORTFOLIO"
        subheadline="Explore our collection of professional real estate photography"
        showCTAs={false}
        height="partial"
      />

      <section className="max-w-screen-2xl mx-auto px-6 py-24">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="tracking-wider"
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <GalleryGrid images={filteredImages} columns={3} />
      </section>
    </div>
  );
}
