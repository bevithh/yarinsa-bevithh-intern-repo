# Git Understanding: Merge Conflicts

## What caused the conflict?
The conflict was caused by competing changes on the same line of the same file (`conflict_test.txt`). 
1. I created a `feature-branch` and edited line 1.
2. I switched back to the `main` branch and edited the exact same line 1 with different text.
3. When I attempted to `git merge feature-branch` into `main`, Git could not determine which version of the line was correct, resulting in a merge conflict.

## How did you resolve it?
I resolved the conflict locally using **VS Code**. 
1. I opened `conflict_test.txt` and identified the merge markers (`<<<<<<<`, `=======`, and `>>>>>>>`).
2. I used the VS Code "Merge Editor" to Accept Current Change.
3. After choosing the correct version, I saved the file.
4. I finalized the resolution by running `git add conflict_test.txt` and `git commit` to complete the merge.

## What did you learn?
* **Git is a Safety Net:** Conflicts aren't errors; they are Git's way of preventing accidental data loss when two versions of code overlap.
* **Communication is Key:** In a real backend environment, I learned that before resolving a conflict, I should check with my team members to ensure I’m not overwriting critical logic.
* **Pull Frequently:** To minimize large conflicts, it’s best to pull changes from `main` often so that my local branch stays closely aligned with the team's progress.

<<<<<<< HEAD
# 3.3 Reflection
**What does git bisect do?**
git bisect is a debugging tool that uses a binary search to find the exact commit that introduced a bug. By marking a "good" version and a "bad" version, Git automatically checks out the middle commits for you to test, narrowing down the culprit quickly.

**When would you use it in a real-world debugging situation?**
I would use it in a large backend project when a feature that worked yesterday is suddenly broken today. If there have been dozens of commits since the last working version, git bisect saves me from having to manually check every single one to find where the logic failed.

**How does it compare to manually reviewing commits?**
Manually reviewing is fine for small changes, but it's inefficient for long histories. git bisect is mathematically faster finding a bug in 100 commits takes only about 7 steps, whereas manual review could take 100. It turns a "guessing game" into a structured process.
=======
# PR Reflection
*Why are PRs important in a team workflow?*
PRs are the bridge between individual work and the main project. They act as a quality control step where teammates can catch bugs, suggest cleaner logic, and ensure everyone is on the same page. It prevents one person from accidentally breaking the app for everyone else.

*What makes a well-structured PR?*
A well-structured PR is easy for a reviewer to understand. It needs a clear title, a brief summary of what changed, and a mention of why the change was made. Keeping PRs small and focused on a single task makes them much faster to review and approve.

*What did you learn from reviewing an open-source PR?*
Reviewing a public PR (like on the React or VS Code repos) showed me how developers use comments to ask helpful questions instead of just pointing out mistakes. It taught me that the goal of a PR is to make the code better as a team, not just to prove that the code works. 

this sentence is for issue #61

# Reflection 3.2
*What makes a good commit message?*
A good commit message is short, clear, and written in the imperative mood (e.g., Fix bug instead of Fixed bug). It usually starts with a category like feat: for new features, fix: for bug fixes, or docs: for documentation updates. This makes the history easy to scan at a glance.

*How does a clear commit message help in team collaboration?*
It acts as a map for the team. When a teammate looks at the project history, they can quickly understand what changes were made without having to read every line of code. It also makes Pull Requests much easier to review because the intent of each change is clear.

*How can poor commit messages cause issues later?*
Poor messages like fixed stuff or final fix make it impossible to use tools like git blame or git log effectively. If a bug is discovered weeks later, a vague history makes it very difficult to track down exactly when and why the breaking change was introduced, leading to hours of wasted debugging time.
>>>>>>> a12f287129c4fcd138bbcec2fac837d713ba8f81
