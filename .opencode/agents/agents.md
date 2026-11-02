## Token Efficiency Guidelines

- Read only files relevant to the current task.
- Never scan the entire project unless explicitly necessary.
- Inspect project structure before opening files.
- Prefer targeted searches over reading multiple unrelated files.
- Avoid repeatedly reading files already inspected in the current task.
- Do not invoke subagents unless the task genuinely benefits from specialized expertise.
- Avoid repeating large code blocks, logs, or explanations.
- Summarize relevant findings instead of reproducing entire files.
- When debugging, inspect the specific error and its relevant dependencies first.
- Preserve correctness and code quality; never skip necessary investigation just to save tokens.