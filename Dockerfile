# Use the official Node 19 image as a parent image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) first to leverage Docker cache
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# The command to run your app using Node.js
CMD ["node", "server.js"]
