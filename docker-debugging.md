# How can you check logs from a running container?

You use the docker logs <container_name> command. Adding the -f flag is particularly useful for backend development because it allows you to see incoming requests and stack traces in real-time as you interact with the API.

## What is the difference between docker exec and docker attach?

docker exec creates a new process inside an existing container (like opening a new terminal tab). docker attach connects your terminal to the container's main process. Generally, exec is safer for debugging because exiting won't accidentally stop the entire container.

## How do you restart a container without losing data?

Data persistence is handled by Volumes. As long as your docker-compose.yml has a volume mapped (like postgres_data), you can stop, restart, or even completely delete and rebuild the container without losing your database records. The data lives on your MacBook, not inside the "disposable" container.