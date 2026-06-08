# Setup

A Claude Code skill that begins a work session well.

Setup asks you a few short questions up front, then runs three things quietly
underneath: it keeps a memory of what worked and what broke, it checks its own
claims before calling them done, and it adjusts to how you like to work. You only
see the questions. The rest runs in the background.

It is the sister skill to Eidolon. Eidolon sets up a repository so Claude
understands it. Setup sets up a session inside it.

## Use

```
/setup    ask the opening questions and load the parts you choose
```

You do not need to say the word "setup." It runs at the start of real work.

## The opening questions

1. Which parts do you want this session: remember, check my work, or both.
2. How should I treat "go ahead": you checked it, you trust a second look, or do the cheap steps then pause.
3. How far should I run before checking: one step, until tests pass, or the whole plan.
4. What kind of work is this: routine, a judgment call, or wrapping up.

Your answers set what loads and how careful to be. Setup can also hand them to
Eidolon by writing a small `.claude/session.yaml` that Eidolon reads, so the two
skills work together without repeating themselves.

## Where this comes from

Setup is the plain-language version of three skills, which stay the source of record:

- dual-log-memory (the remember part)
- trust-but-verify (the check part)
- ai-pairing-playbook (the work-style part)

## Status

Early days. Built by Jonah Butterbaugh, alongside Claude.
