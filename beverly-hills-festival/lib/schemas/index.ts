import { z } from 'zod';
import type * as Types from '../types';

// Enum schemas
export const SiteModeSchema = z.enum(['festival', 'admin', 'filmmaker']);

export const UserRoleSchema = z.enum([
  'admin',
  'festival_staff',
  'filmmaker',
  'attendee',
  'judge',
  'sponsor',
  'vendor'
]);

export const FilmStatusSchema = z.enum([
  'draft',
  'submitted',
  'under_review',
  'accepted',
  'rejected',
  'scheduled',
  'screened'
]);

export const TicketTypeSchema = z.enum([
  'individual_screening',
  'day_pass',
  'festival_pass',
  'vip_pass',
  'industry_pass'
]);

export const VenueTypeSchema = z.enum([
  'theater',
  'screening_room',
  'outdoor',
  'virtual'
]);

export const EventTypeSchema = z.enum([
  'screening',
  'premiere',
  'panel',
  'workshop',
  'networking',
  'ceremony',
  'party'
]);

export const SubmissionCategorySchema = z.enum([
  'feature_narrative',
  'feature_documentary',
  'short_narrative',
  'short_documentary',
  'animation',
  'experimental',
  'student',
  'local_showcase'
]);

export const PaymentStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'refunded',
  'partially_refunded'
]);

export const MediaTypeSchema = z.enum([
  'film',
  'trailer',
  'poster',
  'still',
  'headshot',
  'logo',
  'document'
]);

// Base schemas
export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const SocialMediaLinksSchema = z.object({
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  imdb: z.string().url().optional(),
  website: z.string().url().optional()
});

export const AddressSchema = z.object({
  street1: z.string().min(1),
  street2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  country: z.string().min(2).max(2)
});

export const UserPreferencesSchema = z.object({
  newsletter: z.boolean(),
  notifications: z.boolean(),
  marketingEmails: z.boolean(),
  language: z.string().default('en'),
  timezone: z.string().default('America/Los_Angeles')
});

// User schema
export const UserSchema = BaseEntitySchema.extend({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: UserRoleSchema,
  isActive: z.boolean().default(true),
  emailVerified: z.boolean().default(false),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
  profileImage: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional(),
  socialMedia: SocialMediaLinksSchema.optional(),
  address: AddressSchema.optional(),
  preferences: UserPreferencesSchema.optional()
});

export const CreateUserSchema = UserSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateUserSchema = CreateUserSchema.partial();

// Technical specs schema
export const TechnicalSpecsSchema = z.object({
  aspectRatio: z.string(),
  soundFormat: z.string(),
  colorFormat: z.string(),
  shootingFormat: z.string(),
  screeningFormat: z.string(),
  resolution: z.string()
});

// Media file schema
export const MediaFileSchema = BaseEntitySchema.extend({
  type: MediaTypeSchema,
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  fileName: z.string(),
  fileSize: z.number().positive(),
  mimeType: z.string(),
  duration: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  metadata: z.record(z.any()).optional()
});

// Award schema
export const AwardSchema = z.object({
  name: z.string(),
  festival: z.string(),
  year: z.number().min(1900, 'Year must be 1900 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  category: z.string()
});

// Film schema
export const FilmSchema = BaseEntitySchema.extend({
  title: z.string().min(1),
  originalTitle: z.string().optional(),
  synopsis: z.string().min(50).max(2000),
  logline: z.string().min(20).max(200),
  runtime: z.number().min(1).max(600),
  releaseYear: z.number().min(1900, 'Year must be 1900 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  countryOfOrigin: z.string().min(2).max(2),
  language: z.string().min(2).max(5),
  subtitles: z.array(z.string()).optional(),
  category: SubmissionCategorySchema,
  status: FilmStatusSchema,
  submitterId: z.string().uuid(),
  directorId: z.string().uuid(),
  producerIds: z.array(z.string().uuid()),
  castIds: z.array(z.string().uuid()),
  crewIds: z.array(z.string().uuid()),
  genres: z.array(z.string()),
  tags: z.array(z.string()),
  technicalSpecs: TechnicalSpecsSchema,
  media: z.array(MediaFileSchema),
  awards: z.array(AwardSchema).optional(),
  screenings: z.array(z.string().uuid()), // Screening IDs
  submissionFee: z.number().min(0),
  submissionDate: z.date(),
  reviewNotes: z.string().optional(),
  programmersNotes: z.string().optional(),
  isPremiere: z.boolean(),
  premiereType: z.enum(['world', 'north_american', 'us', 'west_coast', 'los_angeles']).optional()
});

export const CreateFilmSchema = FilmSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  screenings: true 
});

