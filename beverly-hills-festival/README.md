# Beverly Hills Film Festival Platform

A modern, multi-portal web application for the Beverly Hills Film Festival, featuring dual-mode architecture that seamlessly switches between public and administrative views.

![Beverly Hills Film Festival](https://via.placeholder.com/1200x300/663399/ffffff?text=Beverly+Hills+Film+Festival)

## 🎬 Project Overview

The Beverly Hills Film Festival platform is an innovative solution that serves three distinct user types through a unified interface:

- **Public Festival Site** - Browse films, purchase tickets, and explore festival events
- **Filmmaker Portal** - Submit films, manage screenings, and access analytics
- **Sponsor Portal** - Manage sponsorships, track metrics, and coordinate events

### ✨ Key Features

- **Dual-Mode Architecture**: Seamlessly switch between public and admin views
- **Role-Based Access Control**: Three specialized portals with tailored features
- **Responsive Design**: Beautiful experience across all devices
- **Real-Time Updates**: Dynamic content management and scheduling
- **Analytics Dashboard**: Comprehensive metrics for all user types
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/beverly-hills-festival.git
cd beverly-hills-festival
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Test Credentials

### Admin Portal
- **Email**: admin@beverlyhillsfilmfestival.com
- **Password**: admin123
- **Access**: Full dashboard, film management, user management, analytics

### Filmmaker Portal
- **Email**: filmmaker@example.com
- **Password**: film123
- **Access**: Film submission, screening schedule, analytics, networking

### Sponsor Portal
- **Email**: sponsor@paramount.com
- **Password**: sponsor123
- **Access**: Sponsorship dashboard, brand metrics, event management

## 🔄 Mode Switching

The platform features an innovative dual-mode system:

1. **Public Mode** (Default)
   - Access the main festival website
   - Browse films and schedules
   - Purchase tickets
   - View sponsor information

2. **Admin Mode**
   - Access administrative features
   - Manage content and users
   - View analytics
   - Configure festival settings

### How to Switch Modes

1. Click the mode switcher in the demo banner at the top of any page
2. Or visit `/demo` for detailed instructions and mode information
3. The selected mode persists across sessions via localStorage

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

## 📂 Project Structure

```
beverly-hills-festival/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin portal routes
│   ├── filmmaker/         # Filmmaker portal routes
│   ├── sponsor/           # Sponsor portal routes
│   └── demo/              # Demo and documentation
├── components/            # Reusable React components
├── lib/                   # Utility functions and contexts
├── public/               # Static assets
└── test/                 # Test files
```

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

## 🚢 Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables (if any)
4. Deploy!

For other platforms, build the production bundle:
```bash
npm run build
npm start
```

## 📝 License

This project is proprietary software for the Beverly Hills Film Festival.

## 🤝 Contributing

Please contact the development team for contribution guidelines.

## 📞 Support

For technical support or questions:
- Email: tech@beverlyhillsfilmfestival.com
- Documentation: Visit `/demo` in the application

---

Built with ❤️ for the Beverly Hills Film Festival