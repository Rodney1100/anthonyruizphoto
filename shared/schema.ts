import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  index,
  jsonb,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum("user_role", ["admin", "editor", "viewer"]);
export const blogStatusEnum = pgEnum("blog_status", ["draft", "published", "archived"]);
export const contactStatusEnum = pgEnum("contact_status", ["new", "in_progress", "responded", "closed"]);
export const storageProviderEnum = pgEnum("storage_provider", ["local", "s3", "cloudflare"]);

// ============================================
// AUTH TABLES (Required for Replit Auth)
// ============================================

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table (enhanced for CMS with roles)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default("viewer"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const upsertUserSchema = createInsertSchema(users);
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

// ============================================
// MEDIA MANAGEMENT
// ============================================

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalFilename: varchar("original_filename", { length: 255 }).notNull(),
  storageProvider: storageProviderEnum("storage_provider").notNull().default("local"),
  url: text("url").notNull(),
  altText: varchar("alt_text", { length: 500 }),
  width: integer("width"),
  height: integer("height"),
  sizeBytes: integer("size_bytes"),
  mimeType: varchar("mime_type", { length: 100 }),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});
export const selectMediaSchema = createSelectSchema(media);
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;

// ============================================
// GALLERY
// ============================================

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  featured: boolean("featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  mediaId: integer("media_id").references(() => media.id),
  isPublished: boolean("is_published").notNull().default(true),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryItemsRelations = relations(galleryItems, ({ one }) => ({
  media: one(media, {
    fields: [galleryItems.mediaId],
    references: [media.id],
  }),
}));

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectGalleryItemSchema = createSelectSchema(galleryItems);
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;

// ============================================
// SERVICES
// ============================================

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  shortDescription: varchar("short_description", { length: 500 }),
  fullDescription: text("full_description"),
  basePriceCents: integer("base_price_cents"),
  imageId: integer("image_id").references(() => media.id),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const servicesRelations = relations(services, ({ one }) => ({
  image: one(media, {
    fields: [services.imageId],
    references: [media.id],
  }),
}));

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectServiceSchema = createSelectSchema(services);
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// ============================================
// PRICING PACKAGES
// ============================================

export const pricingPackages = pgTable("pricing_packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 500 }),
  priceCents: integer("price_cents").notNull(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeProductId: varchar("stripe_product_id", { length: 255 }),
  isPopular: boolean("is_popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPricingPackageSchema = createInsertSchema(pricingPackages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectPricingPackageSchema = createSelectSchema(pricingPackages);
export type InsertPricingPackage = z.infer<typeof insertPricingPackageSchema>;
export type PricingPackage = typeof pricingPackages.$inferSelect;

// ============================================
// PACKAGE FEATURES
// ============================================

export const packageFeatures = pgTable("package_features", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").notNull().references(() => pricingPackages.id, { onDelete: "cascade" }),
  featureText: varchar("feature_text", { length: 500 }).notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

export const packageFeaturesRelations = relations(packageFeatures, ({ one }) => ({
  package: one(pricingPackages, {
    fields: [packageFeatures.packageId],
    references: [pricingPackages.id],
  }),
}));

export const pricingPackagesRelations = relations(pricingPackages, ({ many }) => ({
  features: many(packageFeatures),
}));

export const insertPackageFeatureSchema = createInsertSchema(packageFeatures).omit({
  id: true,
});
export const selectPackageFeatureSchema = createSelectSchema(packageFeatures);
export type InsertPackageFeature = z.infer<typeof insertPackageFeatureSchema>;
export type PackageFeature = typeof packageFeatures.$inferSelect;

// ============================================
// FAQs
// ============================================

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectFaqSchema = createSelectSchema(faqs);
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;

// ============================================
// BLOG POSTS
// ============================================

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: varchar("excerpt", { length: 500 }),
  content: text("content").notNull(),
  coverImageId: integer("cover_image_id").references(() => media.id),
  status: blogStatusEnum("status").notNull().default("draft"),
  authorId: varchar("author_id").references(() => users.id),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  coverImage: one(media, {
    fields: [blogPosts.coverImageId],
    references: [media.id],
  }),
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectBlogPostSchema = createSelectSchema(blogPosts);
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// ============================================
// TESTIMONIALS
// ============================================

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  company: varchar("company", { length: 255 }),
  quote: text("quote").notNull(),
  rating: integer("rating"),
  location: varchar("location", { length: 255 }),
  avatarId: integer("avatar_id").references(() => media.id),
  displayOrder: integer("display_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  avatar: one(media, {
    fields: [testimonials.avatarId],
    references: [media.id],
  }),
}));

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectTestimonialSchema = createSelectSchema(testimonials);
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// ============================================
// CONTACT SUBMISSIONS
// ============================================

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  serviceInterest: varchar("service_interest", { length: 255 }),
  message: text("message").notNull(),
  status: contactStatusEnum("status").notNull().default("new"),
  internalNotes: text("internal_notes"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});
export const selectContactSubmissionSchema = createSelectSchema(contactSubmissions);
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
