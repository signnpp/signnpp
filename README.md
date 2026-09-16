# SIGNN++ project page

A static page. No build step, no dependencies: `index.html` plus a stylesheet,
one script, and a folder of images.

## Before you publish: this is an anonymous submission

ICRA review is double-blind. A public page that a reviewer can connect to the
submission de-anonymises it, and the connection does not have to be a name — a
GitHub account, a lab logo, a university domain, or a commit history is enough.

Two safe options:

1. **Keep the repository private until the reviews are back.** GitHub Pages on a
   private repo needs a paid plan, so in practice this means committing the page
   now and enabling Pages later.
2. **Publish anonymously** from an account with no identifying history, and do
   not link the page from the submitted PDF.

Every place that needs updating after acceptance is marked `ANON` in
`index.html`: the author line, the resource links, the BibTeX block, and the
footer acknowledgement.

## Deploy

Copy the contents of this folder into your repository, then:

```
git add .
git commit -m "Add project page"
git push
```

In the repository, open **Settings → Pages**, set **Source** to *Deploy from a
branch*, and pick either:

- branch `main`, folder `/docs` — put these files in a `docs/` folder, or
- branch `gh-pages`, folder `/` — put them at the root of that branch.

The page appears at `https://<user>.github.io/<repo>/` within a minute or two.

All paths in the page are relative, so it works at any repository name without
edits, and it also works by opening `index.html` directly from disk.

## Adding figures

Export each figure and drop it into `static/images/` under the exact name the
placeholder shows on the page:

| File | Where it appears |
| --- | --- |
| `teaser.png` | top of the page, under the title |
| `architecture.png` | How it works |
| `sequence.png` | Continuous sequences |
| `blur.png`, `cloud.png`, `streak.png` | Identification under real conditions |

Nothing else needs changing. The script probes each filename on load and swaps
the placeholder for the image when the file is there, so a missing figure
degrades to a labelled box instead of a broken image icon.

Use PNG or JPEG, around 1600 px on the long edge. PDF figures do not display in
a browser — export from your LaTeX figures rather than cropping the paper PDF,
so the text in them stays sharp.

## Adding the links

In `index.html`, find the `nav.links` block. Each button is:

```html
<a class="btn pending" href="#" aria-disabled="true">Paper</a>
```

Set the real `href`, then remove `class="btn pending"` down to `class="btn"` and
delete `aria-disabled="true"`. A button left as `pending` renders struck through
and is not clickable, which is honest about what is not available yet — better
than a link that 404s.

For the paper itself, put the PDF at `static/pdf/signnpp.pdf` and point the
Paper button at it.

## Adding a video

There is no video section yet, because an empty player is worse than none. When
you have one, add this inside `<main>`:

```html
<section class="band" id="video">
  <h2>Video</h2>
  <video controls playsinline width="100%" poster="static/images/poster.png">
    <source src="static/videos/overview.mp4" type="video/mp4">
  </video>
</section>
```

Keep it under about 50 MB — GitHub warns above 50 MB and blocks at 100 MB. For
anything larger, host on YouTube and embed an `<iframe>` instead.

## Editing the text

The numbers in the results tables are transcribed from the paper. If a table in
the paper changes, the page does not follow automatically — search the value and
update both. The paragraph under the random-view table contains the paired
comparison against Tetra; keep it consistent with whatever the paper's own
wording ends up being.

## Checking it before you push

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening the file directly also works, but a
server is closer to what GitHub Pages does.
