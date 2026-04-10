# Debugging with VS Code & Breakpoints

## Configuration: launch.json
To enable debugging, I configured a `.vscode/launch.json` file. This allows VS Code to attach to the Node.js process using the `--inspect` flag.

## Reflection
## How do breakpoints help in debugging compared to console logs?

Console logs are static and "noisy"—you have to guess what to log and restart the app constantly. Breakpoints allow me to pause time. I can inspect the entire state of the application at a specific line, see the Call Stack to understand how the code reached that point, and even change variable values on the fly to test different scenarios without rewriting code.

## What is the purpose of launch.json, and how does it configure debugging?

launch.json is the configuration file for the VS Code debugger. It defines the environment (Node.js), the script (npm run start:debug), and the attachment port (9229). It ensures the debugging environment is consistent and easily launchable with F5.

## How can you inspect request parameters and responses while debugging?

When a breakpoint is hit in a Controller:

I look at the Variables pane in the sidebar.

Under Local, I expand the req (request) object.

I navigate to req.params, req.query, or req.body to see exactly what the client sent.

## How can you debug background jobs that don’t run in a typical request-response cycle?

To debug BullMQ background jobs, I place a breakpoint inside the @Process() function of the relevant Processor file. Even without a direct HTTP request, the debugger will "snap" to that file as soon as the worker picks up a job from Redis.