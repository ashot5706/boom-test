#!/bin/bash

# Environment setup script for Property Search Widget

echo "🔧 Setting up environment configuration..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp env.example .env
    echo "✅ .env file created"
else
    echo "⚠️  .env file already exists"
fi

# Create env.local file if it doesn't exist
if [ ! -f env.local ]; then
    echo "Creating env.local file..."
    cp env.example env.local
    echo "✅ env.local file created"
else
    echo "⚠️  env.local file already exists"
fi

echo ""
echo "📋 Environment files created with default values:"
echo "   - Backend Host: localhost:8080"
echo "   - API Base URL: http://localhost:8080/api/v1"
echo "   - App Name: Property Search Widget"
echo "   - Version: 1.0.0"
echo ""
echo "🔗 The app will make API requests to: http://localhost:8080/api/v1/search?city={cityName}&page={pageNumber}"
echo "📄 Features infinite scroll pagination with automatic loading"
echo ""
echo "🚀 You can now start the development server with: npm start"
