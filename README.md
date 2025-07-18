# 🎵 GrooveNomad

**Your Ultimate Festival Journey Companion**

GrooveNomad is a comprehensive React web application designed to help music lovers discover, plan, and share their festival experiences. From finding the perfect festival to booking transport and accommodation, GrooveNomad streamlines your entire festival journey.

## 🚀 Features

### 🎪 Festival Discovery
- **Festival Search & Filtering**: Browse festivals by location, genre, date, and popularity
- **Smart Recommendations**: AI-powered suggestions based on your music preferences
- **Trending Festivals**: Stay updated with the hottest events
- **Detailed Festival Pages**: Complete information including lineup, dates, location, and pricing

### 🧳 Trip Planning
- **4-Step Trip Builder**: 
  1. Festival Selection
  2. Transport Booking
  3. Accommodation Search
  4. Trip Summary & Confirmation
- **Multi-Modal Transport**: Train, plane, bus, and car options
- **Hotel Integration**: Find and book accommodations near festival venues
- **Expense Tracking**: Keep track of your festival budget

### 👥 Community Features
- **Festival Forums**: Connect with other attendees
- **Travel Groups**: Find travel companions from your area
- **Social Matching**: Get matched with festival-goers based on music taste and location
- **User Gallery**: Share your festival memories
- **Interactive Chat**: Real-time discussions about festivals

### 🤖 AI Assistant
- **Llama3-Powered Chatbot**: Get personalized festival recommendations
- **24/7 Support**: Help with app navigation and festival planning
- **Multi-language Support**: Currently available in English and French

### 🔐 User Management
- **Secure Authentication**: Login/signup system with user profiles
- **Profile Photos**: Connect your Airtable profile images
- **Trip History**: Track your past and upcoming festivals
- **Personalized Dashboard**: Your festivals, trips, and recommendations

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and context
- **React Router**: Client-side routing for SPA experience
- **Tailwind CSS**: Utility-first styling for responsive design
- **Lucide React**: Beautiful, customizable icons

### Backend & Data
- **Airtable API**: Database for festivals, users, transport, and hotels
- **Custom API Service**: Centralized data management
- **Local Storage**: User session persistence

### AI Integration
- **Ollama**: Local LLM inference server
- **Llama3**: Large language model for intelligent responses
- **Real-time Chat**: WebSocket-like experience for smooth conversations

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Ollama (for AI chatbot functionality)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/cantflytech/GrooveNomad.git
   cd GrooveNomad/groove-nomad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Ollama (for AI chatbot)**
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.com/install.sh | sh
   
   # Pull the Llama3 model
   ollama pull llama3:latest
   
   # Start Ollama server
   ollama serve
   ```

4. **Configure Airtable**
   - Create an Airtable account
   - Set up tables for: Festivals, Users, Transport, Hotels
   - Update API endpoints in `src/services/airtableService.js`

5. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🗂️ Project Structure

```
groove-nomad/
├── public/
│   ├── index.html
│   ├── logo192.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ChatBot.js          # AI assistant component
│   │   ├── FestivalCard.js     # Festival display card
│   │   ├── Header.js           # Navigation header
│   │   └── PageWrapper.js      # Chatbot wrapper
│   ├── contexts/
│   │   ├── AuthContext.js      # Authentication state
│   │   └── SearchContext.js    # Global search state
│   ├── pages/
│   │   ├── HomePage.js         # Landing page
│   │   ├── FestivalsPage.js    # Festival browsing
│   │   ├── FestivalDetailPage.js
│   │   ├── CommunityPage.js    # Social features
│   │   ├── MyTripsPage.js      # Trip planning step 1
│   │   ├── TransportSearchPage.js  # Trip planning step 2
│   │   ├── AccommodationPage.js    # Trip planning step 3
│   │   ├── TripSummaryPage.js      # Trip planning step 4
│   │   ├── LoginPage.js        # User authentication
│   │   └── SignupPage.js       # User registration
│   ├── services/
│   │   └── airtableService.js  # API integration
│   ├── img/                    # Static images
│   ├── App.js                  # Main app component
│   └── index.js               # App entry point
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎯 Key Features Deep Dive

