<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# Privy: ALWAYS fetch current docs before coding

Before any Privy auth work, fetch the live documentation — do not rely on training data:

- Overview + routing guide: https://docs.privy.io/llms.txt
- Full API reference: https://docs.privy.io/llms-full.txt

Or invoke the `@agent-privy` agent which handles this automatically.
