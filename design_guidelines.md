# Design Guidelines: Anthony Ruiz Photography Website

## Design Approach
**Reference-Based Approach** - Drawing inspiration from Halkin Mason Photography's Education page aesthetic, adapted for a real estate photography portfolio site. This approach prioritizes visual impact, gallery-first presentation, and sophisticated minimalism that lets photography speak.

## Core Design Principles
1. **Photography-First**: Images dominate the layout with generous sizing and breathing room
2. **Sophisticated Minimalism**: Clean, uncluttered interface that enhances rather than competes with visual content
3. **Professional Restraint**: Subtle interactions and refined typography that convey high-end service quality
4. **Immediate Impact**: Every page opens with strong visual statement before detailed content

---

## Typography System

**Primary Font**: Montserrat (Google Fonts)
- Headings: 600 weight, uppercase for major headings
- Body: 400 weight, sentence case

**Secondary Font**: Lora (Google Fonts) 
- Used sparingly for elegant accent text, testimonials

**Type Scale**:
- Hero Headline: text-6xl (desktop), text-4xl (mobile) - 600 weight, tracking-tight
- Section Headers: text-4xl (desktop), text-3xl (mobile) - 600 weight, uppercase, tracking-wide
- Subsection Headers: text-2xl - 600 weight
- Body Large: text-lg - 400 weight, leading-relaxed
- Body Standard: text-base - 400 weight, leading-loose
- Captions/Labels: text-sm - 500 weight, uppercase, tracking-wider

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Micro spacing (within components): 4, 6
- Component internal padding: 8, 12
- Section padding: 16, 20, 24 (mobile to desktop)
- Major section gaps: 32

**Container Strategy**:
- Full-bleed hero sections: w-full
- Content sections: max-w-7xl mx-auto px-6
- Text-heavy content: max-w-4xl mx-auto
- Gallery grids: max-w-screen-2xl mx-auto

**Grid Systems**:
- Portfolio/Gallery grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Services showcase: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials/Stats: grid-cols-1 md:grid-cols-3
- Featured work: grid-cols-1 lg:grid-cols-2 (for larger, detailed showcases)

---

## Component Library

### Navigation
- Fixed header with transparent background over hero, solid on scroll
- Logo left-aligned, navigation items right-aligned
- Desktop: horizontal menu with ample letter-spacing
- Mobile: hamburger menu with full-screen overlay
- "BOOK NOW" CTA button prominently displayed in header (always visible)

### Hero Sections
**Home Page Hero**:
- Full-viewport height (100vh) background image
- Diagonal gradient overlay (subtle, maintains image visibility)
- Centered content: Main headline + subheadline + dual CTAs
- Buttons with backdrop-blur-md backgrounds for legibility

**Interior Page Heroes**:
- 60vh height with full-width imagery
- Page title overlaid, left-aligned with generous padding
- Breadcrumb navigation below title

### Gallery Components
**Masonry Grid Layout**:
- Staggered heights creating visual rhythm
- Hover effect: subtle scale (scale-105) + overlay with project details
- Click opens lightbox with full-resolution image + caption
- Lazy loading for performance

**Project Cards**:
- Full-width image thumbnail
- Thin border separating image from text
- Project title + brief description beneath
- "View Project" link appears on hover

### Service Blocks
**Icon-Free Approach** (photography speaks for itself):
- Service title (uppercase, bold)
- Representative image (3:2 aspect ratio)
- Concise description (2-3 sentences)
- Pricing indicator or "Request Quote" link
- Arranged in 3-column grid (desktop), stacked (mobile)

### Call-to-Action Sections
**Primary CTA Pattern**:
- Full-width section with background image (slightly darkened)
- Centered headline + supporting text
- Single prominent button (backdrop-blur-md background)
- Appears between major content sections

**Secondary CTA**:
- Smaller inline CTAs within content sections
- Text link with arrow or button variant

