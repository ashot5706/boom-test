import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services';
import { FiMapPin, FiStar, FiHeart } from 'react-icons/fi';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyService.getProperties({ limit: 6 });
      setProperties(response.properties || []);
    } catch (error) {
      setError('Failed to load properties');
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Find your perfect place to stay
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover unique homes and experiences around the world
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Explore Properties
        </Link>
      </div>

      {/* Featured Properties */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Properties</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties available at the moment.</p>
            <Link
              to="/create-property"
              className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Be the first to list a property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to host your space?
        </h3>
        <p className="text-gray-600 mb-6">
          Join thousands of hosts who are earning extra income by sharing their space.
        </p>
        <Link
          to="/create-property"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Start Hosting
        </Link>
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/properties/${property.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={property.images?.[0] || '/api/placeholder/400/300'}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <FiHeart
              className={`w-5 h-5 ${
                isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              {property.rating || '4.5'}
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <FiMapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${property.price}
              <span className="text-sm font-normal text-gray-600">/night</span>
            </span>
            <span className="text-sm text-gray-500">
              {property.propertyType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
