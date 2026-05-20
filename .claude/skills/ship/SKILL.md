---
name: ship
description: Stage changes, write a scoped conventional commit with Opus co-author trailer, and optionally push to remote.
disable-model-invocation: true
---

Given $ARGUMENTS (optional hints about scope or what changed):

1. Run `git status` to show the current working tree state.
2. Identify which files to stage. Ask if ambiguous.
3. Stage the relevant files.
4. Draft a commit message using **scoped Conventional Commits**:
   - Format: `type(scope): description`
   - Type: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`
   - Scope: pick the closest match — `auth`, `assets`, `tokenize`, `dashboard`, `copilot`, `ui`, `api`, `config`, `docs`
   - Subject line under 72 characters (not counting the trailer)
   - Always include the co-author trailer in the body:
     ```
     Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
     ```
   - Full example:
     ```
     feat(auth): add two-column login page with Privy flows

     Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
     ```
5. Show the draft and ask the user to confirm or edit before committing.
6. Create the commit using a heredoc to preserve the multi-line body:
   ```bash
   git commit -m "$(cat <<'EOF'
   feat(scope): description

   Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
   EOF
   )"
   ```
7. Ask the user whether to push to the current remote branch.
