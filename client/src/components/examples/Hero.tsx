import Hero from '../Hero'
import heroImage1 from '@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png'
import heroImage2 from '@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png'
import heroImage3 from '@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png'

export default function HeroExample() {
  const heroImages = [heroImage1, heroImage2, heroImage3]
  
  return (
    <Hero
      backgroundImages={heroImages}
      headline="IMAGES THAT IMPACT"
      subheadline="Professional Real Estate Media | Interior & Exterior Photography | Aerial & Drone Video"
      showCTAs={true}
      height="full"
      autoSlide={true}
      slideInterval={5000}
    />
  )
}
