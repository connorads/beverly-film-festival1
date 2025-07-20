// Core type definitions for Beverly Hills Film Festival

export type SiteMode = 'festival' | 'admin' | 'filmmaker';

export type UserRole = 
  | 'admin'
  | 'festival_staff'
  | 'filmmaker'
  | 'attendee'
  | 'judge'
  | 'sponsor'
  | 'vendor';

export type FilmStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'accepted'
  | 'rejected'
  | 'scheduled'
  | 'screened';

export type TicketType = 
  | 'individual_screening'
  | 'day_pass'
  | 'festival_pass'
  | 'vip_pass'
  | 'industry_pass';

export type VenueType = 
  | 'theater'
  | 'screening_room'
  | 'outdoor'
  | 'virtual';

export type EventType = 
  | 'screening'
  | 'premiere'
  | 'panel'
  | 'workshop'
  | 'networking'
  | 'ceremony'
  | 'party';

export type SubmissionCategory = 
  | 'feature_narrative'
  | 'feature_documentary'
  | 'short_narrative'
  | 'short_documentary'
  | 'animation'
  | 'experimental'
  | 'student'
  | 'local_showcase';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type MediaType = 
  | 'film'
  | 'trailer'
  | 'poster'
  | 'still'
  | 'headshot'
  | 'logo'
  | 'document';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  password: string; // hashed
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  website?: string;
  socialMedia?: SocialMediaLinks;
  address?: Address;
  preferences?: UserPreferences;
}

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  imdb?: string;
  website?: string;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
  marketingEmails: boolean;
  language: string;
  timezone: string;
}

export interface Film extends BaseEntity {
  title: string;
  originalTitle?: string;
  synopsis: string;
  logline: string;
  runtime: number; // in minutes
  releaseYear: number;
  countryOfOrigin: string;
  language: string;
  subtitles?: string[];
  category: SubmissionCategory;
  status: FilmStatus;
  submitterId: string;
  directorId: string;
  producerIds: string[];
  castIds: string[];
  crewIds: string[];
  genres: string[];
  tags: string[];
  technicalSpecs: TechnicalSpecs;
  media: MediaFile[];
  awards?: Award[];
  screenings: Screening[];
  submissionFee: number;
  submissionDate: Date;
  reviewNotes?: string;
  programmersNotes?: string;
  isPremiere: boolean;
  premiereType?: 'world' | 'north_american' | 'us' | 'west_coast' | 'los_angeles';
}

export interface TechnicalSpecs {
  aspectRatio: string;
  soundFormat: string;
  colorFormat: string;
  shootingFormat: string;
  screeningFormat: string;
  resolution: string;
}

export interface MediaFile extends BaseEntity {
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  duration?: number; // for video files
  width?: number;
  height?: number;
  metadata?: Record<string, any>;
}

export interface Award {
  name: string;
  festival: string;
  year: number;
  category: string;
}

export interface Filmmaker extends BaseEntity {
  userId: string;
  companyName?: string;
  companyRole?: string;
  filmography: FilmographyEntry[];
  awards: Award[];
  festivalHistory: FestivalSubmission[];
  representation?: Representation;
  emergingTalent: boolean;
}

export interface FilmographyEntry {
  title: string;
  year: number;
  role: string;
  type: 'feature' | 'short' | 'series' | 'commercial';
}

export interface FestivalSubmission {
  festivalName: string;
  year: number;
  filmTitle: string;
  status: 'submitted' | 'accepted' | 'screened' | 'awarded';
  awards?: string[];
}

export interface Representation {
  agentName?: string;
  agentEmail?: string;
  agentPhone?: string;
  agencyName?: string;
  managerName?: string;
  managerEmail?: string;
  managerPhone?: string;
}

export interface Venue extends BaseEntity {
  name: string;
  type: VenueType;
  address: Address;
  capacity: number;
  amenities: string[];
  technicalCapabilities: string[];
  accessibilityFeatures: string[];
  parkingInfo?: string;
  publicTransport?: string;
  images: MediaFile[];
  mapUrl?: string;
  virtualUrl?: string; // for virtual venues
}

