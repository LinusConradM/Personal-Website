# Deployment

**Live site:** https://conradlinusmuhirwe.netlify.app/

The site is built with Astro. `netlify.toml` tells Netlify to run `npm run build` with Node 22 and publish `dist/`, so no settings need changing in the Netlify dashboard.

## Automatic (GitHub connected to Netlify)

Merge to `main` and Netlify builds and publishes within a minute or two. Check progress under **Deploys** at https://app.netlify.com.

If a deploy fails, open the deploy log. The usual causes are a Node version below 22.23 (set by `NODE_VERSION` in `netlify.toml`) or a build error that `npm run build` also shows locally.

## Manual (drag and drop)

```bash
cd ~/Projects/Personal-Website
git pull
npm install
npm run build
```

Then drag the `dist` folder (not the project folder) onto the deploy area of the site's **Deploys** tab, or onto https://app.netlify.com/drop.

## After deploying

- Open the home page and the three case studies, and switch the theme toggle.
- Share preview: paste a page URL into https://www.opengraph.xyz to see the share image.
