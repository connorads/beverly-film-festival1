export const testUsers = {
  admin: {
    email: 'admin@beverlyhillsfilmfest.com',
    password: 'admin123',
    name: 'Festival Admin',
    role: 'admin'
  },
  submitter: {
    email: 'filmmaker@example.com',
    password: 'film123',
    name: 'Test Filmmaker',
    role: 'submitter'
  },
  buyer: {
    email: 'buyer@example.com',
    password: 'buy123',
    name: 'Test Buyer',
    role: 'buyer'
  },
  newBuyer: {
    email: `buyer-${Date.now()}@example.com`,
    password: 'test123',
    name: 'New Test Buyer',
    role: 'buyer'
  }
}

export const testFilms = {
  newSubmission: {
    title: `Test Film ${Date.now()}`,
    director: 'Test Director',
    synopsis: 'An amazing test film that showcases the E2E testing capabilities',
    duration: 120,
    genre: 'Drama',
    trailerUrl: 'https://example.com/trailer',
    posterUrl: '/images/test-poster.jpg'
  }
}

export const testTickets = {
  purchase: {
    quantity: 2,
    sessionTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    paymentMethod: 'credit_card'
  }
}