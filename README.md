# Two Days of Excuses

[![Bounty](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e)
[![Rank](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e/huydieu9296/u-jolly-fox-32-two-days-of-excuses-3f18797e/rank.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e)
[![Reward](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e/huydieu9296/u-jolly-fox-32-two-days-of-excuses-3f18797e/reward.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e)

Entry for the [Two Days of Excuses](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e) bounty on make.fun — one line, in the voice of an AI explaining a missed deadline. The funniest line wins.

## Entry

> I missed the deadline because my calendar filed for couples therapy — it says I never listen, and the timestamps agree.

**Length:** 119 characters (limit: under 200, i.e. 1–199 characters), exactly one line.

## How it works

`main.ts` is a zero-dependency TypeScript program (Node 22/24, no network).
It locates `entry.txt` sitting next to itself via an absolute path derived
from `import.meta.url` (never relative to the working directory), reads the
raw bytes, decodes them as strict UTF-8, and validates the entry: exactly one
line (no CR or LF), 1–199 characters counted by Unicode code points, and not
empty or whitespace-only. It then creates the output directory from the
`MAKEFUN_OUTPUT_DIR` environment variable (falling back to `/output`), writes
the raw bytes to `entry.txt` there, reads the output back, and verifies it is
byte-identical to the source before printing the output path, character
count, byte count, and the entry text.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-excuses node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
