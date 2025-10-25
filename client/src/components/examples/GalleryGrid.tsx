import GalleryGrid from '../GalleryGrid'
import image1 from '@assets/generated_images/Luxury_living_room_interior_f9f61881.png'
import image2 from '@assets/generated_images/Luxury_modern_kitchen_interior_ff1c026a.png'
import image3 from '@assets/generated_images/Master_bedroom_with_ocean_972586b1.png'
import image4 from '@assets/generated_images/Commercial_office_space_interior_1dd1161c.png'
import image5 from '@assets/generated_images/Aerial_waterfront_property_drone_c94182fa.png'
import image6 from '@assets/generated_images/Twilight_exterior_photography_showcase_d1f7338e.png'

const mockImages = [
  { id: '1', src: image1, alt: 'Luxury Living Room', category: 'residential' },
  { id: '2', src: image2, alt: 'Modern Kitchen', category: 'residential' },
  { id: '3', src: image3, alt: 'Master Bedroom', category: 'residential' },
  { id: '4', src: image4, alt: 'Commercial Office', category: 'commercial' },
  { id: '5', src: image5, alt: 'Aerial Property View', category: 'drone' },
  { id: '6', src: image6, alt: 'Twilight Exterior', category: 'twilight' },
]

export default function GalleryGridExample() {
  return (
    <div className="max-w-screen-2xl mx-auto p-6">
      <GalleryGrid images={mockImages} columns={3} />
    </div>
  )
}
