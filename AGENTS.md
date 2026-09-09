# Repository workflow preferences

- Treat creating a local Git commit, pushing to GitHub, and updating a website as separate actions.
- When the user asks to commit to GitHub or otherwise ambiguously combines committing and publishing, ask which branch should receive the push before making any remote change.
- When the user requests publishing, deploy to GitHub Pages unless they explicitly specify another destination. Do not ask which hosting destination to use. A commit-only request does not authorize publishing.
- Never commit to, push to, merge into, or otherwise advance `main` unless the user explicitly names `main` and authorizes that action. When no branch is clearly stated, preserve `main` and ask which non-default branch should receive the change.
