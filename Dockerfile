# Step 1: Use Node.js for building the Angular app
FROM node:20.18.0 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Step 2: Use NGINX to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular app from the build stage to the NGINX HTML folder
COPY --from=build /app/dist/smartagri-frontend/browser /usr/share/nginx/html

# Copy custom NGINX configuration if needed (optional)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose the default NGINX port
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]




