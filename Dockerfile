# Stage 1: Build Stage
FROM node:22-alpine AS build

# Set the working directory for the build stage
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache for dependencies
COPY package.json pnpm-lock.yaml ./

# Install project dependencies (dev and prod)
RUN pnpm install --frozen-lockfile

# Copy the rest of the project files
COPY . .

# Build the application (if applicable, e.g., for TypeScript projects, or if using bundlers)
RUN pnpm run build  

# Stage 2: Production Stage
FROM node:22-alpine AS production

# Set the working directory for the production stage
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the production dependencies and build artifacts from the build stage
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/dist ./dist   

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose the port your app will run on
EXPOSE 3000

# Copy the rest of the necessary files for runtime (no dev dependencies)
COPY --from=build /app/src ./src  
COPY . .  

# Start the application
CMD ["pnpm", "start"]
