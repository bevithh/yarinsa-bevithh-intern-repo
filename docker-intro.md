# How does Docker differ from a virtual machine?

Docker is a form of Operating System level virtualization. Unlike a VM, which requires a hypervisor and a "Guest OS," Docker containers share the host's operating system. This makes containers significantly more efficient in terms of CPU and RAM usage.

## Why is containerization useful for a backend like Focus Bear’s?

For a backend service, containerization ensures that the exact versions of libraries, environment variables, and configurations are identical across every developer's machine and the production cloud. It simplifies the onboarding process for new interns like me, as I can start the entire backend with a single command instead of manually installing databases and runtimes.

## How do containers help with dependency management?

Containers package the application code along with its specific dependencies (e.g., a specific version of FastAPI or a C# runtime) into a single "Image." This prevents "dependency hell," where updating a library for one project might break another project on your local machine.

## What are the potential downsides of using Docker?

**Complexity**: There is a learning curve to understanding Dockerfiles and networking.

**Platform differences**: While Docker is very consistent, containers built on a Mac (ARM) sometimes behave differently than those on Linux (x86) if not handled correctly.

**Resource Monitoring**: It can be harder to monitor the health and logs of many small containers compared to one single large application.