export const UpdateFilmSchema = CreateFilmSchema.partial();

// Venue schema
export const VenueSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  type: VenueTypeSchema,
  address: AddressSchema,
  capacity: z.number().positive(),
  amenities: z.array(z.string()),
  technicalCapabilities: z.array(z.string()),
  accessibilityFeatures: z.array(z.string()),
  parkingInfo: z.string().optional(),
  publicTransport: z.string().optional(),
  images: z.array(MediaFileSchema),
  mapUrl: z.string().url().optional(),
  virtualUrl: z.string().url().optional()
});

export const CreateVenueSchema = VenueSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Ticket type info schema
export const TicketTypeInfoSchema = z.object({
  type: TicketTypeSchema,
  price: z.number().min(0),
  availableQuantity: z.number().min(0),
  soldQuantity: z.number().min(0),
  description: z.string().optional()
});

// Guest list entry schema
export const GuestListEntrySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  plusOne: z.boolean(),
  checkedIn: z.boolean(),
  checkInTime: z.date().optional()
});

// Screening schema
export const ScreeningSchema = BaseEntitySchema.extend({
  filmId: z.string().uuid(),
  venueId: z.string().uuid(),
  startTime: z.date(),
  endTime: z.date(),
  eventType: EventTypeSchema,
  ticketTypes: z.array(TicketTypeInfoSchema),
  totalCapacity: z.number().positive(),
  soldTickets: z.number().min(0),
  isPublic: z.boolean(),
  requiresRsvp: z.boolean(),
  guestList: z.array(GuestListEntrySchema).optional(),
  qAndA: z.boolean(),
  qAndAParticipants: z.array(z.string()).optional(),
  specialNotes: z.string().optional()
});

export const CreateScreeningSchema = ScreeningSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  soldTickets: true 
});

// Ticket schema
export const TicketSchema = BaseEntitySchema.extend({
  userId: z.string().uuid(),
  screeningId: z.string().uuid().optional(),
  passId: z.string().uuid().optional(),
  type: TicketTypeSchema,
  price: z.number().min(0),
  purchaseDate: z.date(),
  paymentId: z.string().uuid(),
  status: z.enum(['active', 'used', 'cancelled', 'refunded']),
  qrCode: z.string(),
  checkInTime: z.date().optional(),
  seatNumber: z.string().optional()
});

export const CreateTicketSchema = TicketSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  qrCode: true 
});

// Pass schema
export const PassSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  type: TicketTypeSchema,
  price: z.number().min(0),
  description: z.string(),
  benefits: z.array(z.string()),
  validFrom: z.date(),
  validUntil: z.date(),
  totalQuantity: z.number().positive(),
  soldQuantity: z.number().min(0),
  restrictions: z.array(z.string()).optional(),
  includedEvents: z.array(z.string().uuid()),
  excludedEvents: z.array(z.string().uuid())
});

export const CreatePassSchema = PassSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  soldQuantity: true 
});