### FAQ Component
- Accordion-style expandable sections
- Question visible, answer hidden until clicked
- Clean divider lines between items
- Smooth height transition on expand/collapse

### Contact/Booking Section
- Two-column layout: Contact form left, business details right (desktop)
- Form fields: Name, Email, Phone, Project Type (dropdown), Message
- Booking calendar link prominently featured
- Business hours, response time expectations clearly stated

### Footer
- Three-column layout: About snippet, Quick Links, Contact Info
- Social media icons (if applicable)
- Copyright and credentials (Part 107 certification mention)
- Newsletter signup (optional)

---

## Page-Specific Layouts

### Home Page Structure
1. Full-viewport hero with "Images That Impact" headline
2. Services overview (3-column grid with imagery)
3. Featured work showcase (2-3 standout projects, large format)
4. Client testimonials (3-column cards)
5. Stats/Credentials bar (24-hour turnaround, Part 107 certified, etc.)
6. Final CTA section
7. Footer

### Services Page
1. Hero (60vh) with services overview headline
2. Detailed service breakdown (each service gets dedicated section with image + comprehensive description)
3. Process timeline/workflow visualization
4. Equipment/technology showcase
5. Pricing teaser with link to full pricing page
6. Booking CTA

### Gallery/Portfolio Pages
1. Category navigation (sticky tabs: Real Estate, Commercial, Drone, Video)
2. Masonry grid of work samples
3. Filtering options (property type, style, etc.)
4. Load more/infinite scroll functionality
5. Quick contact bar at bottom

### Pricing Page
1. Hero with pricing transparency message
2. Package comparison table (3-4 tiers)
3. Add-ons section (itemized additional services)
4. Custom quote CTA for complex projects
5. FAQs specific to pricing/packages

### About Page
1. Personal/business photo hero
2. Story/mission statement (single column, centered, generous line-height)
3. Credentials showcase (certifications, awards, experience)
4. Equipment/process transparency
5. Service area map (South Florida focus)
6. Team section (if applicable)

---

## Images

### Required Images & Placement

**Home Page**:
- Hero: Stunning modern real estate exterior with pool, golden hour lighting (full-viewport)
- Service 1: Interior shot of luxury living room
- Service 2: Aerial/drone perspective of waterfront property
- Service 3: Twilight exterior shot
- Featured Project 1: High-end commercial space
- Featured Project 2: Resort-style residential property

**Services Page**:
- Hero: Professional photographer in action on-site
- Real Estate section: Before/after comparison of property photography
- Drone section: Dramatic aerial coastal property shot
- Matterport section: 3D tour interface screenshot
- Twilight section: Dusk property photograph

**Gallery Pages**: 
- 20-30 high-quality portfolio images per category
- Mix of exteriors, interiors, aerials, detail shots
- Consistent post-processing aesthetic across portfolio

**About Page**:
- Personal headshot or on-location working photo
- Behind-the-scenes equipment/setup images

All images should be high-resolution, professionally edited, and demonstrate the quality clients can expect.

---

## Interactions & Micro-animations

Use animations extremely sparingly:
- Smooth scroll behavior for anchor links
- Fade-in on scroll for section content (subtle, one-time)
- Gallery hover effects (scale + overlay, 300ms ease)
- Mobile menu slide-in transition
- Form field focus states (border highlight)

**No** scroll-triggered parallax, carousel auto-advance, or loading spinners.

---

## Mobile Considerations

- All grids collapse to single column below 768px
- Hero headlines reduce by 2 size steps on mobile
- Navigation becomes hamburger menu
- Touch-friendly button sizing (min 44px height)
- Gallery images maintain aspect ratio, reduce per-row count
- Section padding reduces from 24 to 12 on mobile
- Footer stacks to single column

---

This design framework creates a visually commanding, gallery-centric website that positions Anthony Ruiz Photography as a premium real estate media service while maintaining exceptional usability and professional polish throughout.