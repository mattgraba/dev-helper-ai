# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port your Express server listens on
EXPOSE 3001

# Start the server
CMD ["npm", "run", "dev"]
