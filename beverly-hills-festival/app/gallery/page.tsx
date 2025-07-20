'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Camera, Film, Users, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Mock gallery data - in production, this would come from an API
const galleryData = {
  redCarpet: [
    { id: 1, src: '/api/placeholder/600/400', alt: 'Opening night red carpet arrivals', caption: 'Stars arrive at the opening gala' },
    { id: 2, src: '/api/placeholder/600/400', alt: 'Celebrity guests posing', caption: 'Celebrity guests at the step and repeat' },
    { id: 3, src: '/api/placeholder/600/400', alt: 'Media interviews', caption: 'Press interviews on the red carpet' },
    { id: 4, src: '/api/placeholder/600/400', alt: 'Fashion highlights', caption: 'Stunning fashion at the gala' },
    { id: 5, src: '/api/placeholder/600/400', alt: 'VIP reception', caption: 'VIP cocktail reception' },
    { id: 6, src: '/api/placeholder/600/400', alt: 'Festival directors', caption: 'Festival directors welcome guests' }
  ],
  screenings: [
    { id: 7, src: '/api/placeholder/600/400', alt: 'Packed theater', caption: 'Full house for premiere screening' },
    { id: 8, src: '/api/placeholder/600/400', alt: 'Q&A session', caption: 'Director Q&A after screening' },
    { id: 9, src: '/api/placeholder/600/400', alt: 'Audience reactions', caption: 'Engaged audience during screening' },
    { id: 10, src: '/api/placeholder/600/400', alt: 'Film introduction', caption: 'Filmmaker introducing their work' },
    { id: 11, src: '/api/placeholder/600/400', alt: 'Standing ovation', caption: 'Standing ovation for winning film' },
    { id: 12, src: '/api/placeholder/600/400', alt: 'Theater lobby', caption: 'Networking in the theater lobby' }
  ],
  events: [
    { id: 13, src: '/api/placeholder/600/400', alt: 'Industry panel', caption: 'Industry panel on future of cinema' },
    { id: 14, src: '/api/placeholder/600/400', alt: 'Networking mixer', caption: 'Filmmaker networking event' },
    { id: 15, src: '/api/placeholder/600/400', alt: 'Workshop session', caption: 'Masterclass with award-winning director' },
    { id: 16, src: '/api/placeholder/600/400', alt: 'Awards ceremony', caption: 'Awards ceremony highlights' },
    { id: 17, src: '/api/placeholder/600/400', alt: 'Closing party', caption: 'Celebration at the closing party' },
    { id: 18, src: '/api/placeholder/600/400', alt: 'Sponsor showcase', caption: 'Sponsor activation area' }
  ],
  behindScenes: [
    { id: 19, src: '/api/placeholder/600/400', alt: 'Volunteer team', caption: 'Our amazing volunteer team' },
    { id: 20, src: '/api/placeholder/600/400', alt: 'Setup crew', caption: 'Setting up the festival venues' },
    { id: 21, src: '/api/placeholder/600/400', alt: 'Tech team', caption: 'Technical crew preparing screenings' },
    { id: 22, src: '/api/placeholder/600/400', alt: 'Press room', caption: 'Media center in action' },
    { id: 23, src: '/api/placeholder/600/400', alt: 'Green room', caption: 'Filmmakers in the green room' },
    { id: 24, src: '/api/placeholder/600/400', alt: 'Festival staff', caption: 'Festival organizers at work' }
  ]
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('red-carpet')

  const allImages = [
    ...galleryData.redCarpet,
    ...galleryData.screenings,
    ...galleryData.events,
    ...galleryData.behindScenes
  ]

  const currentIndex = selectedImage ? allImages.findIndex(img => img.id === selectedImage.id) : -1

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(allImages[currentIndex - 1])
    }
  }

  const handleNext = () => {
    if (currentIndex < allImages.length - 1) {
      setSelectedImage(allImages[currentIndex + 1])
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Camera className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Festival Gallery
          </h1>
          <p className="text-xl text-muted-foreground">
            Relive the magic of Beverly Hills Film Festival 2024
          </p>
        </div>

        {/* Gallery Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="red-carpet" className="text-xs sm:text-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Red Carpet</span>
              <span className="sm:hidden">Gala</span>
            </TabsTrigger>
            <TabsTrigger value="screenings" className="text-xs sm:text-sm">
              <Film className="mr-2 h-4 w-4" />
              Screenings
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs sm:text-sm">
              <Users className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="behind-scenes" className="text-xs sm:text-sm">
              <Camera className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Behind Scenes</span>
              <span className="sm:hidden">BTS</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="red-carpet" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryData.redCarpet.map((image) => (
                <Card
                  key={image.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="absolute bottom-2 left-2 right-2 text-sm text-white">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="screenings" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryData.screenings.map((image) => (
                <Card
                  key={image.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="absolute bottom-2 left-2 right-2 text-sm text-white">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryData.events.map((image) => (
                <Card
                  key={image.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="absolute bottom-2 left-2 right-2 text-sm text-white">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behind-scenes" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryData.behindScenes.map((image) => (
                <Card
                  key={image.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="absolute bottom-2 left-2 right-2 text-sm text-white">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-50"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              disabled={currentIndex === allImages.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="h-auto w-auto max-h-[80vh] object-contain"
              />
              <p className="mt-4 text-center text-white">{selectedImage.caption}</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 rounded-lg bg-muted p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">Share Your Festival Moments</h3>
          <p className="mb-4 text-muted-foreground">
            Tag us @BHFilmFest on social media to be featured in our gallery
          </p>
          <Button asChild>
            <a href="/recap">View Festival Recap</a>
          </Button>
        </div>
      </div>
    </div>
  )
}