import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import config from './config';
import PropertyResults from './components/PropertyResults';

const cities = [
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

const SearchWidget = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle preserved search state when returning from results
  useEffect(() => {
    if (location.state?.preserveSearch && location.state?.selectedCity) {
      setSelectedCity(location.state.selectedCity);
      setSearchTerm(location.state.selectedCity);
    }
  }, [location.state]);

  // Handle direct URL access with city parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cityFromUrl = urlParams.get('city');
    if (cityFromUrl && !selectedCity) {
      setSelectedCity(cityFromUrl);
      setSearchTerm(cityFromUrl);
    }
  }, [location.search, selectedCity]);

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(city);
    setShowDropdown(false);
  };

  const handleSearch = async () => {
    if (!selectedCity) return;
    
    setLoading(true);
    
    try {
      // Navigate to results page with city in URL params
      navigate(`/results?city=${encodeURIComponent(selectedCity)}`, { 
        state: { city: selectedCity },
        replace: false 
      });
    } catch (err) {
      console.error('Navigation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = searchTerm 
    ? cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cities;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      <div className="search-widget">
        <h1>Property Search</h1>
 
        <div className="search-container">
          <div className="search-field" ref={dropdownRef}>
            <label htmlFor="city-search">Search Cities:</label>
            <input
              id="city-search"
              type="text"
              placeholder="Type to search cities or click to see all..."
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputClick}
              className="search-input"
            />
            
            {showDropdown && (
              <div className="city-dropdown">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="city-option"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </div>
                  ))
                ) : (
                  <div className="no-results">No cities found</div>
                )}
              </div>
            )}
          </div>

          <button 
            onClick={handleSearch}
            className="search-button"
            disabled={!selectedCity || loading}
          >
            {loading ? 'Searching...' : 'Search Properties'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          <div className="spinner"></div>
          Searching for properties in {selectedCity}...
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchWidget />} />
        <Route path="/results" element={<PropertyResults />} />
      </Routes>
    </Router>
  );
}

export default App;