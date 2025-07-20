'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  description: string;
  amenities: string[];
  image?: string;
  isActive: boolean;
}

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: '1',
      name: 'Beverly Theater',
      address: '123 Beverly Drive, Beverly Hills, CA 90210',
      capacity: 500,
      description: 'Historic theater with state-of-the-art projection and sound systems.',
      amenities: ['Parking', 'Concessions', 'VIP Lounge', 'Wheelchair Accessible'],
      isActive: true,
    },
    {
      id: '2',
      name: 'Hollywood Plaza',
      address: '456 Sunset Blvd, Hollywood, CA 90028',
      capacity: 300,
      description: 'Modern cinema complex with multiple screening rooms.',
      amenities: ['Parking', 'Concessions', 'Bar', 'Digital Projection'],
      isActive: true,
    },
    {
      id: '3',
      name: 'Academy Hall',
      address: '789 Academy Way, Beverly Hills, CA 90212',
      capacity: 200,
      description: 'Intimate venue perfect for independent films and Q&A sessions.',
      amenities: ['Street Parking', 'Concessions', 'Green Room'],
      isActive: false,
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);

  const handleCreateVenue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amenities = (formData.get('amenities') as string)
      .split(',')
      .map(a => a.trim())
      .filter(a => a);
    
    const newVenue: Venue = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      capacity: parseInt(formData.get('capacity') as string),
      description: formData.get('description') as string,
      amenities,
      isActive: true,
    };
    
    setVenues([...venues, newVenue]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateVenue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingVenue) return;
    
    const formData = new FormData(e.currentTarget);
    const amenities = (formData.get('amenities') as string)
      .split(',')
      .map(a => a.trim())
      .filter(a => a);
    
    const updatedVenue: Venue = {
      ...editingVenue,
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      capacity: parseInt(formData.get('capacity') as string),
      description: formData.get('description') as string,
      amenities,
    };
    
    setVenues(venues.map(venue => 
      venue.id === editingVenue.id ? updatedVenue : venue
    ));
    setEditingVenue(null);
  };

  const handleDeleteVenue = (venueId: string) => {
    setVenues(venues.filter(venue => venue.id !== venueId));
  };

  const toggleVenueStatus = (venueId: string) => {
    setVenues(venues.map(venue =>
      venue.id === venueId ? { ...venue, isActive: !venue.isActive } : venue
    ));
  };

  const VenueForm = ({ venue, onSubmit }: { venue?: Venue | null; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Venue Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={venue?.name}
          placeholder="e.g., Beverly Theater"
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          defaultValue={venue?.address}
          placeholder="Full address"
          required
        />
      </div>
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          defaultValue={venue?.capacity}
          placeholder="Number of seats"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={venue?.description}
          placeholder="Venue description and features"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
        <Input
          id="amenities"
          name="amenities"
          defaultValue={venue?.amenities.join(', ')}
          placeholder="e.g., Parking, Concessions, VIP Lounge"
        />
      </div>
      <Button type="submit" className="w-full">
        {venue ? 'Update Venue' : 'Create Venue'}
      </Button>
    </form>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Venue Management</h1>
          <p className="text-muted-foreground">
            Manage festival screening venues
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Venue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Venue</DialogTitle>
              <DialogDescription>
                Create a new screening venue for the festival
              </DialogDescription>
            </DialogHeader>
            <VenueForm onSubmit={handleCreateVenue} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Venues Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <Card key={venue.id} className={!venue.isActive ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {venue.name}
                    {!venue.isActive && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {venue.address}
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Implement image upload
                    console.log('Upload image for venue:', venue.id);
                  }}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{venue.description}</p>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Capacity: {venue.capacity}</span>
                </div>

                {venue.amenities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    variant={venue.isActive ? 'outline' : 'default'}
                    onClick={() => toggleVenueStatus(venue.id)}
                    className="flex-1"
                  >
                    {venue.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingVenue(venue)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Venue</DialogTitle>
                        <DialogDescription>
                          Update venue information
                        </DialogDescription>
                      </DialogHeader>
                      <VenueForm venue={editingVenue} onSubmit={handleUpdateVenue} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteVenue(venue.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {venues.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No venues added yet</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Venue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}