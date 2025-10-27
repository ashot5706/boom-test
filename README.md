# Property Search Application

A full-stack property search application with a React frontend and Node.js/Express backend, integrated with Boom Real Estate API for property listings.

## 🏗️ Project Structure

```
boom-test/
├── backend/          # Node.js/Express API server
├── frontend/         # React property search widget
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd boom-test
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

#### Database Setup

1. **Install PostgreSQL** and create a database:
   ```sql
   CREATE DATABASE boom;
   ```

2. **Configure Environment Variables**:
   ```bash
   cp config.DEVELOPMENT.env.example config.DEVELOPMENT.env
   ```

3. **Update Database Configuration** in `config.DEVELOPMENT.env`:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PORT=5432
   DB_PASSWORD=your_postgres_password
   DB_DATABASE=boom
   ```

#### Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run start
```

The backend will be available at: **http://localhost:8080**

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Environment Configuration

1. **Set up environment variables**:
   ```bash
   # Option 1: Use the setup script
   chmod +x setup-env.sh
   ./setup-env.sh

   # Option 2: Manual setup
   cp env.example env.local
   ```

2. **Verify configuration** in `env.local`:
   ```env
   REACT_APP_BACKEND_HOST=localhost:8080
   REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
   REACT_APP_APP_NAME=Property Search Widget
   REACT_APP_VERSION=1.0.0
   ```

#### Start Frontend Application

```bash
npm start
```

The frontend will be available at: **http://localhost:3000**

## 🌐 Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api/v1/docs

## 🔧 Development Workflow

### Running Both Services

1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm start
   ```

### API Endpoints

- **Search Properties**: `GET /api/v1/search?city={cityName}&page={pageNumber}`
- **API Documentation**: `GET /api/v1/docs` (Swagger UI)

## 🏠 Features

### Frontend Features
- 🔍 **City Search**: Type-ahead search through 36+ cities
- 📍 **Property Results**: Paginated property listings with images
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔄 **Infinite Scroll**: Auto-load more properties on scroll
- 🖼️ **Image Carousel**: Multiple property photos
- 🔗 **URL State Management**: Direct links to search results

### Backend Features
- 🏢 **Boom Real Estate Integration**: Property search API
- 🔐 **JWT Authentication**: Secure token-based auth
- 📊 **PostgreSQL Database**: Reliable data storage
- 📝 **API Documentation**: Auto-generated Swagger docs
- 🛡️ **Security**: Helmet, CORS, XSS protection
- 📋 **Validation**: Request validation with Joi
- 📊 **Logging**: Winston and Morgan logging

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:
- **Users**: Authentication and user management
- **Properties**: Property listings and details
- **Sessions**: User session management

## 🔑 Environment Variables

### Backend (`backend/config.DEVELOPMENT.env`)

```env
# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRATION_MINUTES=1000000
JWT_REFRESH_EXPIRATION_DAYS=100

# Server Configuration
DOMAIN=http://localhost:8080
PORT=8080

# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PORT=5432
DB_PASSWORD=your_password
DB_DATABASE=boom

# Boom Real Estate API
BOOM_CLIENT_SECRET=your_boom_client_secret
BOOM_CLIENT_ID=your_boom_client_id
```

### Frontend (`frontend/env.local`)

```env
REACT_APP_BACKEND_HOST=localhost:8080
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_APP_NAME=Property Search Widget
REACT_APP_VERSION=1.0.0
```

## 🛠️ Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with nodemon
npm run start    # Start production server
npm test         # Run tests (placeholder)
```

### Frontend Scripts
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run eject    # Eject from Create React App
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure PostgreSQL is running
   - Check database credentials in `config.DEVELOPMENT.env`
   - Verify database exists: `CREATE DATABASE boom;`

2. **Port Already in Use**:
   - Backend: Change `PORT` in `config.DEVELOPMENT.env`
   - Frontend: React will prompt to use a different port

3. **CORS Issues**:
   - Ensure backend is running on port 8080
   - Check `REACT_APP_API_BASE_URL` in frontend environment

4. **API Not Responding**:
   - Verify Boom API credentials are correct
   - Check network connectivity
   - Review backend logs for errors

### Logs

- **Backend Logs**: Check terminal running `npm run dev`
- **Frontend Logs**: Check browser console and terminal running `npm start`

## 📚 API Documentation

Once the backend is running, visit **http://localhost:8080/api/v1/docs** for interactive API documentation powered by Swagger.

## 🔄 Data Flow

1. User searches for a city in the frontend
2. Frontend makes API call to backend: `GET /api/v1/search?city={cityName}`
3. Backend authenticates with Boom Real Estate API
4. Backend fetches property data and returns to frontend
5. Frontend displays results with pagination and infinite scroll

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and start with `npm run start`
3. Ensure PostgreSQL is accessible
4. Configure reverse proxy (nginx/Apache)

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve the `build` folder with a web server
3. Update API URLs for production environment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

For support and questions:
- Check the API documentation at http://localhost:8080/api/v1/docs
- Review the troubleshooting section above
- Check backend and frontend logs for error details
