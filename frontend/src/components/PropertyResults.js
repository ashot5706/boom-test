import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import config from '../config';
import './PropertyResults.css';

const PropertyResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const resultsRef = useRef(null);

  useEffect(() => {
    // Get city from URL params first, then from location state
    const cityFromUrl = searchParams.get('city');
    const cityFromState = location.state?.city;
    const city = cityFromUrl || cityFromState;
    
    if (city) {
      setSelectedCity(city);
      
      // If city is from state but not in URL, update URL params
      if (cityFromState && !cityFromUrl) {
        setSearchParams({ city: city });
      }
      
      performSearch(city, 1, false);
    } else {
      navigate('/');
    }
  }, [location, navigate, searchParams, setSearchParams]);

  const performSearch = async (city, page = 1, append = false) => {
    if (page === 1) {
      setLoading(true);
      setListings([]);
      setCurrentPage(1);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);
    
    try {
      const searchUrl = `${config.getSearchUrl(city)}&page=${page}`;
      console.log('Searching for:', { 
        city: city, 
        page: page,
        searchUrl: searchUrl
      });
      
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search results:', data);
      
      // Handle new API response format
      if (data.success && data.data) {
        const listingsData = data.data.listings || [];
        const pagiInfo = data.data.pagi_info;
        
        if (append) {
          setListings(prev => [...prev, ...listingsData]);
        } else {
          setListings(listingsData);
        }
        
        setPaginationInfo(pagiInfo);
        setCurrentPage(page);
      } else {
        throw new Error(data.message || 'Failed to fetch properties');
      }
      
    } catch (err) {
      console.error('Search error:', err);
      setError(`Failed to search properties: ${err.message}`);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreResults = () => {
    if (paginationInfo && currentPage < Math.ceil(paginationInfo.count / paginationInfo.per_page)) {
      performSearch(selectedCity, currentPage + 1, true);
    }
  };

  // Infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (!resultsRef.current || loadingMore || !paginationInfo) return;
      
      const { scrollTop, scrollHeight, clientHeight } = resultsRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold
      
      if (isNearBottom && currentPage < Math.ceil(paginationInfo.count / paginationInfo.per_page)) {
        loadMoreResults();
      }
    };

    const resultsElement = resultsRef.current;
    if (resultsElement) {
      resultsElement.addEventListener('scroll', handleScroll);
      return () => {
        resultsElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loadingMore, paginationInfo, currentPage]);

  const handleBackToSearch = () => {
    // Navigate back to search page, optionally with the city pre-filled
    navigate('/', { 
      state: { 
        selectedCity: selectedCity,
        preserveSearch: true 
      } 
    });
  };

  if (loading) {
    return (
      <div className="property-results-loading">
        <div className="spinner"></div>
        <p>Searching for properties in {selectedCity}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-results-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleBackToSearch} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="property-results">
      <div className="property-results-header">
        <button onClick={handleBackToSearch} className="back-button">
          ← Back to Search
        </button>
        <h1>Properties in {selectedCity}</h1>
        {paginationInfo && (
          <div className="pagination-info">
            Showing {listings.length} of {paginationInfo.count} properties
            {currentPage > 1 && (
              <span className="current-page"> (Page {currentPage})</span>
            )}
          </div>
        )}
        {config.isDevelopment && (
          <div className="debug-info">
            <small>URL: {window.location.href}</small>
          </div>
        )}
      </div>

      <div className="property-results-content" ref={resultsRef}>
        <div className="listings-grid">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
        
        {loadingMore && (
          <div className="loading-more">
            <div className="spinner"></div>
            Loading more properties...
          </div>
        )}
        
        {paginationInfo && currentPage >= Math.ceil(paginationInfo.count / paginationInfo.per_page) && (
          <div className="end-of-results">
            <p>🎉 You've reached the end! No more properties to load.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = listing.pictures || [listing.picture].filter(Boolean);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={images[currentImageIndex]?.original || images[currentImageIndex] || '/api/placeholder/400/300'} 
          alt={listing.title}
          onError={(e) => {
            e.target.src = '/api/placeholder/400/300';
          }}
        />
        
        {images.length > 1 && (
          <>
            <button className="image-nav prev" onClick={prevImage}>
              ‹
            </button>
            <button className="image-nav next" onClick={nextImage}>
              ›
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      
      <div className="property-info">
        <h3 className="property-title">{listing.title}</h3>
        <p className="property-nickname">{listing.nickname}</p>
        <div className="property-details">
          <span className="beds">🛏️ {listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
          <span className="baths">🛁 {listing.baths} bath{listing.baths !== 1 ? 's' : ''}</span>
          <span className="accommodates">👥 {listing.accommodates} guest{listing.accommodates !== 1 ? 's' : ''}</span>
        </div>
        <p className="property-location">📍 {listing.city_name}</p>
        
        {listing.extra_info?.contact_phone && (
          <p className="property-contact">📞 {listing.extra_info.contact_phone}</p>
        )}
      </div>
    </div>
  );
};

export default PropertyResults;
