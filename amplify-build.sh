#!/bin/bash

# Display versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building Next.js application..."
npm run build

# Copy custom index.html to out directory
echo "Copying custom index.html to out directory..."
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Scott Fabini's portfolio site" />
  <title>Scott Fabini - Portfolio</title>
</head>
<body>
  <div id="__next"></div>
</body>
</html>
EOF

# Copy custom index.html to the out directory
cp public/index.html out/index.html

echo "Build completed successfully!" 