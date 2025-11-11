import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, requireAdmin, requireEditor } from "./replitAuth";
import { upload } from "./middleware/upload";
import { insertMediaSchema, insertGalleryItemSchema, insertServiceSchema, insertPricingPackageSchema, insertPackageFeatureSchema, insertFaqSchema, insertBlogPostSchema, insertTestimonialSchema, insertContactSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // ============================================
  // AUTH ROUTES
  // ============================================

  app.get("/api/auth/user", isAuthenticated, async (req: any, res: Response) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ============================================
  // MEDIA ROUTES
  // ============================================

  // Upload media (admin/editor only)
  app.post("/api/media", requireEditor, upload.single("file"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const userId = (req as any).user.claims.sub;
      const { altText } = req.body;

      const mediaData = insertMediaSchema.parse({
        filename: req.file.filename,
        originalFilename: req.file.originalname,
        url: `/uploads/${req.file.filename}`,
        altText: altText || "",
        width: null,
        height: null,
        sizeBytes: req.file.size,
        mimeType: req.file.mimetype,
        uploadedBy: userId,
        storageProvider: "local",
      });

      const media = await storage.createMedia(mediaData);
      res.status(201).json(media);
    } catch (error: any) {
      console.error("Error uploading media:", error);
      res.status(500).json({ message: "Failed to upload media", error: error.message });
    }
  });

  // Get all media (admin/editor only)
  app.get("/api/media", requireEditor, async (req: Request, res: Response) => {
    try {
      const media = await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // Get single media (admin/editor only)
  app.get("/api/media/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const media = await storage.getMedia(id);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // Delete media (admin only)
  app.delete("/api/media/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMedia(id);
      res.json({ message: "Media deleted successfully" });
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(500).json({ message: "Failed to delete media" });
    }
  });

  // ============================================
  // GALLERY ROUTES
  // ============================================

  // Public: Get published gallery items
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const items = await storage.getPublishedGalleryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Admin: Get all gallery items
  app.get("/api/admin/gallery", requireEditor, async (req: Request, res: Response) => {
    try {
      const items = await storage.getAllGalleryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Create gallery item (admin/editor only)
  app.post("/api/admin/gallery", requireEditor, async (req: Request, res: Response) => {
    try {
      const itemData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(itemData);
      res.status(201).json(item);
    } catch (error: any) {
      console.error("Error creating gallery item:", error);
      res.status(500).json({ message: "Failed to create gallery item", error: error.message });
    }
  });

  // Update gallery item (admin/editor only)
  app.patch("/api/admin/gallery/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.updateGalleryItem(id, req.body);
      if (!item) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      res.json(item);
    } catch (error: any) {
      console.error("Error updating gallery item:", error);
      res.status(500).json({ message: "Failed to update gallery item", error: error.message });
    }
  });

  // Delete gallery item (admin only)
  app.delete("/api/admin/gallery/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGalleryItem(id);
      res.json({ message: "Gallery item deleted successfully" });
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      res.status(500).json({ message: "Failed to delete gallery item" });
    }
  });

  // ============================================
  // SERVICES ROUTES
  // ============================================

  // Public: Get active services
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const services = await storage.getActiveServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Admin: Get all services
  app.get("/api/admin/services", requireEditor, async (req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Create service (admin/editor only)
  app.post("/api/admin/services", requireEditor, async (req: Request, res: Response) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error: any) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service", error: error.message });
    }
  });

  // Update service (admin/editor only)
  app.patch("/api/admin/services/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.updateService(id, req.body);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error: any) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service", error: error.message });
    }
  });

  // Delete service (admin only)
  app.delete("/api/admin/services/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteService(id);
      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // ============================================
  // PRICING ROUTES
  // ============================================

  // Public: Get active pricing packages with features
  app.get("/api/pricing", async (req: Request, res: Response) => {
    try {
      const packages = await storage.getActivePricingPackages();
      const packagesWithFeatures = await Promise.all(
        packages.map(async (pkg) => {
          const features = await storage.getPackageFeatures(pkg.id);
          return { ...pkg, features };
        })
      );
      res.json(packagesWithFeatures);
    } catch (error) {
      console.error("Error fetching pricing packages:", error);
      res.status(500).json({ message: "Failed to fetch pricing packages" });
    }
  });

  // Admin: Get all pricing packages
  app.get("/api/admin/pricing", requireEditor, async (req: Request, res: Response) => {
    try {
      const packages = await storage.getAllPricingPackages();
      const packagesWithFeatures = await Promise.all(
        packages.map(async (pkg) => {
          const features = await storage.getPackageFeatures(pkg.id);
          return { ...pkg, features };
        })
      );
      res.json(packagesWithFeatures);
    } catch (error) {
      console.error("Error fetching pricing packages:", error);
      res.status(500).json({ message: "Failed to fetch pricing packages" });
    }
  });

  // Create pricing package (admin/editor only)
  app.post("/api/admin/pricing", requireEditor, async (req: Request, res: Response) => {
    try {
      const packageData = insertPricingPackageSchema.parse(req.body);
      const pkg = await storage.createPricingPackage(packageData);
      res.status(201).json(pkg);
    } catch (error: any) {
      console.error("Error creating pricing package:", error);
      res.status(500).json({ message: "Failed to create pricing package", error: error.message });
    }
  });

  // Update pricing package (admin/editor only)
  app.patch("/api/admin/pricing/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = await storage.updatePricingPackage(id, req.body);
      if (!pkg) {
        return res.status(404).json({ message: "Pricing package not found" });
      }
      res.json(pkg);
    } catch (error: any) {
      console.error("Error updating pricing package:", error);
      res.status(500).json({ message: "Failed to update pricing package", error: error.message });
    }
  });

  // Delete pricing package (admin only)
  app.delete("/api/admin/pricing/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePricingPackage(id);
      res.json({ message: "Pricing package deleted successfully" });
    } catch (error) {
      console.error("Error deleting pricing package:", error);
      res.status(500).json({ message: "Failed to delete pricing package" });
    }
  });

  // Add feature to package (admin/editor only)
  app.post("/api/admin/pricing/:id/features", requireEditor, async (req: Request, res: Response) => {
    try {
      const packageId = parseInt(req.params.id);
      const featureData = insertPackageFeatureSchema.parse({ ...req.body, packageId });
      const feature = await storage.createPackageFeature(featureData);
      res.status(201).json(feature);
    } catch (error: any) {
      console.error("Error creating package feature:", error);
      res.status(500).json({ message: "Failed to create package feature", error: error.message });
    }
  });

  // Delete package feature (admin only)
  app.delete("/api/admin/pricing/features/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePackageFeature(id);
      res.json({ message: "Package feature deleted successfully" });
    } catch (error) {
      console.error("Error deleting package feature:", error);
      res.status(500).json({ message: "Failed to delete package feature" });
    }
  });

  // ============================================
  // FAQ ROUTES
  // ============================================

  // Public: Get published FAQs
  app.get("/api/faqs", async (req: Request, res: Response) => {
    try {
      const faqs = await storage.getPublishedFaqs();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  // Admin: Get all FAQs
  app.get("/api/admin/faqs", requireEditor, async (req: Request, res: Response) => {
    try {
      const faqs = await storage.getAllFaqs();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  // Create FAQ (admin/editor only)
  app.post("/api/admin/faqs", requireEditor, async (req: Request, res: Response) => {
    try {
      const faqData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(faqData);
      res.status(201).json(faq);
    } catch (error: any) {
      console.error("Error creating FAQ:", error);
      res.status(500).json({ message: "Failed to create FAQ", error: error.message });
    }
  });

  // Update FAQ (admin/editor only)
  app.patch("/api/admin/faqs/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const faq = await storage.updateFaq(id, req.body);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res.json(faq);
    } catch (error: any) {
      console.error("Error updating FAQ:", error);
      res.status(500).json({ message: "Failed to update FAQ", error: error.message });
    }
  });

  // Delete FAQ (admin only)
  app.delete("/api/admin/faqs/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFaq(id);
      res.json({ message: "FAQ deleted successfully" });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      res.status(500).json({ message: "Failed to delete FAQ" });
    }
  });

  // ============================================
  // BLOG ROUTES
  // ============================================

  // Public: Get published blog posts
  app.get("/api/blog", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Public: Get blog post by slug
  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || post.status !== "published") {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin: Get all blog posts
  app.get("/api/admin/blog", requireEditor, async (req: Request, res: Response) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Create blog post (admin/editor only)
  app.post("/api/admin/blog", requireEditor, async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.claims.sub;
      const postData = insertBlogPostSchema.parse({ ...req.body, authorId: userId });
      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error: any) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post", error: error.message });
    }
  });

  // Update blog post (admin/editor only)
  app.patch("/api/admin/blog/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.updateBlogPost(id, req.body);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post", error: error.message });
    }
  });

  // Delete blog post (admin only)
  app.delete("/api/admin/blog/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // ============================================
  // TESTIMONIAL ROUTES
  // ============================================

  // Public: Get published testimonials
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getPublishedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Admin: Get all testimonials
  app.get("/api/admin/testimonials", requireEditor, async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Create testimonial (admin/editor only)
  app.post("/api/admin/testimonials", requireEditor, async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error: any) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial", error: error.message });
    }
  });

  // Update testimonial (admin/editor only)
  app.patch("/api/admin/testimonials/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const testimonial = await storage.updateTestimonial(id, req.body);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error: any) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial", error: error.message });
    }
  });

  // Delete testimonial (admin only)
  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // ============================================
  // CONTACT ROUTES
  // ============================================

  // Public: Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(submissionData);
      res.status(201).json({ message: "Contact form submitted successfully", id: submission.id });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form", error: error.message });
    }
  });

  // Admin: Get all contact submissions
  app.get("/api/admin/contact", requireEditor, async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // Admin: Update contact submission status
  app.patch("/api/admin/contact/:id", requireEditor, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.updateContactSubmission(id, req.body);
      if (!submission) {
        return res.status(404).json({ message: "Contact submission not found" });
      }
      res.json(submission);
    } catch (error: any) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ message: "Failed to update contact submission", error: error.message });
    }
  });

  // Admin: Delete contact submission
  app.delete("/api/admin/contact/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContactSubmission(id);
      res.json({ message: "Contact submission deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      res.status(500).json({ message: "Failed to delete contact submission" });
    }
  });

  // Serve uploaded files
  app.use("/uploads", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const httpServer = createServer(app);
  return httpServer;
}
