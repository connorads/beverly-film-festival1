'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Film, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Eye,
  Edit,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface FilmSubmission {
  id: string;
  title: string;
  category: string;
  submissionDate: string;
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected';
  reviewNotes?: string;
  screeningDate?: string;
  venue?: string;
}

export default function SubmitterDashboardPage() {
  const [submissions, setSubmissions] = useState<FilmSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/submitter/films', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Mock data for demonstration
        const mockSubmissions: FilmSubmission[] = [
          {
            id: '1',
            title: 'Dreams of Tomorrow',
            category: 'Feature',
            submissionDate: '2024-03-01',
            status: 'approved',
            screeningDate: '2024-04-15',
            venue: 'Beverly Theater',
          },
          {
            id: '2',
            title: 'Silent Echoes',
            category: 'Short',
            submissionDate: '2024-03-10',
            status: 'in_review',
          },
          {
            id: '3',
            title: 'Urban Stories',
            category: 'Documentary',
            submissionDate: '2024-03-15',
            status: 'draft',
          },
        ];
        setSubmissions(mockSubmissions);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'submitted':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'in_review':
        return 'secondary';
      case 'submitted':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const stats = {
    total: submissions.length,
    approved: submissions.filter(s => s.status === 'approved').length,
    inReview: submissions.filter(s => s.status === 'in_review' || s.status === 'submitted').length,
    drafts: submissions.filter(s => s.status === 'draft').length,
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Filmmaker Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your film submissions
          </p>
        </div>
        <Link href="/submitter/submit">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Submit New Film
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.drafts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>My Film Submissions</CardTitle>
          <CardDescription>Track the status of your submitted films</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Films</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="review">In Review</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            {['all', 'approved', 'review', 'drafts'].map(tab => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {submissions
                  .filter(submission => {
                    if (tab === 'all') return true;
                    if (tab === 'approved') return submission.status === 'approved';
                    if (tab === 'review') return submission.status === 'in_review' || submission.status === 'submitted';
                    if (tab === 'drafts') return submission.status === 'draft';
                    return false;
                  })
                  .map(submission => (
                    <Card key={submission.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(submission.status)}
                              <h3 className="text-lg font-semibold">{submission.title}</h3>
                              <Badge variant={getStatusBadgeVariant(submission.status)}>
                                {submission.status.replace('_', ' ')}
                              </Badge>
                              <Badge variant="outline">{submission.category}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>Submitted: {new Date(submission.submissionDate).toLocaleDateString()}</p>
                              {submission.status === 'approved' && submission.screeningDate && (
                                <p className="mt-1 text-green-600">
                                  Screening: {new Date(submission.screeningDate).toLocaleDateString()} at {submission.venue}
                                </p>
                              )}
                              {submission.reviewNotes && (
                                <p className="mt-2 italic">{submission.reviewNotes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {submission.status === 'draft' && (
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {submissions.filter(submission => {
                  if (tab === 'all') return true;
                  if (tab === 'approved') return submission.status === 'approved';
                  if (tab === 'review') return submission.status === 'in_review' || submission.status === 'submitted';
                  if (tab === 'drafts') return submission.status === 'draft';
                  return false;
                }).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No films found in this category</p>
                    {tab === 'all' && (
                      <Link href="/submitter/submit">
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Submit Your First Film
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Important Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Important Dates</CardTitle>
          <CardDescription>Key deadlines for the festival</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Early Bird Submission Deadline</p>
                <p className="text-sm text-muted-foreground">Save 25% on submission fees</p>
              </div>
              <p className="text-sm font-medium">March 31, 2024</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Regular Submission Deadline</p>
                <p className="text-sm text-muted-foreground">Standard submission fees apply</p>
              </div>
              <p className="text-sm font-medium">April 30, 2024</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Festival Dates</p>
                <p className="text-sm text-muted-foreground">Beverly Hills Film Festival 2024</p>
              </div>
              <p className="text-sm font-medium">June 15-20, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}