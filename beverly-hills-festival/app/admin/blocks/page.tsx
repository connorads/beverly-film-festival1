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
import { Calendar, Clock, MapPin, Plus, Edit, Trash2 } from 'lucide-react';

interface FilmBlock {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  films: {
    id: string;
    title: string;
    duration: number;
  }[];
}

export default function AdminBlocksPage() {
  const [blocks, setBlocks] = useState<FilmBlock[]>([
    {
      id: '1',
      name: 'Opening Night Gala',
      description: 'Featuring the best of international cinema',
      date: '2024-04-15',
      startTime: '18:00',
      endTime: '23:00',
      venue: 'Beverly Theater',
      films: [
        { id: '1', title: 'The Last Sunset', duration: 120 },
        { id: '2', title: 'City Dreams', duration: 95 },
      ],
    },
    {
      id: '2',
      name: 'Documentary Showcase',
      description: 'Compelling stories from around the world',
      date: '2024-04-16',
      startTime: '14:00',
      endTime: '18:00',
      venue: 'Hollywood Plaza',
      films: [
        { id: '3', title: 'The Truth Unveiled', duration: 90 },
        { id: '4', title: 'Voices of Change', duration: 75 },
      ],
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<FilmBlock | null>(null);

  const venues = ['Beverly Theater', 'Hollywood Plaza', 'Sunset Cinema', 'Academy Hall'];

  const handleCreateBlock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBlock: FilmBlock = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      venue: formData.get('venue') as string,
      films: [],
    };
    setBlocks([...blocks, newBlock]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateBlock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBlock) return;
    
    const formData = new FormData(e.currentTarget);
    const updatedBlock: FilmBlock = {
      ...editingBlock,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      venue: formData.get('venue') as string,
    };
    
    setBlocks(blocks.map(block => 
      block.id === editingBlock.id ? updatedBlock : block
    ));
    setEditingBlock(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };

  const BlockForm = ({ block, onSubmit }: { block?: FilmBlock | null; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Block Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={block?.name}
          placeholder="e.g., Opening Night Gala"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={block?.description}
          placeholder="Brief description of the film block"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={block?.date}
            required
          />
        </div>
        <div>
          <Label htmlFor="venue">Venue</Label>
          <Select name="venue" defaultValue={block?.venue}>
            <SelectTrigger>
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              {venues.map(venue => (
                <SelectItem key={venue} value={venue}>{venue}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            name="startTime"
            type="time"
            defaultValue={block?.startTime}
            required
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            name="endTime"
            type="time"
            defaultValue={block?.endTime}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {block ? 'Update Block' : 'Create Block'}
      </Button>
    </form>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Film Blocks</h1>
          <p className="text-muted-foreground">
            Schedule and manage film screening blocks
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Block
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Film Block</DialogTitle>
              <DialogDescription>
                Schedule a new film screening block
              </DialogDescription>
            </DialogHeader>
            <BlockForm onSubmit={handleCreateBlock} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Blocks Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <Card key={block.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{block.name}</CardTitle>
                  <CardDescription>{block.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingBlock(block)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Film Block</DialogTitle>
                        <DialogDescription>
                          Update block details
                        </DialogDescription>
                      </DialogHeader>
                      <BlockForm block={editingBlock} onSubmit={handleUpdateBlock} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteBlock(block.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(block.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {block.startTime} - {block.endTime}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {block.venue}
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Films ({block.films.length})</p>
                  {block.films.length > 0 ? (
                    <ul className="space-y-1">
                      {block.films.map((film) => (
                        <li key={film.id} className="text-sm text-muted-foreground">
                          • {film.title} ({film.duration} min)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No films added yet</p>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => {
                      // Implement add films functionality
                      console.log('Add films to block:', block.id);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Films
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blocks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No film blocks created yet</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Block
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}