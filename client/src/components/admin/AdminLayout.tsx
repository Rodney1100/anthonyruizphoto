import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Images,
  Briefcase,
  DollarSign,
  HelpCircle,
  FileText,
  Star,
  MessageSquare,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gallery",
    url: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Pricing",
    url: "/admin/pricing",
    icon: DollarSign,
  },
  {
    title: "Blog",
    url: "/admin/blog",
    icon: FileText,
  },
  {
    title: "FAQs",
    url: "/admin/faqs",
    icon: HelpCircle,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Contact Inquiries",
    url: "/admin/contact",
    icon: MessageSquare,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  
  const typedUser = user as any;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in to access the admin panel.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  // Check if user has admin or editor role
  useEffect(() => {
    if (typedUser && typedUser.role === "viewer") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/");
      }, 500);
    }
  }, [typedUser, toast, setLocation]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-md" aria-label="Loading" />
      </div>
    );
  }

  if (!isAuthenticated || !typedUser || typedUser.role === "viewer") {
    return null;
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <div className="flex flex-col">
                  <span className="text-base font-bold">Anthony Ruiz CMS</span>
                  <span className="text-xs text-muted-foreground capitalize">{typedUser.role}</span>
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={location === item.url ? "bg-sidebar-accent" : ""}
                          data-testid={`link-admin-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/api/logout" data-testid="button-logout">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
