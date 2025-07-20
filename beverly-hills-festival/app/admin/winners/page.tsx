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
import { Trophy, Award, Star, Plus, Edit, Trash2 } from 'lucide-react';

interface Winner {
  id: string;
  year: number;
  category: string;
  filmTitle: string;
  recipient: string;
  recipientRole: string;
  citation?: string;
  isPublished: boolean;
}

const awardCategories = [
  'Best Film',
  'Best Director',
  'Best Actor',
  'Best Actress',
  'Best Screenplay',
  'Best Cinematography',
  'Best Documentary',
  'Best Short Film',
  'Best Student Film',
  'Audience Choice',
  'Jury Special Prize',
  'Lifetime Achievement',
];

export default function AdminWinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([
    {
      id: '1',
      year: 2024,
      category: 'Best Film',
      filmTitle: 'The Last Sunset',
      recipient: 'John Smith Productions',
      recipientRole: 'Production Company',
      citation: 'For exceptional storytelling and cinematic excellence',
      isPublished: true,
    },
    {
      id: '2',
      year: 2024,
      category: 'Best Director',
      filmTitle: 'City Dreams',
      recipient: 'Jane Doe',
      recipientRole: 'Director',
      citation: 'For visionary direction and artistic achievement',
      isPublished: false,
    },
    {
      id: '3',
      year: 2023,
      category: 'Best Documentary',
      filmTitle: 'Voices of Change',
      recipient: 'Documentary Studios',
      recipientRole: 'Production Company',
      citation: 'For compelling storytelling and social impact',
      isPublished: true,
    },
  ]);

  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);

  const years = Array.from({ length: 10 }, (_, i) => 2024 - i);

  const filteredWinners = winners.filter(
    winner => selectedYear === 'all' || winner.year.toString() === selectedYear
  );

  const handleCreateWinner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newWinner: Winner = {
      id: Date.now().toString(),
      year: parseInt(formData.get('year') as string),
      category: formData.get('category') as string,
      filmTitle: formData.get('filmTitle') as string,
      recipient: formData.get('recipient') as string,
      recipientRole: formData.get('recipientRole') as string,
      citation: formData.get('citation') as string,
      isPublished: false,
    };
    
    setWinners([...winners, newWinner]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateWinner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingWinner) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedWinner: Winner = {
      ...editingWinner,
      year: parseInt(formData.get('year') as string),
      category: formData.get('category') as string,
      filmTitle: formData.get('filmTitle') as string,
      recipient: formData.get('recipient') as string,
      recipientRole: formData.get('recipientRole') as string,
      citation: formData.get('citation') as string,
    };
    
    setWinners(winners.map(winner => 
      winner.id === editingWinner.id ? updatedWinner : winner
    ));
    setEditingWinner(null);
  };

  const handleDeleteWinner = (winnerId: string) => {
    setWinners(winners.filter(winner => winner.id !== winnerId));
  };

  const togglePublishStatus = (winnerId: string) => {
    setWinners(winners.map(winner =>
      winner.id === winnerId ? { ...winner, isPublished: !winner.isPublished } : winner
    ));
  };

  const WinnerForm = ({ winner, onSubmit }: { winner?: Winner | null; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Year</Label>
          <Select name="year" defaultValue={winner?.year.toString() || '2024'}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={winner?.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {awardCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="filmTitle">Film Title</Label>
        <Input
          id="filmTitle"
          name="filmTitle"
          defaultValue={winner?.filmTitle}
          placeholder="Title of the winning film"
          required
        />
      </div>
      <div>
        <Label htmlFor="recipient">Recipient Name</Label>
        <Input
          id="recipient"
          name="recipient"
          defaultValue={winner?.recipient}
          placeholder="Name of the award recipient"
          required
        />
      </div>
      <div>
        <Label htmlFor="recipientRole">Recipient Role</Label>
        <Input
          id="recipientRole"
          name="recipientRole"
          defaultValue={winner?.recipientRole}
          placeholder="e.g., Director, Producer, Actor"
          required
        />
      </div>
      <div>
        <Label htmlFor="citation">Citation (optional)</Label>
        <Textarea
          id="citation"
          name="citation"
          defaultValue={winner?.citation}
          placeholder="Award citation or reason for winning"
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full">
        {winner ? 'Update Winner' : 'Add Winner'}
      </Button>
    </form>
  );

  const getCategoryIcon = (category: string) => {
    if (category.includes('Best Film')) return Trophy;
    if (category.includes('Lifetime')) return Star;
    return Award;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Award Winners</h1>
          <p className="text-muted-foreground">
            Manage festival award winners and citations
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Winner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Award Winner</DialogTitle>
              <DialogDescription>
                Record a new festival award winner
              </DialogDescription>
            </DialogHeader>
            <WinnerForm onSubmit={handleCreateWinner} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Year Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Year</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Winners Grid */}
      <div className="grid gap-4">
        {filteredWinners.map((winner) => {
          const Icon = getCategoryIcon(winner.category);
          return (
            <Card key={winner.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold">{winner.category}</h3>
                      <Badge variant="outline">{winner.year}</Badge>
                      <Badge variant={winner.isPublished ? 'default' : 'secondary'}>
                        {winner.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{winner.filmTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        {winner.recipient} • {winner.recipientRole}
                      </p>
                      {winner.citation && (
                        <p className="text-sm italic text-muted-foreground mt-2">
                          "{winner.citation}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={winner.isPublished ? 'outline' : 'default'}
                      onClick={() => togglePublishStatus(winner.id)}
                    >
                      {winner.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingWinner(winner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Winner</DialogTitle>
                          <DialogDescription>
                            Update award winner information
                          </DialogDescription>
                        </DialogHeader>
                        <WinnerForm winner={editingWinner} onSubmit={handleUpdateWinner} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteWinner(winner.id)}
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

      {filteredWinners.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No winners for the selected year</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Winner
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}