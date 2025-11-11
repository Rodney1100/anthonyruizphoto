import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPricingPackageSchema, type InsertPricingPackage, type PricingPackage } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react";
import { useState } from "react";

export default function PricingManagement() {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<PricingPackage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: packages, isLoading } = useQuery<PricingPackage[]>({
    queryKey: ["/api/admin/pricing"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPricingPackage) => {
      return apiRequest("POST", "/api/admin/pricing", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      toast({ title: "Pricing package created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error creating package", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertPricingPackage> }) => {
      return apiRequest("PATCH", `/api/admin/pricing/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      toast({ title: "Pricing package updated successfully" });
      setIsDialogOpen(false);
      setEditingItem(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error updating package", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/pricing/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pricing"] });
      toast({ title: "Pricing package deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting package", description: error.message, variant: "destructive" });
    },
  });

  const form = useForm<InsertPricingPackage>({
    resolver: zodResolver(insertPricingPackageSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      priceCents: 0,
      stripePriceId: "",
      stripeProductId: "",
      isPopular: false,
      isActive: true,
      displayOrder: 0,
    },
  });

  const handleEdit = (item: PricingPackage) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      priceCents: item.priceCents,
      stripePriceId: item.stripePriceId || "",
      stripeProductId: item.stripeProductId || "",
      isPopular: item.isPopular,
      isActive: item.isActive,
      displayOrder: item.displayOrder,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertPricingPackage) => {
    const payload = {
      ...data,
      priceCents: data.priceCents ? parseInt(data.priceCents.toString()) : 0,
      displayOrder: data.displayOrder ? parseInt(data.displayOrder.toString()) : 0,
    };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this pricing package?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    form.reset();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-md" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold uppercase tracking-wide" data-testid="text-pricing-title">
              Pricing Management
            </h1>
            <p className="text-muted-foreground mt-2">Manage your pricing packages</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)} data-testid="button-create-pricing">
                <Plus className="w-4 h-4 mr-2" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Pricing Package" : "Create Pricing Package"}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-slug" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} value={field.value || ""} data-testid="input-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priceCents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (cents)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-display-order"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPopular"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-4">
                        <div>
                          <FormLabel>Popular</FormLabel>
                          <p className="text-sm text-muted-foreground">Mark as most popular package</p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-popular"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-4">
                        <div>
                          <FormLabel>Active</FormLabel>
                          <p className="text-sm text-muted-foreground">Make this package visible to public</p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-active"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDialogClose}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      data-testid="button-submit"
                    >
                      {editingItem ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {!packages || packages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <DollarSign className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No pricing packages yet</h3>
              <p className="text-muted-foreground mb-4">Create your first package to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} data-testid={`pricing-${pkg.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="line-clamp-1">{pkg.name}</span>
                    {pkg.isPopular && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">Popular</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Slug:</span> {pkg.slug}</p>
                    {pkg.description && (
                      <p className="line-clamp-2"><span className="font-medium">Description:</span> {pkg.description}</p>
                    )}
                    <p className="text-2xl font-bold text-primary">${(pkg.priceCents / 100).toFixed(2)}</p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className={pkg.isActive ? "text-green-600" : "text-muted-foreground"}>
                        {pkg.isActive ? "Active" : "Inactive"}
                      </span>
                    </p>
                    <p><span className="font-medium">Display Order:</span> {pkg.displayOrder}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(pkg)}
                      data-testid={`button-edit-${pkg.id}`}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(pkg.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${pkg.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
