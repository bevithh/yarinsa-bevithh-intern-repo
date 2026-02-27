# What is the difference between docker run and docker-compose up?

docker run is used to start a single container from a specific image. docker-compose up reads a docker-compose.yml file to start and link multiple containers simultaneously, setting up networking and volumes automatically.

## How does Docker Compose help when working with multiple services?

It acts as a single point of control for the entire backend stack. It ensures that the PostgreSQL database is ready before the NestJS API tries to connect to it, and it places all services on the same virtual network so they can communicate by service name (e.g., db:5432).

## What commands can you use to check logs?

You can use docker logs <container_id> for a single container, or docker-compose logs -f to see a live "stream" of logs from all services in your stack at once.

## What happens when you restart a container? Does data persist?

When a container restarts, its internal state is preserved. However, if the container is deleted, any data stored inside it is lost. To ensure data (like your database records) persists across deletions, you must use Docker Volumes to map a folder on your Mac to a folder inside the container.