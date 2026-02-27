# What is the purpose of CI/CD?

The purpose is to create an automated "quality gate" for the repository. It ensures that every time code is proposed via a Pull Request, it is automatically checked for errors, style violations, and broken tests before it can affect the main project.

## How does automating style checks improve project quality?

Automation removes the "human element" from code reviews. Instead of a teammate having to manually point out a typo or a long line, the system does it instantly. This keeps the documentation consistent, professional, and easy for everyone to read, regardless of who wrote the file.

## What are some challenges with enforcing checks in CI/CD?

One major challenge is "Rule Strictness." As seen in this task, default rules (like the 80-character line limit) can be too rigid for certain workflows, leading to hundreds of "errors" that aren't actually breaking the project. Configuring the CI to ignore these specific rules while still catching "real" errors (like broken links or invalid syntax) requires precise configuration and troubleshooting.

## How do CI/CD pipelines differ between small projects and large teams?

In a small project or an intern repo, the pipeline usually focuses on basic linting and unit tests to keep things tidy. In large teams, the pipeline is much more complex, it might include security scans for secrets, performance benchmarking, and automated deployment to "staging" servers so the app can be tested by QA before it ever goes live.
