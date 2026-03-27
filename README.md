# intern_practice

A repository for interns to practice basic Git commands in a safe environment.

---

## Getting Started

Before you begin, make sure Git is installed on your machine:

```bash
git --version
```

If it's not installed, follow the [official Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

---

## Practice Exercises

Work through the exercises below in order. Each one introduces a new Git concept.

### Exercise 1 — Clone the Repository

Get a local copy of this repository:

```bash
git clone https://github.com/annaTSI/intern_practice.git
cd intern_practice
```

### Exercise 2 — Configure Git

Set your name and email so your commits are properly attributed:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Verify the configuration:

```bash
git config --list
```

### Exercise 3 — Check Repository Status

See the current state of your working directory:

```bash
git status
```

### Exercise 4 — Create a Branch

Never work directly on `main`. Create a new branch named after yourself:

```bash
git checkout -b practice/<your-name>
# Example: git checkout -b practice/jane-smith
```

Verify you switched to the new branch:

```bash
git branch
```

### Exercise 5 — Make a Change

Open `CONTRIBUTORS.md` and add your name and a short introduction at the bottom of the file, following the existing format.

### Exercise 6 — Stage Your Changes

Add your changes to the staging area:

```bash
# Stage a specific file
git add CONTRIBUTORS.md

# Or stage everything at once
git add .
```

Check what is staged:

```bash
git status
git diff --staged
```

### Exercise 7 — Commit Your Changes

Save your staged changes with a descriptive message:

```bash
git commit -m "Add <your-name> to CONTRIBUTORS.md"
```

View the commit history:

```bash
git log --oneline
```

### Exercise 8 — Push Your Branch

Upload your branch to GitHub:

```bash
git push origin practice/<your-name>
```

### Exercise 9 — Open a Pull Request

1. Go to [github.com/annaTSI/intern_practice](https://github.com/annaTSI/intern_practice).
2. Click **Compare & pull request** for your branch.
3. Write a short description of your change and submit.

### Exercise 10 — Sync with the Latest Changes

While your PR is open, others may have merged changes into `main`. Stay up to date:

```bash
git fetch origin
git merge origin/main
```

If there are conflicts, open the affected files, resolve the markers (`<<<<<<<`, `=======`, `>>>>>>>`), stage the resolved files, and run:

```bash
git merge --continue
```

---

## Quick Reference

| Command | Description |
|---|---|
| `git clone <url>` | Clone a remote repository locally |
| `git status` | Show the working tree status |
| `git branch <name>` | Create a new branch |
| `git checkout <branch>` | Switch to a branch |
| `git checkout -b <branch>` | Create and switch to a new branch |
| `git add <file>` | Stage a file for commit |
| `git commit -m "<msg>"` | Commit staged changes |
| `git push origin <branch>` | Push a branch to the remote |
| `git pull` | Fetch and merge changes from the remote |
| `git fetch origin` | Download remote changes without merging |
| `git merge <branch>` | Merge a branch into the current branch |
| `git log --oneline` | View a compact commit history |
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |

---

## Need Help?

- [Pro Git Book (free)](https://git-scm.com/book/en/v2)
- [GitHub Docs — Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git)
- Ask a colleague or your team lead!