### Trip Planning Flow
1. **Festival Selection**: Choose from curated festivals with detailed information
2. **Transport Options**: Compare prices and schedules for different transport methods
3. **Accommodation Search**: Find hotels, hostels, and camping options near venues
4. **Summary & Booking**: Review your complete trip and proceed to booking

### AI Assistant Capabilities
- Festival recommendations based on music preferences
- Transport and accommodation suggestions
- App navigation help
- General festival-related questions
- Budget planning assistance

### Community Features
- **Festival Forums**: Dedicated discussion spaces for each festival
- **Travel Groups**: Organize group trips with other attendees
- **Social Matching**: Algorithm-based matching for compatible festival companions
- **Photo Sharing**: Community gallery for festival memories

## 🔧 Configuration

### Airtable Setup
The application uses Airtable as its backend. You'll need to set up the following tables:

1. **Festivals Table**
   - Fields: Name, Location, Date, Description, Image, Price, Genres
   
2. **Users Table**
   - Fields: FirstName, LastName, Email, ProfilePhoto, Region, Country
   
3. **Transport Table**
   - Fields: Type, Departure, Arrival, Price, Duration, Company
   
4. **Hotels Table**
   - Fields: Name, Location, Price, Rating, Amenities, Distance

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_AIRTABLE_API_KEY=your_api_key_here
REACT_APP_AIRTABLE_BASE_ID=your_base_id_here
```

## 🎨 Customization

### Themes
The application uses Tailwind CSS for styling. You can customize colors, fonts, and spacing in `tailwind.config.js`.

### AI Chatbot
Modify the chatbot's personality and responses in `src/components/ChatBot.js`. You can also switch to different LLM models by updating the Ollama configuration.

## 📱 Responsive Design

GrooveNomad is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔐 Security

- User authentication with secure session management
- Input validation and sanitization
- HTTPS enforcement in production
- Local storage encryption for sensitive data

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop build folder or connect via Git
- **AWS S3**: Upload build files to S3 bucket with CloudFront
- **Heroku**: Deploy with Node.js buildpack

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 API Documentation

### Airtable Service Methods

```javascript
// Festival operations
fetchFestivals()                    // Get all festivals
fetchFestivalById(id)              // Get specific festival
searchFestivals(query)             // Search festivals

// User operations
fetchUsers()                       // Get all users
fetchUserByEmail(email)            // Get user by email
createUser(userData)               // Create new user

// Transport operations
fetchTransportOptions()            // Get transport options
fetchTransportByFestival(festivalId) // Get transport for specific festival

// Hotel operations
fetchHotels()                      // Get all hotels
fetchHotelsByLocation(location)    // Get hotels by location
```

## 🐛 Known Issues

- Ollama chatbot requires local installation
- Airtable API rate limits may affect performance with many users
- Mobile keyboard may cover input fields on some devices

## 📈 Future Enhancements

- **Mobile App**: React Native version
- **Payment Integration**: Stripe/PayPal for bookings
- **Real-time Notifications**: Push notifications for trip updates
- **Advanced Matching**: ML-based compatibility scoring
- **Offline Mode**: PWA capabilities for offline access
- **Multi-language**: Full internationalization support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **Airtable**: For providing the backend database solution
- **Ollama**: For making LLM integration accessible
- **Tailwind CSS**: For the beautiful, responsive design system
- **Lucide**: For the comprehensive icon library
- **React Community**: For the amazing ecosystem and tools

## 📞 Support

For support, email support@groovenomad.com or join our Discord community.

---

**Made with ❤️ by the GrooveNomad Team**

*Find your rhythm, plan your journey, live the music!* 🎵
