# Use Node.js as the base image
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code and build the project
COPY . .
RUN npm run build

# Use a lightweight server to serve the frontend
FROM node:18-alpine

WORKDIR /app

# Install `serve` to serve the built frontend
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist /app

# Expose port 5173
EXPOSE 5173

# Start the frontend using `serve`
CMD ["serve", "-s", ".", "-l", "5173"]
