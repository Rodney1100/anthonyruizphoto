import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Upload, Check, X } from "lucide-react";
import { type Media } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface MediaPickerProps {
  value: number | null | undefined;
  onChange: (mediaId: number | null) => void;
  label?: string;
}

export function MediaPicker({ value, onChange, label = "Select Image" }: MediaPickerProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(value ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selectedMediaId with incoming value prop (important for edit flows)
  useEffect(() => {
    setSelectedMediaId(value ?? null);
  }, [value]);

  const { data: media, isLoading } = useQuery<Media[]>({
    queryKey: ["/api/media"],
  });

  const selectedMedia = media?.find((m) => m.id === value);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({ title: "Image uploaded successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error uploading image", description: error.message, variant: "destructive" });
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadMutation.mutateAsync(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelectMedia = (mediaId: number) => {
    setSelectedMediaId(mediaId);
  };

  const handleConfirm = () => {
    onChange(selectedMediaId);
    setIsDialogOpen(false);
  };

  const handleClear = () => {
    setSelectedMediaId(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" data-testid="button-open-media-picker">
              <ImageIcon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  data-testid="input-file-upload"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  data-testid="button-upload-media"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploadMutation.isPending ? "Uploading..." : "Upload New Image"}
                </Button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-md" />
                </div>
              ) : !media || media.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No images yet</h3>
                  <p className="text-muted-foreground">Upload your first image to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <Card
                      key={item.id}
                      className={`relative cursor-pointer hover-elevate p-2 ${
                        selectedMediaId === item.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleSelectMedia(item.id)}
                      data-testid={`media-item-${item.id}`}
                    >
                      <div className="aspect-square relative rounded-md overflow-hidden bg-muted">
                        <img
                          src={item.url}
                          alt={item.altText || item.originalFilename}
                          className="w-full h-full object-cover"
                          data-testid={`media-image-${item.id}`}
                        />
                        {selectedMediaId === item.id && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-md p-1">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 truncate" title={item.originalFilename}>
                        {item.originalFilename}
                      </p>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel-media-picker"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirm}
                  data-testid="button-confirm-media-picker"
                >
                  Confirm Selection
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {selectedMedia && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.altText || selectedMedia.originalFilename}
                className="w-10 h-10 object-cover rounded-md border"
                data-testid="media-preview-image"
              />
              <span className="truncate max-w-[200px]" data-testid="text-selected-media">
                {selectedMedia.originalFilename}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              data-testid="button-clear-media"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
