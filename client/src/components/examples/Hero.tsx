import Hero from '../Hero'
import heroImage from '@assets/generated_images/Luxury_pool_home_hero_2147bcbc.png'

export default function HeroExample() {
  return (
    <Hero
      backgroundImage={heroImage}
      headline="IMAGES THAT IMPACT"
      subheadline="Professional Real Estate Media | Interior & Exterior Photography | Aerial & Drone Video"
      showCTAs={true}
      height="full"
    />
  )
}
