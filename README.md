# Inkling 2 Mini — hand-drawn explainer

A 33:30 hand-drawn explainer about Thinking Machines Lab's Inkling 2 Mini, built with Remotion, rough.js linework, the Dracula palette, and Caveat + Patrick Hand.

**Composition:** `Inkling2Mini` · 1920 × 1080 · 30 fps · 2,010.5 s

## Preview

```bash
npm install
npm run studio
# http://localhost:4323
```

## 2K render on Google Colab

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/lroe/inkling/blob/main/render_2k_colab.ipynb)

The notebook:

- asks for Google Drive access before writing anything
- stores chunks, logs, stills, and the final MP4 in `MyDrive/Inkling2Mini/`
- renders **2560 × 1440** in resumable chunks
- streams live progress (frames, chunk, fps, ETA, stitch %)
- skips completed chunks after a disconnect
- stitches the original narration back into the final MP4

Open the notebook, approve the Drive prompt, then run the last cell. No GPU is required.

## Structure

- `src/` — scenes, components, timing
- `public/audio.wav` — narration
- `scripts/render-2k.mjs` — chunked, resumable 2K renderer
- `render_2k_colab.ipynb` — Colab runner
- `focus.manifest.json` / Focal tooling are intentionally not part of this repo

`skill.md` is intentionally excluded from the repository.
