// Environment configuration
const config = {
  // Backend host configuration
  backendHost: process.env.REACT_APP_BACKEND_HOST || 'localhost:8080',
  
  // API configuration
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
  
  // App configuration
  appName: process.env.REACT_APP_APP_NAME || 'Property Search Widget',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API endpoints
  endpoints: {
    search: '/search',
  },
  
  // Helper functions
  getApiUrl: (endpoint) => {
    return `${config.apiBaseUrl}${endpoint}`;
  },
  
  getSearchUrl: (city) => {
    return `${config.apiBaseUrl}${config.endpoints.search}?city=${encodeURIComponent(city)}`;
  },
  
  // Log configuration in development
  logConfig: () => {
    if (config.isDevelopment) {
      console.log('🔧 App Configuration:', {
        backendHost: config.backendHost,
        apiBaseUrl: config.apiBaseUrl,
        appName: config.appName,
        version: config.version,
        environment: process.env.NODE_ENV
      });
    }
  }
};

export default config;
