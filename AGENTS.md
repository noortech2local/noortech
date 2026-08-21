# Repository workflow preferences

- Treat creating a local Git commit, pushing to GitHub, and updating a website as separate actions.
- When the user asks to commit to GitHub or otherwise ambiguously combines committing and publishing, ask which branch should receive the push before making any remote change.
- At the same time, ask whether the website should be updated. Do not infer a deployment target or publish a site without that confirmation.
- Never commit to, push to, merge into, or otherwise advance `main` unless the user explicitly names `main` and authorizes that action. When no branch is clearly stated, preserve `main` and ask which non-default branch should receive the change.
