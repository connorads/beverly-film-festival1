-- Beverly Hills Film Festival Database Schema
-- PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE site_mode AS ENUM ('festival', 'admin', 'filmmaker');
CREATE TYPE user_role AS ENUM ('admin', 'festival_staff', 'filmmaker', 'attendee', 'judge', 'sponsor', 'vendor');
CREATE TYPE film_status AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'scheduled', 'screened');
CREATE TYPE ticket_type AS ENUM ('individual_screening', 'day_pass', 'festival_pass', 'vip_pass', 'industry_pass');
CREATE TYPE venue_type AS ENUM ('theater', 'screening_room', 'outdoor', 'virtual');
CREATE TYPE event_type AS ENUM ('screening', 'premiere', 'panel', 'workshop', 'networking', 'ceremony', 'party');
CREATE TYPE submission_category AS ENUM ('feature_narrative', 'feature_documentary', 'short_narrative', 'short_documentary', 'animation', 'experimental', 'student', 'local_showcase');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded');
CREATE TYPE media_type AS ENUM ('film', 'trailer', 'poster', 'still', 'headshot', 'logo', 'document');
CREATE TYPE premiere_type AS ENUM ('world', 'north_american', 'us', 'west_coast', 'los_angeles');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'attendee',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    phone_number VARCHAR(50),
    profile_image TEXT,
    bio TEXT,
    website TEXT,
    social_media JSONB,
    address JSONB,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Filmmakers table (extends users)
CREATE TABLE filmmakers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    company_role VARCHAR(100),
    filmography JSONB,
    awards JSONB,
    festival_history JSONB,
    representation JSONB,
    emerging_talent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_filmmakers_user_id ON filmmakers(user_id);

-- Venues table
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type venue_type NOT NULL,
    address JSONB NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    amenities TEXT[],
    technical_capabilities TEXT[],
    accessibility_features TEXT[],
    parking_info TEXT,
    public_transport TEXT,
    map_url TEXT,
    virtual_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_venues_type ON venues(type);

