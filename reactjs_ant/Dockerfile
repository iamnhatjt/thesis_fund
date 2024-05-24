# Use a lightweight base image
FROM node:20.5.1 as builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the webpack bundle
RUN npm run build

# Use a lightweight base image
FROM nginx:alpine

# Copy the contents of the dist directory from the builder stage to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start the nginx server
# CMD ["nginx", "-g", "daemon off;"]
CMD [ "npm", "start" ]