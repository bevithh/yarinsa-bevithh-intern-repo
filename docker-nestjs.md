# Reflection: Containerizing NestJS with Docker

## 1. How does a Dockerfile define a containerized NestJS application?
A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image. For NestJS, it defines the base OS (usually Node-Alpine), sets the working directory, copies the source code, installs dependencies, builds the TypeScript into JavaScript, and defines the command to start the server. It essentially creates a "snapshot" of the environment required for the app to run.

## 2. What is the purpose of a multi-stage build in Docker?
Multi-stage builds allow you to use multiple `FROM` statements in one Dockerfile. 
* **The Builder Stage:** Contains everything needed to compile the code (compilers, full node_modules).
* **The Final Stage:** Only copies the compiled `dist` folder and production dependencies.
This significantly reduces the final image size, improves security by removing source code from the container, and speeds up deployment.

## 3. How does Docker Compose simplify running multiple services together?
Docker Compose allows you to define and run multi-container applications with a single YAML file. Instead of running multiple `docker run` commands manually and trying to link networks, Compose handles the networking between the API and Database automatically. It ensures that services start in the correct order (using `depends_on`) and allows you to manage the entire "stack" with one command: `docker-compose up`.

## 4. How can you expose API logs and debug a running container?
* **Viewing Logs:** Use `docker logs -f focus-bear-api` to see a live stream of the NestJS console logs.
* **Interactive Shell:** Use `docker exec -it focus-bear-api sh` to "enter" the container and look at the files.
* **Docker Desktop:** Use the GUI to view logs, terminal, and resource usage (CPU/RAM) for each container.