// Payment schema
export const PaymentSchema = BaseEntitySchema.extend({
  userId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  status: PaymentStatusSchema,
  method: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash', 'comp']),
  transactionId: z.string().optional(),
  receiptUrl: z.string().url().optional(),
  refundAmount: z.number().min(0).optional(),
  refundReason: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const CreatePaymentSchema = PaymentSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Review schema
export const ReviewSchema = BaseEntitySchema.extend({
  filmId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  rating: z.number().min(1).max(10),
  technicalRating: z.number().min(1).max(10),
  artisticRating: z.number().min(1).max(10),
  commercialViability: z.number().min(1).max(10),
  audienceAppeal: z.number().min(1).max(10),
  comments: z.string().min(50),
  recommendation: z.enum(['accept', 'maybe', 'reject']),
  tags: z.array(z.string()),
  isComplete: z.boolean()
});

export const CreateReviewSchema = ReviewSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Auth session schema
export const AuthSessionSchema = BaseEntitySchema.extend({
  userId: z.string().uuid(),
  token: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.date(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  siteMode: SiteModeSchema
});

export const CreateAuthSessionSchema = AuthSessionSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// API key schema
export const ApiKeySchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  key: z.string(),
  userId: z.string().uuid(),
  permissions: z.array(z.string()),
  rateLimit: z.number().positive(),
  lastUsed: z.date().optional(),
  expiresAt: z.date().optional(),
  isActive: z.boolean()
});

export const CreateApiKeySchema = ApiKeySchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  lastUsed: true 
});

// Login schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  siteMode: SiteModeSchema
});

// Register schema
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number and special character'
  ),
  confirmPassword: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: UserRoleSchema.optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Password reset schema
export const PasswordResetRequestSchema = z.object({
  email: z.string().email()
});

export const PasswordResetSchema = z.object({
  token: z.string(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number and special character'
  ),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Film submission schema
export const FilmSubmissionSchema = z.object({
  // Basic info
  title: z.string().min(1),
  originalTitle: z.string().optional(),
  synopsis: z.string().min(50).max(2000),
  logline: z.string().min(20).max(200),
  runtime: z.number().min(1).max(600),
  releaseYear: z.number().min(1900, 'Year must be 1900 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  
  // Production info
  countryOfOrigin: z.string().min(2).max(2),
  language: z.string().min(2).max(5),
  subtitles: z.array(z.string()).optional(),
  category: SubmissionCategorySchema,
  
  // People
  directorName: z.string().min(1),
  directorEmail: z.string().email(),
  producerName: z.string().min(1),
  producerEmail: z.string().email(),
  
  // Technical
  technicalSpecs: TechnicalSpecsSchema,
  
  // Additional
  genres: z.array(z.string()).min(1).max(3),
  isPremiere: z.boolean(),
  premiereType: z.enum(['world', 'north_american', 'us', 'west_coast', 'los_angeles']).optional(),
  
  // Media
  trailerUrl: z.string().url().optional(),
  posterUrl: z.string().url().optional(),
  
  // Agreement
  agreesToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

// Search/filter schemas
export const FilmSearchSchema = z.object({
  query: z.string().optional(),
  category: SubmissionCategorySchema.optional(),
  status: FilmStatusSchema.optional(),
  year: z.number().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  genre: z.string().optional(),
  minRuntime: z.number().optional(),
  maxRuntime: z.number().optional(),
  isPremiere: z.boolean().optional(),
  page: z.number().default(1),
  limit: z.number().default(20)
});

export const EventSearchSchema = z.object({
  type: EventTypeSchema.optional(),
  venueId: z.string().uuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isPublic: z.boolean().optional(),
  hasTicketsAvailable: z.boolean().optional(),
  page: z.number().default(1),
  limit: z.number().default(20)
});

// Type exports
export type SiteMode = z.infer<typeof SiteModeSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type FilmStatus = z.infer<typeof FilmStatusSchema>;
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Film = z.infer<typeof FilmSchema>;
export type CreateFilm = z.infer<typeof CreateFilmSchema>;
export type UpdateFilm = z.infer<typeof UpdateFilmSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type FilmSubmission = z.infer<typeof FilmSubmissionSchema>;
export type FilmSearch = z.infer<typeof FilmSearchSchema>;
export type EventSearch = z.infer<typeof EventSearchSchema>;