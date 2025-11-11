import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Images, Briefcase, DollarSign, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const { data: galleryItems } = useQuery({
    queryKey: ["/api/admin/gallery"],
  });

  const { data: services } = useQuery({
    queryKey: ["/api/admin/services"],
  });

  const { data: pricingPackages } = useQuery({
    queryKey: ["/api/admin/pricing"],
  });

  const { data: contactSubmissions } = useQuery({
    queryKey: ["/api/admin/contact"],
  });

  const stats = [
    {
      title: "Gallery Items",
      value: (galleryItems as any[])?.length || 0,
      icon: Images,
      color: "text-blue-600",
    },
    {
      title: "Services",
      value: (services as any[])?.length || 0,
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "Pricing Packages",
      value: (pricingPackages as any[])?.length || 0,
      icon: DollarSign,
      color: "text-amber-600",
    },
    {
      title: "Contact Inquiries",
      value: (contactSubmissions as any[])?.filter((s: any) => s.status === "new").length || 0,
      icon: MessageSquare,
      color: "text-purple-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold uppercase tracking-wide" data-testid="text-admin-dashboard-title">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Welcome to the Anthony Ruiz Photography CMS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} data-testid={`card-stat-${stat.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {contactSubmissions && (contactSubmissions as any[]).length > 0 ? (
                <div className="space-y-4">
                  {(contactSubmissions as any[]).slice(0, 5).map((submission: any) => (
                    <div
                      key={submission.id}
                      className="flex items-start justify-between border-b pb-3 last:border-0"
                      data-testid={`inquiry-${submission.id}`}
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{submission.name}</p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                        <p className="text-sm mt-1 line-clamp-1">{submission.message}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        submission.status === "new" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {submission.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No contact inquiries yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a href="/admin/gallery">
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-card-border shadow-xs h-9 min-h-9 rounded-md px-4 text-sm hover-elevate active-elevate-2 bg-card text-card-foreground" data-testid="button-quick-gallery">
                  <Images className="w-4 h-4 mr-2" />
                  Manage Gallery
                </button>
              </a>
              <a href="/admin/services">
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-card-border shadow-xs h-9 min-h-9 rounded-md px-4 text-sm hover-elevate active-elevate-2 bg-card text-card-foreground" data-testid="button-quick-services">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Edit Services
                </button>
              </a>
              <a href="/admin/pricing">
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-card-border shadow-xs h-9 min-h-9 rounded-md px-4 text-sm hover-elevate active-elevate-2 bg-card text-card-foreground" data-testid="button-quick-pricing">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Update Pricing
                </button>
              </a>
              <a href="/admin/contact">
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-card-border shadow-xs h-9 min-h-9 rounded-md px-4 text-sm hover-elevate active-elevate-2 bg-card text-card-foreground" data-testid="button-quick-contact">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Inquiries
                </button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
