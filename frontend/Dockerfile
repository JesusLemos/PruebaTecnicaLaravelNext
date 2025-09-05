# Use the official Node image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install the dependencies
RUN npm install

# Fix file permissions for the web server
RUN chmod -R 777 /app

# Expose the Vite port
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev"]