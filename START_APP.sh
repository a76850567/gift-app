#!/bin/bash

echo "========================================"
echo "  Gift App - Dopamine Task Manager"
echo "========================================"
echo ""
echo "Starting the application..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies... This may take a few minutes..."
    echo ""
    npm install
    echo ""
    echo "Dependencies installed successfully!"
    echo ""
fi

echo "Starting development server..."
echo "The app will open in your browser automatically."
echo ""
echo "Press Ctrl+C to stop the server."
echo ""

npm run dev
