import ServiceCard from '../ServiceCard'
import interiorImage from '@assets/generated_images/Luxury_living_room_interior_f9f61881.png'

export default function ServiceCardExample() {
  return (
    <div className="max-w-md">
      <ServiceCard
        title="Real Estate Photography"
        description="Professional interior and exterior photography that showcases properties in their best light. High-dynamic-range imaging ensures every detail shines."
        image={interiorImage}
        pricing="STARTING AT $199"
      />
    </div>
  )
}
