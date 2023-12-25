# Use an official Alpine Linux image as the base image
FROM alpine:latest

# Update package repositories and install necessary packages
RUN apk update && apk add --no-cache nodejs yarn

# Create a directory for the app
RUN mkdir -p /usr/src/app

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the local application files to the container
COPY . .

# Create a non-root user for running the application
RUN adduser -D -g '' lifehax-lab

# Change ownership of the app directory to the non-root user
RUN chown -R lifehax-lab:lifehax-lab /usr/src/app

# Switch to the non-root user
USER lifehax-lab

# Install Node.js application dependencies using npm
RUN yarn install

# Build the application (modify this based on your project structure)
RUN yarn build

# Expose the port that your Next.js application will run on (change if necessary)
EXPOSE 3000

# Define the command to start your Next.js application
CMD ["yarn", "start"]