export interface Screening extends BaseEntity {
  filmId: string;
  venueId: string;
  startTime: Date;
  endTime: Date;
  eventType: EventType;
  ticketTypes: TicketTypeInfo[];
  totalCapacity: number;
  soldTickets: number;
  isPublic: boolean;
  requiresRsvp: boolean;
  guestList?: GuestListEntry[];
  qAndA: boolean;
  qAndAParticipants?: string[];
  specialNotes?: string;
}

export interface TicketTypeInfo {
  type: TicketType;
  price: number;
  availableQuantity: number;
  soldQuantity: number;
  description?: string;
}

export interface GuestListEntry {
  name: string;
  email: string;
  plusOne: boolean;
  checkedIn: boolean;
  checkInTime?: Date;
}

export interface Ticket extends BaseEntity {
  userId: string;
  screeningId?: string;
  passId?: string;
  type: TicketType;
  price: number;
  purchaseDate: Date;
  paymentId: string;
  status: 'active' | 'used' | 'cancelled' | 'refunded';
  qrCode: string;
  checkInTime?: Date;
  seatNumber?: string;
}

export interface Pass extends BaseEntity {
  name: string;
  type: TicketType;
  price: number;
  description: string;
  benefits: string[];
  validFrom: Date;
  validUntil: Date;
  totalQuantity: number;
  soldQuantity: number;
  restrictions?: string[];
  includedEvents: string[]; // event IDs
  excludedEvents: string[]; // event IDs
}

export interface FilmBlock extends BaseEntity {
  name: string;
  description: string;
  filmIds: string[];
  venueId: string;
  startTime: Date;
  endTime: Date;
  theme?: string;
  curator?: string;
  sponsorId?: string;
}

export interface Payment extends BaseEntity {
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash' | 'comp';
  transactionId?: string;
  receiptUrl?: string;
  refundAmount?: number;
  refundReason?: string;
  metadata?: Record<string, any>;
}

export interface Review extends BaseEntity {
  filmId: string;
  reviewerId: string;
  rating: number; // 1-10
  technicalRating: number; // 1-10
  artisticRating: number; // 1-10
  commercialViability: number; // 1-10
  audienceAppeal: number; // 1-10
  comments: string;
  recommendation: 'accept' | 'maybe' | 'reject';
  tags: string[];
  isComplete: boolean;
}

export interface Judge extends BaseEntity {
  userId: string;
  categories: SubmissionCategory[];
  bio: string;
  credentials: string[];
  yearsOfExperience: number;
  assignedFilms: string[];
  completedReviews: string[];
  conflictOfInterest: string[]; // film IDs
}

export interface Sponsor extends BaseEntity {
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  sponsorshipLevel: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  amount: number;
  benefits: string[];
  logo: MediaFile;
  website?: string;
  description?: string;
  activationRequests?: string[];
}

export interface Event extends BaseEntity {
  name: string;
  type: EventType;
  description: string;
  venueId: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
  ticketTypes: TicketTypeInfo[];
  hosts?: string[];
  speakers?: string[];
  sponsors?: string[];
  media: MediaFile[];
  requiresRsvp: boolean;
  rsvpList?: GuestListEntry[];
  isPrivate: boolean;
  inviteOnly: boolean;
  dressCode?: string;
  cateringInfo?: string;
}

export interface Festival extends BaseEntity {
  name: string;
  year: number;
  startDate: Date;
  endDate: Date;
  theme?: string;
  description: string;
  venues: string[]; // venue IDs
  sponsors: string[]; // sponsor IDs
  judges: string[]; // judge IDs
  films: string[]; // film IDs
  events: string[]; // event IDs
  passes: string[]; // pass IDs
  staff: string[]; // user IDs
  budget?: number;
  attendanceGoal?: number;
  actualAttendance?: number;
  pressReleases: MediaFile[];
  mediaPartners: string[];
}

export interface AuthSession extends BaseEntity {
  userId: string;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  siteMode: SiteMode;
}

export interface ApiKey extends BaseEntity {
  name: string;
  key: string; // hashed
  userId: string;
  permissions: string[];
  rateLimit: number;
  lastUsed?: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface AuditLog extends BaseEntity {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  siteMode: SiteMode;
}