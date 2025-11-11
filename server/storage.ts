import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import {
  users,
  type User,
  type UpsertUser,
  media,
  type Media,
  type InsertMedia,
  galleryItems,
  type GalleryItem,
  type InsertGalleryItem,
  services,
  type Service,
  type InsertService,
  pricingPackages,
  type PricingPackage,
  type InsertPricingPackage,
  packageFeatures,
  type PackageFeature,
  type InsertPackageFeature,
  faqs,
  type Faq,
  type InsertFaq,
  blogPosts,
  type BlogPost,
  type InsertBlogPost,
  testimonials,
  type Testimonial,
  type InsertTestimonial,
  contactSubmissions,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";

// ============================================
// STORAGE INTERFACE
// ============================================

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserRole(id: string, role: "admin" | "editor" | "viewer"): Promise<User | undefined>;

  // Media operations
  createMedia(media: InsertMedia): Promise<Media>;
  getMedia(id: number): Promise<Media | undefined>;
  getAllMedia(): Promise<Media[]>;
  deleteMedia(id: number): Promise<void>;

  // Gallery operations
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getPublishedGalleryItems(): Promise<GalleryItem[]>;
  updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: number): Promise<void>;

  // Service operations
  createService(service: InsertService): Promise<Service>;
  getService(id: number): Promise<Service | undefined>;
  getAllServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<void>;

  // Pricing Package operations
  createPricingPackage(pkg: InsertPricingPackage): Promise<PricingPackage>;
  getPricingPackage(id: number): Promise<PricingPackage | undefined>;
  getAllPricingPackages(): Promise<PricingPackage[]>;
  getActivePricingPackages(): Promise<PricingPackage[]>;
  updatePricingPackage(id: number, pkg: Partial<InsertPricingPackage>): Promise<PricingPackage | undefined>;
  deletePricingPackage(id: number): Promise<void>;

  // Package Feature operations
  createPackageFeature(feature: InsertPackageFeature): Promise<PackageFeature>;
  getPackageFeatures(packageId: number): Promise<PackageFeature[]>;
  deletePackageFeature(id: number): Promise<void>;

  // FAQ operations
  createFaq(faq: InsertFaq): Promise<Faq>;
  getFaq(id: number): Promise<Faq | undefined>;
  getAllFaqs(): Promise<Faq[]>;
  getPublishedFaqs(): Promise<Faq[]>;
  updateFaq(id: number, faq: Partial<InsertFaq>): Promise<Faq | undefined>;
  deleteFaq(id: number): Promise<void>;

  // Blog operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<void>;

  // Testimonial operations
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getPublishedTestimonials(): Promise<Testimonial[]>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<void>;

  // Contact Submission operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmission(id: number, submission: Partial<InsertContactSubmission>): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: number): Promise<void>;
}

// ============================================
// DATABASE STORAGE IMPLEMENTATION
// ============================================

export class DatabaseStorage implements IStorage {
  // ============================================
  // USER OPERATIONS
  // ============================================

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Check if user exists by ID or email
    const existingById = userData.id ? await db.select().from(users).where(eq(users.id, userData.id)).limit(1) : [];
    const existingByEmail = userData.email ? await db.select().from(users).where(eq(users.email, userData.email)).limit(1) : [];
    
    const existing = existingById[0] || existingByEmail[0];
    
