# Tier 1 Coding Notes

No consumer-facing Tier 1 component was skipped in this pass.

Internal Figma helper primitives are represented as props or slots on public components:

- Text Field helpers: `Prefix field`, `Suffix field`, `Header`, `Header style`, `Phone prefix`, and `Clickables - Number`
- Chip helpers: `Prefix` and `Prefix settings`
- Search helpers: `Text blinker` and `text`

Design clarification to resolve later: exact production icon assets for prefix/suffix slots. Current stories use text-safe placeholders so Storybook can validate behavior and token usage without inventing an icon set.
