#!/bin/bash

# Display versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Show the current API URL
echo "NEXT_PUBLIC_API_URL is set to: $NEXT_PUBLIC_API_URL"

# Create the environment update script
echo "Creating update-env.js script..."
cat > scripts/update-env.js << 'EOF'
const fs = require('fs');
const path = require('path');

// Get the API URL from environment variable or use default
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

console.log(`Generating environment config with API_URL: ${apiUrl}`);

// Create environment config content
const envConfig = `
window.ENV = {
  NEXT_PUBLIC_API_URL: "${apiUrl}"
};
console.log("Environment config loaded:", window.ENV);
`;

// Ensure public directory exists
const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write config to file
fs.writeFileSync(
  path.join(publicDir, 'env-config.js'),
  envConfig
);

console.log('Environment config generated successfully!');
EOF

# Run the environment update script
echo "Running update-env script..."
node scripts/update-env.js

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
  <!-- Load environment variables before the app -->
  <script src="/env-config.js"></script>
</head>
<body>
  <div id="__next"></div>
</body>
</html>
EOF

# Copy custom index.html to the out directory
cp public/index.html out/index.html
cp public/env-config.js out/env-config.js

echo "Build completed successfully!" 