const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { boomService } = require('../../services');

const AVAILABLE_CITIES = [
        "Fuengirola",
        "North Bay Village",
        "Santa Monica",
        "Mijas ",
        "North Miami Beach",
        "Davie",
        "Lighthouse Point",
        "Songyuan",
        "West Palm Beach",
        "Las Vegas",
        "San Pawl il-Baħar",
        "Malaga",
        "Marbella",
        "Seminole",
        "Plantation",
        "Oakland Park",
        "Tampa",
        "Pompano Beach",
        "Bradenton",
        "Parkland",
        "Sunny Isles Beach",
        "Hollywood",
        "Deerfield Beach",
        "Largo",
        "Calgary",
        "Hallandale Beach",
        "Southwest Ranches",
        "Fort Lauderdale",
        "Mijas",
        "Calahonda",
        "Dania Beach",
        "Estepona",
        "Coral Springs",
        "Clearwater",
        "Sarasota",
        "Miami"
    ];

/**
 * Search houses endpoint
 * @param {string} req.query.city - City name to search in
 * @param {number} req.query.page - Page number for pagination (optional, default: 1)
 */
const searchHouses = catchAsync(async (req, res) => {
  const { city, page } = req.query;
  
  if (!city) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'City parameter is required',
      code: httpStatus.BAD_REQUEST
    });
  }

  if (!AVAILABLE_CITIES.includes(city)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Invalid city name',
      code: httpStatus.BAD_REQUEST
    });
  }

  // Parse and validate page parameter
  let pageNumber = 1;
  if (page) {
    pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Page parameter must be a positive integer',
        code: httpStatus.BAD_REQUEST
      });
    }
  }

  try {
    const results = await boomService.searchHouses(city, pageNumber);
    
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Search completed successfully',
      data: results
    });
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'An error occurred while searching houses',
      code: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    });
  }
});

module.exports = {
  searchHouses,
};
