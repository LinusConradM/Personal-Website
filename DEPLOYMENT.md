# Deployment Instructions
**Live site:** https://conrarlinusm.netlify.app

---

## Every Time You Make Changes

Yes — after any update to `index.html`, you need to redeploy for the changes to go live. You have two options:

---

## Option 1: Drag & Drop (Quick, Manual)

Do this each time you update the site:

1. Go to **https://app.netlify.com**
2. Log in and click on your site (**conrarlinusm**)
3. Go to the **Deploys** tab
4. Drag and drop your entire `personal_website 3` folder onto the deploy area
5. Wait ~30 seconds → your live site updates automatically

> **Tip:** You can also go to https://netlify.com/drop and drop the folder there for a one-step redeploy.

---

## Option 2: GitHub + Auto-Deploy (Recommended — Set Up Once, Then Automatic)

Set this up once and your site will update **automatically every time you save changes** — no manual redeploying needed.

### Step 1: Push your site to GitHub
1. Create a free account at **https://github.com** if you don't have one
2. Create a new repository (e.g. `my-portfolio`)
3. Upload your `index.html` file to the repo

### Step 2: Connect GitHub to Netlify
1. Go to **https://app.netlify.com** → click **Add new site** → **Import from Git**
2. Choose **GitHub** and select your `my-portfolio` repo
3. Click **Deploy site**

### Step 3: From now on — just save your file
- Whenever you update `index.html` and push to GitHub, Netlify detects the change and redeploys automatically within ~1 minute
- No dragging and dropping ever again

---

## What File to Edit

All your website content lives in one file:

```
personal_website 3/
└── index.html   ← Edit this file for all changes
```

---

## Quick Reference

| Action | What to do |
|---|---|
| Update a job title or date | Edit `index.html`, then redeploy |
| Add a new role | Edit `index.html`, then redeploy |
| Change colors or layout | Edit `index.html`, then redeploy |
| Add a profile photo | Add image to folder, reference in `index.html`, then redeploy |
