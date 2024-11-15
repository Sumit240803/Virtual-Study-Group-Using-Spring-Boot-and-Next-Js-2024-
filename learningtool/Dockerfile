# Step 1: Use a base image with JDK 21
FROM openjdk:21-jdk-slim as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the Spring Boot jar file into the container
COPY target/learningtool-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose the port that your app will run on
EXPOSE 8080

# Step 5: Run the application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]
