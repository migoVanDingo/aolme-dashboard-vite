# Use Node.js as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code and build the project
COPY . .
RUN npm run build

# Use a lightweight Node.js server to serve the build
FROM node:18-alpine AS serve

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy built files from the previous stage
COPY --from=build /app/dist /app/dist

# Expose the correct port for serving
EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]
