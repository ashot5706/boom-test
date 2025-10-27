const axios = require('axios');
const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');

class BoomService {
  constructor() {
    this.clientId = process.env.BOOM_CLIENT_ID;
    this.clientSecret = process.env.BOOM_CLIENT_SECRET;
    this.baseUrl = process.env.BOOM_API_BASE_URL || 'https://app.boomnow.com/open_api/v1';
    this.accessToken = null;
    this.tokenExpiry = null;
    this.tokenTimeout = null;
    
    // Don't authenticate immediately - wait until first use
    console.log('Boom service initialized');
  }

  /**
   * Authenticate with Boom API and get access token
   */
  async authenticate() {
    try {
      if (!this.clientId || !this.clientSecret) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Boom API credentials not configured');
      }

      const response = await axios.post(`${this.baseUrl}/auth/token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret
      });

      const { access_token, expires_in } = response.data;
      
      this.accessToken = access_token;
      this.tokenExpiry = Date.now() + (expires_in * 1000); // Convert to milliseconds
      
      // Set timeout to clear token when it expires
      if (this.tokenTimeout) {
        clearTimeout(this.tokenTimeout);
      }
      
      this.tokenTimeout = setTimeout(() => {
        this.accessToken = null;
        this.tokenExpiry = null;
        console.log('Boom API access token expired and cleared');
      }, expires_in * 1000);

      console.log('Successfully authenticated with Boom API');
      return access_token;
    } catch (error) {
      console.error('Failed to authenticate with Boom API:', error.message);
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Failed to authenticate with Boom API');
    }
  }

  /**
   * Check if token is valid and refresh if needed
   */
  async ensureValidToken() {
    if (!this.accessToken || !this.tokenExpiry || Date.now() >= this.tokenExpiry) {
      await this.authenticate();
    }
    return this.accessToken;
  }

  /**
   * Search for houses using Boom API
   * @param {string} city - City name to search in
   * @param {number} page - Page number for pagination (default: 1)
   * @returns {Promise<Object>} Search results from Boom API
   */
  async searchHouses(city, page = 1) {
    try {
      // Check if credentials are configured
      if (!this.clientId || !this.clientSecret) {
        console.log(`Searching houses in ${city}... (Mock mode - Boom credentials not configured)`);
        return {
          city: city,
          results: [],
          message: 'Search function not yet implemented (Mock mode - Boom credentials not configured)'
        };
      }

      // Ensure we have a valid token
      await this.ensureValidToken();
      
      console.log(`Searching houses in ${city}, page ${page}...`);
      
      // Make request to Boom listings API
      const response = await axios.get(`${this.baseUrl}/listings`, {
        params: {
          city: city,
          page: page
        },
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`Found ${response.data.listings?.length || 0} listings for ${city}`);
      
      // Return the response as-is from Boom API
      return response.data;
    } catch (error) {
      console.error('Error searching houses:', error.message);
      
      // Handle specific Boom API errors
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Boom API error';
        
        if (statusCode === 401) {
          // Token might be expired, try to refresh
          this.accessToken = null;
          this.tokenExpiry = null;
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication failed with Boom API');
        } else if (statusCode === 404) {
          throw new ApiError(httpStatus.NOT_FOUND, 'No listings found for the specified city');
        } else if (statusCode >= 400 && statusCode < 500) {
          throw new ApiError(statusCode, errorMessage);
        } else {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Boom API server error');
        }
      }
      
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to search houses');
    }
  }

  /**
   * Get current access token
   */
  getAccessToken() {
    return this.accessToken;
  }

  /**
   * Check if token is expired
   */
  isTokenExpired() {
    return !this.tokenExpiry || Date.now() >= this.tokenExpiry;
  }
}

module.exports = BoomService;