-- Films table
CREATE TABLE films (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    synopsis TEXT NOT NULL,
    logline TEXT NOT NULL,
    runtime INTEGER NOT NULL CHECK (runtime > 0 AND runtime <= 600),
    release_year INTEGER NOT NULL,
    country_of_origin CHAR(2) NOT NULL,
    language VARCHAR(5) NOT NULL,
    subtitles TEXT[],
    category submission_category NOT NULL,
    status film_status NOT NULL DEFAULT 'draft',
    submitter_id UUID NOT NULL REFERENCES users(id),
    director_id UUID NOT NULL REFERENCES users(id),
    genres TEXT[],
    tags TEXT[],
    technical_specs JSONB NOT NULL,
    awards JSONB,
    submission_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    submission_date TIMESTAMP WITH TIME ZONE,
    review_notes TEXT,
    programmers_notes TEXT,
    is_premiere BOOLEAN DEFAULT false,
    premiere_type premiere_type,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_films_status ON films(status);
CREATE INDEX idx_films_category ON films(category);
CREATE INDEX idx_films_submitter ON films(submitter_id);
CREATE INDEX idx_films_director ON films(director_id);

-- Film crew table (many-to-many)
CREATE TABLE film_crew (
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(100) NOT NULL,
    credit_order INTEGER,
    PRIMARY KEY (film_id, user_id, role)
);

-- Media files table
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- 'film', 'venue', 'event', etc.
    entity_id UUID NOT NULL,
    type media_type NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    duration INTEGER, -- for video files, in seconds
    width INTEGER,
    height INTEGER,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_files_entity ON media_files(entity_type, entity_id);
CREATE INDEX idx_media_files_type ON media_files(type);

-- Screenings table
CREATE TABLE screenings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    film_id UUID NOT NULL REFERENCES films(id),
    venue_id UUID NOT NULL REFERENCES venues(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type event_type NOT NULL DEFAULT 'screening',
    ticket_types JSONB NOT NULL, -- Array of ticket type info
    total_capacity INTEGER NOT NULL,
    sold_tickets INTEGER NOT NULL DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    requires_rsvp BOOLEAN DEFAULT false,
    guest_list JSONB,
    q_and_a BOOLEAN DEFAULT false,
    q_and_a_participants TEXT[],
    special_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_capacity CHECK (sold_tickets <= total_capacity),
    CONSTRAINT check_time CHECK (end_time > start_time)
);

CREATE INDEX idx_screenings_film ON screenings(film_id);
CREATE INDEX idx_screenings_venue ON screenings(venue_id);
CREATE INDEX idx_screenings_time ON screenings(start_time, end_time);

-- Film blocks table
CREATE TABLE film_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    venue_id UUID NOT NULL REFERENCES venues(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    theme VARCHAR(255),
    curator VARCHAR(255),
    sponsor_id UUID REFERENCES sponsors(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE film_block_films (
    block_id UUID NOT NULL REFERENCES film_blocks(id) ON DELETE CASCADE,
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    order_number INTEGER NOT NULL,
    PRIMARY KEY (block_id, film_id)
);

-- Passes table
CREATE TABLE passes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type ticket_type NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    benefits TEXT[],
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    total_quantity INTEGER NOT NULL,
    sold_quantity INTEGER NOT NULL DEFAULT 0,
    restrictions TEXT[],
    included_events UUID[],
    excluded_events UUID[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_pass_quantity CHECK (sold_quantity <= total_quantity),
    CONSTRAINT check_pass_validity CHECK (valid_until > valid_from)
);

-- Tickets table
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    screening_id UUID REFERENCES screenings(id),
    pass_id UUID REFERENCES passes(id),
    type ticket_type NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    qr_code TEXT NOT NULL UNIQUE,
    check_in_time TIMESTAMP WITH TIME ZONE,
    seat_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_ticket_type CHECK (
        (screening_id IS NOT NULL AND pass_id IS NULL) OR
        (screening_id IS NULL AND pass_id IS NOT NULL)
    )
);

CREATE INDEX idx_tickets_user ON tickets(user_id);
CREATE INDEX idx_tickets_screening ON tickets(screening_id);
CREATE INDEX idx_tickets_pass ON tickets(pass_id);
CREATE INDEX idx_tickets_qr ON tickets(qr_code);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    status payment_status NOT NULL DEFAULT 'pending',
    method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    receipt_url TEXT,
    refund_amount DECIMAL(10,2),
    refund_reason TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    film_id UUID NOT NULL REFERENCES films(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
    technical_rating INTEGER NOT NULL CHECK (technical_rating >= 1 AND technical_rating <= 10),
    artistic_rating INTEGER NOT NULL CHECK (artistic_rating >= 1 AND artistic_rating <= 10),
    commercial_viability INTEGER NOT NULL CHECK (commercial_viability >= 1 AND commercial_viability <= 10),
    audience_appeal INTEGER NOT NULL CHECK (audience_appeal >= 1 AND audience_appeal <= 10),
    comments TEXT NOT NULL,
    recommendation VARCHAR(20) NOT NULL,
    tags TEXT[],
    is_complete BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(film_id, reviewer_id)
);

CREATE INDEX idx_reviews_film ON reviews(film_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);

-- Judges table
CREATE TABLE judges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    categories submission_category[],
    bio TEXT NOT NULL,
    credentials TEXT[],
    years_of_experience INTEGER,
    conflict_of_interest UUID[], -- film IDs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE judge_assignments (
    judge_id UUID NOT NULL REFERENCES judges(id) ON DELETE CASCADE,
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (judge_id, film_id)
);

-- Sponsors table
CREATE TABLE sponsors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    sponsorship_level VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    benefits TEXT[],
    website TEXT,
    description TEXT,
    activation_requests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table (non-screening events)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type event_type NOT NULL,
    description TEXT,
    venue_id UUID NOT NULL REFERENCES venues(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INTEGER NOT NULL,
    ticket_types JSONB,
    hosts TEXT[],
    speakers TEXT[],
    sponsors UUID[],
    requires_rsvp BOOLEAN DEFAULT false,
    rsvp_list JSONB,
    is_private BOOLEAN DEFAULT false,
    invite_only BOOLEAN DEFAULT false,
    dress_code VARCHAR(100),
    catering_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_events_time ON events(start_time, end_time);
CREATE INDEX idx_events_type ON events(type);

-- Festival editions table
CREATE TABLE festivals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    theme VARCHAR(255),
    description TEXT,
    budget DECIMAL(12,2),
    attendance_goal INTEGER,
    actual_attendance INTEGER,
    media_partners TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(year)
);

-- Auth sessions table
CREATE TABLE auth_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    refresh_token TEXT UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    site_mode site_mode NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_sessions_user ON auth_sessions(user_id);
CREATE INDEX idx_auth_sessions_token ON auth_sessions(token);
CREATE INDEX idx_auth_sessions_expires ON auth_sessions(expires_at);

-- API keys table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    key_hash TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permissions TEXT[],
    rate_limit INTEGER NOT NULL DEFAULT 1000,
    last_used TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);

-- Audit log table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    site_mode site_mode,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- Create update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_filmmakers_updated_at BEFORE UPDATE ON filmmakers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_films_updated_at BEFORE UPDATE ON films FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON media_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_screenings_updated_at BEFORE UPDATE ON screenings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_film_blocks_updated_at BEFORE UPDATE ON film_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_passes_updated_at BEFORE UPDATE ON passes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_judges_updated_at BEFORE UPDATE ON judges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_festivals_updated_at BEFORE UPDATE ON festivals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_auth_sessions_updated_at BEFORE UPDATE ON auth_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();