    if (existing) {
      // Update existing user
      const [updated] = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existing.id))
        .returning();
      return updated;
    }
    
    // Insert new user
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUserRole(id: string, role: "admin" | "editor" | "viewer"): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // ============================================
  // MEDIA OPERATIONS
  // ============================================

  async createMedia(mediaData: InsertMedia): Promise<Media> {
    const [newMedia] = await db.insert(media).values(mediaData).returning();
    return newMedia;
  }

  async getMedia(id: number): Promise<Media | undefined> {
    const [result] = await db.select().from(media).where(eq(media.id, id));
    return result;
  }

  async getAllMedia(): Promise<Media[]> {
    return await db.select().from(media).orderBy(desc(media.createdAt));
  }

  async deleteMedia(id: number): Promise<void> {
    await db.delete(media).where(eq(media.id, id));
  }

  // ============================================
  // GALLERY OPERATIONS
  // ============================================

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const [newItem] = await db.insert(galleryItems).values(item).returning();
    return newItem;
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item;
  }

  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).orderBy(galleryItems.displayOrder, desc(galleryItems.createdAt));
  }

  async getPublishedGalleryItems(): Promise<GalleryItem[]> {
    return await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.isPublished, true))
      .orderBy(galleryItems.displayOrder, desc(galleryItems.createdAt));
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [updated] = await db
      .update(galleryItems)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(galleryItems.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryItem(id: number): Promise<void> {
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
  }

  // ============================================
  // SERVICE OPERATIONS
  // ============================================

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.displayOrder);
  }

  async getActiveServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.displayOrder);
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updated;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // ============================================
  // PRICING PACKAGE OPERATIONS
  // ============================================

  async createPricingPackage(pkg: InsertPricingPackage): Promise<PricingPackage> {
    const [newPackage] = await db.insert(pricingPackages).values(pkg).returning();
    return newPackage;
  }

  async getPricingPackage(id: number): Promise<PricingPackage | undefined> {
    const [pkg] = await db.select().from(pricingPackages).where(eq(pricingPackages.id, id));
    return pkg;
  }

  async getAllPricingPackages(): Promise<PricingPackage[]> {
    return await db.select().from(pricingPackages).orderBy(pricingPackages.displayOrder);
  }

  async getActivePricingPackages(): Promise<PricingPackage[]> {
    return await db
      .select()
      .from(pricingPackages)
      .where(eq(pricingPackages.isActive, true))
      .orderBy(pricingPackages.displayOrder);
  }

  async updatePricingPackage(id: number, pkg: Partial<InsertPricingPackage>): Promise<PricingPackage | undefined> {
    const [updated] = await db
      .update(pricingPackages)
      .set({ ...pkg, updatedAt: new Date() })
      .where(eq(pricingPackages.id, id))
      .returning();
    return updated;
  }

  async deletePricingPackage(id: number): Promise<void> {
    await db.delete(pricingPackages).where(eq(pricingPackages.id, id));
  }

  // ============================================
  // PACKAGE FEATURE OPERATIONS
  // ============================================

  async createPackageFeature(feature: InsertPackageFeature): Promise<PackageFeature> {
    const [newFeature] = await db.insert(packageFeatures).values(feature).returning();
    return newFeature;
  }

  async getPackageFeatures(packageId: number): Promise<PackageFeature[]> {
    return await db
      .select()
      .from(packageFeatures)
      .where(eq(packageFeatures.packageId, packageId))
      .orderBy(packageFeatures.displayOrder);
  }

  async deletePackageFeature(id: number): Promise<void> {
    await db.delete(packageFeatures).where(eq(packageFeatures.id, id));
  }

  // ============================================
  // FAQ OPERATIONS
  // ============================================

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }

  async getFaq(id: number): Promise<Faq | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq;
  }

  async getAllFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs).orderBy(faqs.displayOrder);
  }

  async getPublishedFaqs(): Promise<Faq[]> {
    return await db
      .select()
      .from(faqs)
      .where(eq(faqs.isPublished, true))
      .orderBy(faqs.displayOrder);
  }

  async updateFaq(id: number, faq: Partial<InsertFaq>): Promise<Faq | undefined> {
    const [updated] = await db
      .update(faqs)
      .set({ ...faq, updatedAt: new Date() })
      .where(eq(faqs.id, id))
      .returning();
    return updated;
  }

  async deleteFaq(id: number): Promise<void> {
    await db.delete(faqs).where(eq(faqs.id, id));
  }

  // ============================================
  // BLOG POST OPERATIONS
  // ============================================

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // ============================================
  // TESTIMONIAL OPERATIONS
  // ============================================

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.displayOrder);
  }

  async getPublishedTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isPublished, true))
      .orderBy(testimonials.displayOrder);
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // ============================================
  // CONTACT SUBMISSION OPERATIONS
  // ============================================

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmission(id: number, submission: Partial<InsertContactSubmission>): Promise<ContactSubmission | undefined> {
    const [updated] = await db
      .update(contactSubmissions)
      .set(submission)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }

  async deleteContactSubmission(id: number): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }
}

export const storage = new DatabaseStorage();
