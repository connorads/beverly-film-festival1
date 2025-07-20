'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Upload, Image as ImageIcon, Trash2, Eye, Download, Grid, List } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  uploadDate: string;
  photographer?: string;
  event?: string;
  isPublished: boolean;
}

const imageCategories = [
  'Red Carpet',
  'Screenings',
  'Awards Ceremony',
  'Behind the Scenes',
  'Venue',
  'Sponsors',
  'General',
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: '1',
      url: '/api/placeholder/400/300',
      title: 'Opening Night Red Carpet',
      description: 'Celebrities arrive at the festival opening',
      category: 'Red Carpet',
      uploadDate: '2024-03-15',
      photographer: 'John Photography',
      event: 'Opening Night Gala',
      isPublished: true,
    },
    {
      id: '2',
      url: '/api/placeholder/400/300',
      title: 'Best Film Award Presentation',
      description: 'Director receiving the Best Film award',
      category: 'Awards Ceremony',
      uploadDate: '2024-03-16',
      photographer: 'Jane Studios',
      isPublished: true,
    },
    {
      id: '3',
      url: '/api/placeholder/400/300',
      title: 'Beverly Theater Interior',
      description: 'Main screening venue',
      category: 'Venue',
      uploadDate: '2024-03-10',
      isPublished: false,
    },
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = images.filter(
    image => selectedCategory === 'all' || image.category === selectedCategory
  );

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: '/api/placeholder/400/300', // In real app, this would be the uploaded URL
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      photographer: formData.get('photographer') as string,
      event: formData.get('event') as string,
      uploadDate: new Date().toISOString().split('T')[0],
      isPublished: false,
    };
    
    setImages([...images, newImage]);
    setIsUploadDialogOpen(false);
  };

  const handleDelete = (imageId: string) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  const togglePublishStatus = (imageId: string) => {
    setImages(images.map(img =>
      img.id === imageId ? { ...img, isPublished: !img.isPublished } : img
    ));
  };

  const UploadForm = () => (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <Label htmlFor="file">Select Image</Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          required
          className="cursor-pointer"
        />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Image title"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Brief description (optional)"
          rows={2}
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {imageCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="photographer">Photographer</Label>
        <Input
          id="photographer"
          name="photographer"
          placeholder="Photographer name (optional)"
        />
      </div>
      <div>
        <Label htmlFor="event">Event</Label>
        <Input
          id="event"
          name="event"
          placeholder="Related event (optional)"
        />
      </div>
      <Button type="submit" className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        Upload Image
      </Button>
    </form>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photo Gallery</h1>
          <p className="text-muted-foreground">
            Manage festival photos and media
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Photo</DialogTitle>
                <DialogDescription>
                  Add a new photo to the festival gallery
                </DialogDescription>
              </DialogHeader>
              <UploadForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              All ({images.length})
            </Button>
            {imageCategories.map(category => {
              const count = images.filter(img => img.category === category).length;
              return (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gallery View */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <img
                  src={image.url}
                  alt={image.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={image.isPublished ? 'default' : 'secondary'}>
                    {image.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{image.category}</p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => togglePublishStatus(image.id)}
                  >
                    {image.isPublished ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">Image</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredImages.map((image) => (
                  <tr key={image.id} className="border-b">
                    <td className="p-4">
                      <div className="w-20 h-20 bg-muted rounded overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{image.title}</p>
                        {image.photographer && (
                          <p className="text-sm text-muted-foreground">by {image.photographer}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">{image.category}</td>
                    <td className="p-4">{image.uploadDate}</td>
                    <td className="p-4">
                      <Badge variant={image.isPublished ? 'default' : 'secondary'}>
                        {image.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => togglePublishStatus(image.id)}
                        >
                          {image.isPublished ? 'Hide' : 'Show'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(image.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No images in this category</p>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload First Photo
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>
              {selectedImage?.category} • {selectedImage?.uploadDate}
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="object-contain w-full h-full"
                />
              </div>
              {selectedImage.description && (
                <p className="text-sm">{selectedImage.description}</p>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedImage.photographer && (
                  <div>
                    <Label>Photographer</Label>
                    <p>{selectedImage.photographer}</p>
                  </div>
                )}
                {selectedImage.event && (
                  <div>
                    <Label>Event</Label>
                    <p>{selectedImage.event}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant={selectedImage.isPublished ? 'outline' : 'default'}
                  className="flex-1"
                  onClick={() => {
                    togglePublishStatus(selectedImage.id);
                    setSelectedImage(null);
                  }}
                >
                  {selectedImage.isPublished ? 'Unpublish' : 'Publish'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}