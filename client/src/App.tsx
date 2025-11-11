import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import GalleryManagement from "@/pages/admin/GalleryManagement";
import ServicesManagement from "@/pages/admin/ServicesManagement";
import PricingManagement from "@/pages/admin/PricingManagement";
import BlogManagement from "@/pages/admin/BlogManagement";
import FAQsManagement from "@/pages/admin/FAQsManagement";
import TestimonialsManagement from "@/pages/admin/TestimonialsManagement";
import ContactManagement from "@/pages/admin/ContactManagement";
import NotFound from "@/pages/not-found";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:text-background focus:px-6 focus:py-3 focus:rounded-md focus:font-bold focus:text-base focus:ring-4 focus:ring-white focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-20" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");
  const isLoginRoute = location === "/login";

  // Admin routes don't get the public layout
  if (isAdminRoute) {
    return (
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/gallery" component={GalleryManagement} />
        <Route path="/admin/services" component={ServicesManagement} />
        <Route path="/admin/pricing" component={PricingManagement} />
        <Route path="/admin/blog" component={BlogManagement} />
        <Route path="/admin/faqs" component={FAQsManagement} />
        <Route path="/admin/testimonials" component={TestimonialsManagement} />
        <Route path="/admin/contact" component={ContactManagement} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // Login page doesn't get the public layout
  if (isLoginRoute) {
    return <Login />;
  }

  // Public routes get the marketing layout
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
