const fs = require('fs');
const path = require('path');

// Get environment variables from process.env
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Create the env config
const envConfig = `
window.ENV = {
  NEXT_PUBLIC_API_URL: "${NEXT_PUBLIC_API_URL}"
};
`;

// Write to public directory
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(
  path.join(publicDir, 'env-config.js'),
  envConfig
);

console.log('Environment configuration generated successfully!'); 