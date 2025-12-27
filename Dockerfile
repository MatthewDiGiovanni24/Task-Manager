# Use official Node runtime
FROM node:18-alpine

# Create app directory inside container
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# App listens on port 3000
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]