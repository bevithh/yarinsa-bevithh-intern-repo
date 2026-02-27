# What are the benefits of running PostgreSQL in a Docker container?

**Simplicity**: No need for a manual OS-level installation; just one file starts the whole DB.

**Isolation**: You can run different PostgreSQL versions for different projects without conflicts.

**Consistency**: Every developer at Focus Bear uses the exact same DB version and configuration.

## How do Docker volumes help persist PostgreSQL data?

By default, containers are "ephemeral"—if you delete the container, your data dies with it. Volumes act like a shortcut from the container’s internal storage (/var/lib/postgresql/data) to your Mac's hard drive. This ensures that your tables and data survive even if you stop or delete the container.

## How can you connect to a running PostgreSQL container?

You can connect internally using docker exec to access the psql CLI, or externally through "Port Mapping" (e.g., 5432:5432) which lets local apps and GUI tools treat the container as if it were running directly on localhost.