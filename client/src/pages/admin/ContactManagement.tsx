import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type ContactSubmission } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Mail, Phone, Eye } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export default function ContactManagement() {
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: submissions, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/admin/contact/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
      toast({ title: "Status updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating status", description: error.message, variant: "destructive" });
    },
  });

  const handleViewDetails = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "responded":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
        <div>
          <h1 className="text-4xl font-semibold uppercase tracking-wide" data-testid="text-contact-title">
            Contact Inquiries
          </h1>
          <p className="text-muted-foreground mt-2">Manage contact form submissions</p>
        </div>

        {!submissions || submissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No contact submissions yet</h3>
              <p className="text-muted-foreground mb-4">Submissions will appear here when users contact you</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {submissions.map((submission) => (
              <Card key={submission.id} data-testid={`contact-${submission.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="line-clamp-1">{submission.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-md ${getStatusColor(submission.status)}`}>
                          {submission.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-normal mt-1">
                        {format(new Date(submission.createdAt), "PPP 'at' p")}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Email:</span>
                      <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                        {submission.email}
                      </a>
                    </p>
                    {submission.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Phone:</span>
                        <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                          {submission.phone}
                        </a>
                      </p>
                    )}
                    {submission.serviceInterest && (
                      <p>
                        <span className="font-medium">Service Interest:</span> {submission.serviceInterest}
                      </p>
                    )}
                    <p className="line-clamp-2">
                      <span className="font-medium">Message:</span> {submission.message}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(submission)}
                      data-testid={`button-view-${submission.id}`}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Select
                      value={submission.status}
                      onValueChange={(value) => handleStatusChange(submission.id, value)}
                    >
                      <SelectTrigger className="w-40" data-testid={`select-status-${submission.id}`}>
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="responded">Responded</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contact Submission Details</DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedSubmission.name}</p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                        {selectedSubmission.email}
                      </a>
                    </p>
                    {selectedSubmission.phone && (
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        <a href={`tel:${selectedSubmission.phone}`} className="text-primary hover:underline">
                          {selectedSubmission.phone}
                        </a>
                      </p>
                    )}
                    {selectedSubmission.serviceInterest && (
                      <p><span className="font-medium">Service Interest:</span> {selectedSubmission.serviceInterest}</p>
                    )}
                    <p><span className="font-medium">Submitted:</span> {format(new Date(selectedSubmission.createdAt), "PPP 'at' p")}</p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`text-xs px-2 py-1 rounded-md ${getStatusColor(selectedSubmission.status)}`}>
                        {selectedSubmission.status.replace("_", " ")}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Message</h3>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">{selectedSubmission.message}</p>
                </div>
                {selectedSubmission.internalNotes && (
                  <div>
                    <h3 className="font-semibold mb-2">Internal Notes</h3>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">{selectedSubmission.internalNotes}</p>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-close-dialog">
                    Close
                  </Button>
                  <Button asChild data-testid="button-email-reply">
                    <a href={`mailto:${selectedSubmission.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
