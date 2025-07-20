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
import { Building2, Plus, Edit, Trash2, Upload, Link, DollarSign } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  logo?: string;
  website?: string;
  description?: string;
  amount: number;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  benefits: string[];
  isActive: boolean;
  startDate: string;
  endDate?: string;
}

const sponsorTiers = {
  platinum: { name: 'Platinum', minAmount: 50000, color: 'bg-purple-500' },
  gold: { name: 'Gold', minAmount: 25000, color: 'bg-yellow-500' },
  silver: { name: 'Silver', minAmount: 10000, color: 'bg-gray-400' },
  bronze: { name: 'Bronze', minAmount: 5000, color: 'bg-orange-600' },
};

const tierBenefits = {
  platinum: [
    'Title sponsorship',
    'Logo on all materials',
    'VIP table for 10',
    'Speaking opportunity',
    'Full-page ad in program',
    'Social media promotion',
  ],
  gold: [
    'Logo on select materials',
    'VIP table for 6',
    'Half-page ad in program',
    'Social media mentions',
  ],
  silver: [
    'Logo on website',
    'VIP tickets (4)',
    'Quarter-page ad in program',
  ],
  bronze: [
    'Name listing',
    'VIP tickets (2)',
    'Website listing',
  ],
};

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    {
      id: '1',
      name: 'Beverly Hills Bank',
      tier: 'platinum',
      website: 'https://bhbank.com',
      description: 'Premier financial partner of the festival',
      amount: 75000,
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah@bhbank.com',
      contactPhone: '(310) 555-0100',
      benefits: tierBenefits.platinum,
      isActive: true,
      startDate: '2024-01-01',
    },
    {
      id: '2',
      name: 'Luxury Motors LA',
      tier: 'gold',
      website: 'https://luxurymotorsla.com',
      amount: 30000,
      contactName: 'Michael Chen',
      contactEmail: 'mchen@luxurymotors.com',
      benefits: tierBenefits.gold,
      isActive: true,
      startDate: '2024-02-01',
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filteredSponsors = sponsors.filter(
    sponsor => selectedTier === 'all' || sponsor.tier === selectedTier
  );

  const handleCreateSponsor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tier = formData.get('tier') as keyof typeof tierBenefits;
    
    const newSponsor: Sponsor = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      tier,
      website: formData.get('website') as string,
      description: formData.get('description') as string,
      amount: parseInt(formData.get('amount') as string),
      contactName: formData.get('contactName') as string,
      contactEmail: formData.get('contactEmail') as string,
      contactPhone: formData.get('contactPhone') as string,
      benefits: tierBenefits[tier],
      isActive: true,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string || undefined,
    };
    
    setSponsors([...sponsors, newSponsor]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateSponsor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSponsor) return;
    
    const formData = new FormData(e.currentTarget);
    const tier = formData.get('tier') as keyof typeof tierBenefits;
    
    const updatedSponsor: Sponsor = {
      ...editingSponsor,
      name: formData.get('name') as string,
      tier,
      website: formData.get('website') as string,
      description: formData.get('description') as string,
      amount: parseInt(formData.get('amount') as string),
      contactName: formData.get('contactName') as string,
      contactEmail: formData.get('contactEmail') as string,
      contactPhone: formData.get('contactPhone') as string,
      benefits: tierBenefits[tier],
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string || undefined,
    };
    
    setSponsors(sponsors.map(sponsor => 
      sponsor.id === editingSponsor.id ? updatedSponsor : sponsor
    ));
    setEditingSponsor(null);
  };

  const handleDeleteSponsor = (sponsorId: string) => {
    setSponsors(sponsors.filter(sponsor => sponsor.id !== sponsorId));
  };

  const toggleSponsorStatus = (sponsorId: string) => {
    setSponsors(sponsors.map(sponsor =>
      sponsor.id === sponsorId ? { ...sponsor, isActive: !sponsor.isActive } : sponsor
    ));
  };

  const totalSponsorship = sponsors
    .filter(s => s.isActive)
    .reduce((sum, s) => sum + s.amount, 0);

  const SponsorForm = ({ sponsor, onSubmit }: { sponsor?: Sponsor | null; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Company Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={sponsor?.name}
          placeholder="Company name"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tier">Sponsorship Tier</Label>
          <Select name="tier" defaultValue={sponsor?.tier}>
            <SelectTrigger>
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sponsorTiers).map(([key, tier]) => (
                <SelectItem key={key} value={key}>
                  {tier.name} (${tier.minAmount.toLocaleString()}+)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            defaultValue={sponsor?.amount}
            placeholder="Sponsorship amount"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={sponsor?.website}
          placeholder="https://example.com"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={sponsor?.description}
          placeholder="Brief description of the sponsor"
          rows={2}
        />
      </div>
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium">Contact Information</h4>
        <div>
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            name="contactName"
            defaultValue={sponsor?.contactName}
            placeholder="Primary contact name"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={sponsor?.contactEmail}
              placeholder="contact@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              defaultValue={sponsor?.contactPhone}
              placeholder="(310) 555-0000"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={sponsor?.startDate}
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date (optional)</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={sponsor?.endDate}
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {sponsor ? 'Update Sponsor' : 'Add Sponsor'}
      </Button>
    </form>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sponsor Management</h1>
          <p className="text-muted-foreground">
            Manage festival sponsors and partnerships
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Sponsor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Sponsor</DialogTitle>
              <DialogDescription>
                Create a new sponsorship partnership
              </DialogDescription>
            </DialogHeader>
            <SponsorForm onSubmit={handleCreateSponsor} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsors.length}</div>
            <p className="text-xs text-muted-foreground">
              {sponsors.filter(s => s.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsorship</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSponsorship.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Platinum Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sponsors.filter(s => s.tier === 'platinum' && s.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${sponsors.length > 0 
                ? Math.round(totalSponsorship / sponsors.filter(s => s.isActive).length).toLocaleString()
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Tier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedTier === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedTier('all')}
            >
              All Tiers
            </Button>
            {Object.entries(sponsorTiers).map(([key, tier]) => (
              <Button
                key={key}
                size="sm"
                variant={selectedTier === key ? 'default' : 'outline'}
                onClick={() => setSelectedTier(key)}
              >
                <div className={`w-3 h-3 rounded-full ${tier.color} mr-2`} />
                {tier.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sponsors List */}
      <div className="grid gap-4">
        {filteredSponsors.map((sponsor) => {
          const tier = sponsorTiers[sponsor.tier];
          return (
            <Card key={sponsor.id} className={!sponsor.isActive ? 'opacity-60' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">{sponsor.name}</h3>
                      <Badge className={`${tier.color} text-white`}>
                        {tier.name}
                      </Badge>
                      <Badge variant={sponsor.isActive ? 'default' : 'secondary'}>
                        {sponsor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {sponsor.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Contact</p>
                        <p className="font-medium">{sponsor.contactName}</p>
                        <p className="text-xs">{sponsor.contactEmail}</p>
                      </div>
                    </div>

                    {sponsor.description && (
                      <p className="text-sm text-muted-foreground">{sponsor.description}</p>
                    )}

                    {sponsor.website && (
                      <a 
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Link className="h-3 w-3" />
                        {sponsor.website}
                      </a>
                    )}

                    <div>
                      <p className="text-sm font-medium mb-2">Benefits</p>
                      <div className="flex flex-wrap gap-1">
                        {sponsor.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // Implement logo upload
                        console.log('Upload logo for sponsor:', sponsor.id);
                      }}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={sponsor.isActive ? 'outline' : 'default'}
                      onClick={() => toggleSponsorStatus(sponsor.id)}
                    >
                      {sponsor.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSponsor(sponsor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Sponsor</DialogTitle>
                          <DialogDescription>
                            Update sponsor information
                          </DialogDescription>
                        </DialogHeader>
                        <SponsorForm sponsor={editingSponsor} onSubmit={handleUpdateSponsor} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteSponsor(sponsor.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSponsors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No sponsors found</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Sponsor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}