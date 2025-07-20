'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, Info } from 'lucide-react';

const submissionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  director: z.string().min(1, 'Director name is required'),
  producer: z.string().optional(),
  synopsis: z.string().min(50, 'Synopsis must be at least 50 characters'),
  country: z.string().min(1, 'Country is required'),
  year: z.number().min(2020, 'Year must be 2020 or later'),
  language: z.string().min(1, 'Language is required'),
  subtitles: z.boolean(),
  subtitleLanguage: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  imdbLink: z.string().url().optional().or(z.literal('')),
  agreeTOS: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

const categories = [
  'Feature Film',
  'Short Film',
  'Documentary Feature',
  'Documentary Short',
  'Animation',
  'Student Film',
  'Web Series',
];

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Japanese',
  'Korean',
  'Mandarin',
  'Portuguese',
  'Russian',
  'Other',
];

export default function SubmitterSubmitPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubtitles, setHasSubtitles] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      subtitles: false,
    },
  });

  const watchCategory = watch('category');

  const onSubmit = async (data: SubmissionFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/submitter/films', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      router.push('/submitter/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit Your Film</h1>
        <p className="text-muted-foreground">
          Submit your film for consideration in the Beverly Hills Film Festival
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Please ensure your film meets our submission guidelines before proceeding.
          All films must be completed after January 1, 2020.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Film Information</CardTitle>
          <CardDescription>
            Provide details about your film submission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {/* Film Details */}
              <div>
                <Label htmlFor="title">Film Title *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    onValueChange={(value) => setValue('category', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    {...register('duration', { valueAsNumber: true })}
                    disabled={isLoading}
                  />
                  {errors.duration && (
                    <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="director">Director *</Label>
                  <Input
                    id="director"
                    {...register('director')}
                    disabled={isLoading}
                  />
                  {errors.director && (
                    <p className="text-sm text-red-500 mt-1">{errors.director.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="producer">Producer</Label>
                  <Input
                    id="producer"
                    {...register('producer')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="synopsis">Synopsis *</Label>
                <Textarea
                  id="synopsis"
                  rows={4}
                  placeholder="Provide a brief synopsis of your film (minimum 50 characters)"
                  {...register('synopsis')}
                  disabled={isLoading}
                />
                {errors.synopsis && (
                  <p className="text-sm text-red-500 mt-1">{errors.synopsis.message}</p>
                )}
              </div>

              {/* Production Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country of Production *</Label>
                  <Input
                    id="country"
                    {...register('country')}
                    disabled={isLoading}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="year">Year of Completion *</Label>
                  <Input
                    id="year"
                    type="number"
                    {...register('year', { valueAsNumber: true })}
                    disabled={isLoading}
                  />
                  {errors.year && (
                    <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Primary Language *</Label>
                  <Select 
                    onValueChange={(value) => setValue('language', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(language => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.language && (
                    <p className="text-sm text-red-500 mt-1">{errors.language.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subtitles">Subtitles</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="subtitles"
                        checked={hasSubtitles}
                        onCheckedChange={(checked) => {
                          setHasSubtitles(checked as boolean);
                          setValue('subtitles', checked as boolean);
                        }}
                        disabled={isLoading}
                      />
                      <label
                        htmlFor="subtitles"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Film has subtitles
                      </label>
                    </div>
                    {hasSubtitles && (
                      <Input
                        placeholder="Subtitle language"
                        {...register('subtitleLanguage')}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Film Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    {...register('website')}
                    disabled={isLoading}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="imdbLink">IMDB Link</Label>
                  <Input
                    id="imdbLink"
                    type="url"
                    placeholder="https://imdb.com/title/..."
                    {...register('imdbLink')}
                    disabled={isLoading}
                  />
                  {errors.imdbLink && (
                    <p className="text-sm text-red-500 mt-1">{errors.imdbLink.message}</p>
                  )}
                </div>
              </div>

              {/* File Upload Section */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Film File</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Button type="button" variant="outline" disabled={isLoading}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Film
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Max file size: 5GB. Accepted formats: MP4, MOV, AVI
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label>Additional Materials</Label>
                      <div className="mt-2 space-y-2">
                        <Button type="button" variant="outline" size="sm" disabled={isLoading}>
                          Upload Poster
                        </Button>
                        <Button type="button" variant="outline" size="sm" disabled={isLoading}>
                          Upload Trailer
                        </Button>
                        <Button type="button" variant="outline" size="sm" disabled={isLoading}>
                          Upload Press Kit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTOS"
                    {...register('agreeTOS')}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="agreeTOS"
                    className="text-sm leading-relaxed"
                  >
                    I agree to the terms and conditions of the Beverly Hills Film Festival.
                    I confirm that I have the rights to submit this film and that all
                    information provided is accurate.
                  </label>
                </div>
                {errors.agreeTOS && (
                  <p className="text-sm text-red-500">{errors.agreeTOS.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/submitter/dashboard')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Film'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}