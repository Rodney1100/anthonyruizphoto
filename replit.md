# Anthony Ruiz Photography CMS

## Project Overview
A luxury photography portfolio website with a comprehensive Content Management System (CMS) for Anthony Ruiz Photography, a South Florida real estate photographer.

## Project Status
**CMS Backend Completed:**
- Database schema with PostgreSQL
- Role-based authentication (Admin, Editor, Viewer)
- Complete API endpoints for all CMS entities
- Media upload system with multer
- Replit Auth integration
- Stripe payment integration (configured)

**CMS Admin Panel Completed:**
- Admin dashboard with sidebar navigation
- Protected admin routes with role-based access
- Dashboard overview page with statistics
- Complete CRUD interfaces for all 7 entities:
  - Gallery Management (with MediaPicker)
  - Services Management (with MediaPicker for icons)
  - Pricing Management
  - Blog Management (with MediaPicker for cover images)
  - FAQs Management
  - Testimonials Management (with MediaPicker for avatars)
  - Contact Inquiries Management
- Reusable MediaPicker component for image selection
- Toast notifications for all operations
- Form validation with Zod schemas
- End-to-end tested and verified working

## Technology Stack

### Backend
- Node.js + Express
- TypeScript
- **PostgreSQL (Railway)** - Migrated from Replit to Railway
- Drizzle ORM with `pg` driver
- Replit Auth (OpenID Connect)
- Multer (file uploads)
- Stripe (payment processing)
- Passport.js (authentication)

### Frontend
- React
- TypeScript
- Wouter (routing)
- TanStack Query (data fetching)
- Shadcn/UI + Tailwind CSS
- Radix UI components

## Database Schema

### Core Tables
- **users**: Authentication and role management (admin, editor, viewer)
- **sessions**: Session storage for auth
- **media**: Image/file uploads with metadata
- **gallery_items**: Photo gallery management
- **services**: Photography services offered
- **pricing_packages**: Pricing tiers with features
- **package_features**: Individual features per package
- **faqs**: Frequently asked questions
- **blog_posts**: Blog content management
- **testimonials**: Client testimonials
- **contact_submissions**: Contact form inquiries

## API Endpoints

### Authentication
- `GET /api/login` - Initiate login flow
- `GET /api/callback` - OAuth callback
- `GET /api/logout` - Logout user
- `GET /api/auth/user` - Get current user (protected)

### Media (Admin/Editor)
- `POST /api/media` - Upload media
- `GET /api/media` - List all media
- `GET /api/media/:id` - Get single media
- `DELETE /api/media/:id` - Delete media (admin only)

### Gallery
- `GET /api/gallery` - Public published items
- `GET /api/admin/gallery` - All items (admin/editor)
- `POST /api/admin/gallery` - Create item (admin/editor)
- `PATCH /api/admin/gallery/:id` - Update item (admin/editor)
- `DELETE /api/admin/gallery/:id` - Delete item (admin only)

### Services
- `GET /api/services` - Public active services
- `GET /api/admin/services` - All services (admin/editor)
- `POST /api/admin/services` - Create service (admin/editor)
- `PATCH /api/admin/services/:id` - Update service (admin/editor)
- `DELETE /api/admin/services/:id` - Delete service (admin only)

### Pricing
- `GET /api/pricing` - Public active packages with features
- `GET /api/admin/pricing` - All packages (admin/editor)
- `POST /api/admin/pricing` - Create package (admin/editor)
- `PATCH /api/admin/pricing/:id` - Update package (admin/editor)
- `DELETE /api/admin/pricing/:id` - Delete package (admin only)
- `POST /api/admin/pricing/:id/features` - Add feature (admin/editor)
- `DELETE /api/admin/pricing/features/:id` - Delete feature (admin only)

### FAQs
- `GET /api/faqs` - Public published FAQs
- `GET /api/admin/faqs` - All FAQs (admin/editor)
- `POST /api/admin/faqs` - Create FAQ (admin/editor)
- `PATCH /api/admin/faqs/:id` - Update FAQ (admin/editor)
- `DELETE /api/admin/faqs/:id` - Delete FAQ (admin only)

### Blog
- `GET /api/blog` - Public published posts
- `GET /api/blog/:slug` - Get post by slug
- `GET /api/admin/blog` - All posts (admin/editor)
- `POST /api/admin/blog` - Create post (admin/editor)
- `PATCH /api/admin/blog/:id` - Update post (admin/editor)
- `DELETE /api/admin/blog/:id` - Delete post (admin only)

