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

# 3.3 Reflection
**What does git bisect do?**
git bisect is a debugging tool that uses a binary search to find the exact commit that introduced a bug. By marking a "good" version and a "bad" version, Git automatically checks out the middle commits for you to test, narrowing down the culprit quickly.

**When would you use it in a real-world debugging situation?**
I would use it in a large backend project when a feature that worked yesterday is suddenly broken today. If there have been dozens of commits since the last working version, git bisect saves me from having to manually check every single one to find where the logic failed.

**How does it compare to manually reviewing commits?**
Manually reviewing is fine for small changes, but it's inefficient for long histories. git bisect is mathematically faster finding a bug in 100 commits takes only about 7 steps, whereas manual review could take 100. It turns a "guessing game" into a structured process.