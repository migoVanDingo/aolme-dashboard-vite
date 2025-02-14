FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code and build the project
COPY . .
RUN npm run build

# Serve the build with a lightweight web server
FROM nginx:alpine

# Copy built files from build stage to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 5173 and start Nginx
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]