### Testimonials
- `GET /api/testimonials` - Public published testimonials
- `GET /api/admin/testimonials` - All testimonials (admin/editor)
- `POST /api/admin/testimonials` - Create testimonial (admin/editor)
- `PATCH /api/admin/testimonials/:id` - Update testimonial (admin/editor)
- `DELETE /api/admin/testimonials/:id` - Delete testimonial (admin only)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/admin/contact` - All submissions (admin/editor)
- `PATCH /api/admin/contact/:id` - Update submission (admin/editor)
- `DELETE /api/admin/contact/:id` - Delete submission (admin only)

## User Roles

### Admin
- Full access to all CMS features
- Can create, edit, and delete all content
- Can manage user roles
- Can access all admin endpoints

### Editor
- Can create and edit most content
- Cannot delete content (except own blog posts)
- Cannot manage user roles
- Limited to non-destructive operations

### Viewer
- Read-only access
- Cannot access admin panel
- Can only view public content

## Design Guidelines

### Color Palette (Luxury Theme)
- **Charcoal Black**: #121212 (primary)
- **Champagne Gold**: #C8A951 (accents, highlights, buttons)
- **Ivory White**: #F9F7F4 (backgrounds)
- **Warm Taupe**: #B7A99A (secondary)
- **Deep Emerald**: #1A3C34 (tertiary)

### Design Principles
- Gold used sparingly for highlights and CTAs
- Clean, minimal, high-end aesthetic
- Full accessibility (ARIA labels, keyboard navigation, screen readers)
- High contrast focus states (4px rings)
- Minimum button height: 44px for accessibility
- Responsive design for all screen sizes

### Typography
- Headings: Montserrat (uppercase, tight tracking)
- Body: Lora (serif accent)
- Increased font sizes for readability

## File Structure

```
server/
  ├── db.ts                 # Database connection
  ├── storage.ts            # Data access layer
  ├── routes.ts             # API routes
  ├── replitAuth.ts         # Authentication setup
  ├── middleware/
  │   └── upload.ts         # Multer configuration
  └── uploads/              # Uploaded files

client/src/
  ├── pages/
  │   ├── admin/
  │   │   └── Dashboard.tsx # Admin dashboard
  │   ├── Home.tsx
  │   ├── Services.tsx
  │   ├── Gallery.tsx
  │   ├── Pricing.tsx
  │   ├── FAQ.tsx
  │   ├── About.tsx
  │   └── Contact.tsx
  ├── components/
  │   ├── admin/
  │   │   └── AdminLayout.tsx  # Admin sidebar layout
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   ├── Hero.tsx
  │   └── ui/              # Shadcn components
  ├── hooks/
  │   └── useAuth.ts       # Auth hook
  └── lib/
      ├── authUtils.ts     # Auth utilities
      └── queryClient.ts   # TanStack Query setup

shared/
  └── schema.ts            # Drizzle schema + Zod validation
```

## Development Workflow

### Database Changes
```bash
# After modifying shared/schema.ts, push to Railway database:
DATABASE_URL="${DATABASE_PUBLIC_URL}" npm run db:push

# Or if needed:
DATABASE_URL="${DATABASE_PUBLIC_URL}" npm run db:push --force
```

**Note:** We override DATABASE_URL with DATABASE_PUBLIC_URL because drizzle.config.ts reads DATABASE_URL, but in development we need to use the public Railway connection.

### Running the App
```bash
npm run dev
# Starts both backend (Express) and frontend (Vite) on port 5000
```

## Next Steps
1. Complete CRUD interfaces for all entities
2. Add rich text editor for blog posts
3. Integrate Stripe checkout flow
4. Implement dashboard analytics
5. Add rate limiting and security features
6. End-to-end testing
7. Production deployment

## Environment Variables
- `DATABASE_PUBLIC_URL` - Railway PostgreSQL public connection (development/testing)
- `DATABASE_URL` - Railway PostgreSQL private connection (production deployment)
- `SESSION_SECRET` - Session encryption key
- `REPL_ID` - Replit application ID
- `ISSUER_URL` - OIDC issuer URL (defaults to Replit)
- `STRIPE_SECRET_KEY` - Stripe secret key (not yet set)
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key (not yet set)

## Notes
- Media files stored in `server/uploads/` (local development)
- Production should use cloud storage (S3/Cloudflare R2)
- All API routes prefixed with `/api`
- Admin routes prefixed with `/api/admin`
- Public routes have no auth requirements
- Protected routes require authentication
- Admin-only routes require admin role
