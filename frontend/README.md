# Property Search Widget

A simple React property search widget with city filtering functionality.

## Features

- 🔍 **City Search**: Type to search through available cities
- 📍 **City Selection**: Click to select a city from the dropdown
- 🎨 **Modern UI**: Clean, responsive design
- 📱 **Mobile Friendly**: Works on all devices

## Available Cities

The widget includes 36 cities:
- Fuengirola, North Bay Village, Santa Monica, Mijas, North Miami Beach
- Davie, Lighthouse Point, Songyuan, West Palm Beach, Las Vegas
- San Pawl il-Baħar, Malaga, Marbella, Seminole, Plantation
- Oakland Park, Tampa, Pompano Beach, Bradenton, Parkland
- Sunny Isles Beach, Hollywood, Deerfield Beach, Largo, Calgary
- Hallandale Beach, Southwest Ranches, Fort Lauderdale, Calahonda
- Dania Beach, Estepona, Coral Springs, Clearwater, Sarasota, Miami

## How to Use

1. **Start the app**: `npm start`
2. **Search cities**: Type in the search box to filter cities
3. **Select a city**: Click on a city from the dropdown
4. **Search properties**: Click the "Search Properties" button (action is empty for now)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables (optional)
cp env.example env.local

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Environment Configuration

The app uses environment variables for configuration. Create a `.env` file or use `env.local`:

```env
REACT_APP_BACKEND_HOST=localhost:8080
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_APP_NAME=Property Search Widget
REACT_APP_VERSION=1.0.0
```

### Available Environment Variables

- `REACT_APP_BACKEND_HOST` - Backend host (default: localhost:8080)
- `REACT_APP_API_BASE_URL` - Full API base URL (default: http://localhost:8080/api/v1)
- `REACT_APP_APP_NAME` - Application name
- `REACT_APP_VERSION` - Application version

### Configuration Display

In development mode, the app displays current configuration settings in the UI for easy debugging.

## API Integration

The app integrates with a backend API to search for properties:

### Search Endpoint
- **URL**: `GET /api/v1/search?city={cityName}&page={pageNumber}`
- **Example**: `http://localhost:8080/api/v1/search?city=Hollywood&page=1`

### Response Format
The API returns a JSON response with success status, message, and data:

```json
{
  "success": true,
  "message": "Properties retrieved successfully",
  "data": {
    "listings": [
      {
        "id": 391,
        "title": "Renovated Apt -Unit #3 / Close to Beach w/ Parking",
        "picture": "https://example.com/image.jpg",
        "pictures": [
          {
            "sort": 1,
            "original": "https://example.com/image1.jpg"
          }
        ],
        "nickname": "Fillmore #3",
        "beds": 1.0,
        "baths": 1.0,
        "city_name": "Hollywood",
        "accommodates": 2,
        "extra_info": {
          "contact_phone": "+17862030688"
        }
      }
    ],
    "pagi_info": {
      "count": 90,
      "page": 1,
      "per_page": 50
    }
  }
}
```

### Features
- ✅ Real-time property search
- ✅ Separate results page with routing
- ✅ URL parameter management for city
- ✅ Page reload support with preserved state
- ✅ Image carousel for property photos
- ✅ Infinite scroll pagination
- ✅ Loading states and error handling
- ✅ Property cards with images and details
- ✅ Responsive grid layout
- ✅ Fallback images for broken links
- ✅ Pagination info display
- ✅ Auto-load more results on scroll
- ✅ Back navigation to search

## URL Management

The app uses URL parameters to maintain state and support page reloads:

### URL Structure
- **Search Page**: `/` or `/?city={cityName}`
- **Results Page**: `/results?city={cityName}`

### Features
- **City Parameter**: City name is preserved in URL for results page
- **Page Reload Support**: Results page can be reloaded and will fetch data using URL parameter
- **Direct Access**: Users can directly access results page via URL
- **State Preservation**: Returning to search page preserves the selected city
- **URL Encoding**: City names are properly encoded/decoded in URLs

### Examples
- `http://localhost:3000/results?city=Hollywood`
- `http://localhost:3000/results?city=Las%20Vegas`
- `http://localhost:3000/?city=Miami`

## Project Structure

```
src/
├── components/
│   ├── PropertyResults.js    # Property results page component
│   └── PropertyResults.css   # Styling for results page
├── config/
│   └── index.js             # Environment configuration
├── App.js                   # Main app with routing
├── App.css                  # Styling for search widget
└── index.js                 # React app entry point
```

## Customization

- **Add cities**: Update the `cities` array in `App.js`
- **Modify styling**: Edit `App.css` for different colors/layout
- **Add search action**: Implement the `handleSearch` function in `App.js`

## Technologies Used

- React 18
- CSS3
- Create React App