# Wedding RSVP Page – Deployment Instructions

## Step 1: Get Your Google Form Entry IDs

Your form submits to Google Forms using `entry.XXXXX` field names. You must replace the placeholders in `index.html` with your actual IDs.

### Method A: Inspect the form (recommended)

1. Open your Google Form: https://docs.google.com/forms/d/e/1FAIpQLSeNS8bNMZ8BWRgN9w5oUHEDpHOF7ojSw-1QuKvU2nodQlSaDw/edit  
2. Right‑click on a question label (e.g. “Your Name”) → **Inspect**  
3. In the Elements panel, look for `name="entry.123456789"` or `data-item-id="123456789"`  
4. The number is the entry ID. Use it as `entry.123456789` in the HTML.

### Method B: Pre-filled link

1. In the form editor, click **⋮** (three dots) → **Get pre-filled link**  
2. Fill in sample answers and click **Get link**  
3. The URL will look like: `...?entry.123456789=John&entry.987654321=Yes`  
4. Use those numbers for each field in `index.html`.

### Fields to update in `index.html`

Search for `entry.XXXXX` and replace with your IDs:

- **Your Name** – name input
- **Can you attend?** – both radio inputs (same ID)
- **Which events would you be attending?** – all three checkboxes (same ID for multi-select)
- **Would you need accommodation?** – both radio inputs (same ID)
- **Number of guests** – number input
- **When will you be arriving?** – date input
- **When will you leave?** – date input

Remove or comment out any inputs for fields your form does not have.

---

## Step 2: Host on GitHub Pages

### Option A: New repository

1. Create a GitHub account at https://github.com if needed.  
2. Click **New repository**.  
3. Name it (e.g. `wedding-rsvp`), set to **Public**, and create.  
4. Click **uploading an existing file** and drag `index.html` into the repo.  
5. Commit the file.  
6. Go to **Settings** → **Pages**.  
7. Under **Source**, choose **Deploy from a branch**.  
8. Branch: `main`, folder: `/ (root)`, then **Save**.  
9. Wait 1–2 minutes. Your site will be at:  
   `https://<username>.github.io/<repo-name>/`

### Option B: Existing repository

1. Add `index.html` to the root of your repo (or a folder like `docs/`).  
2. If using a folder, set **Pages** source to that folder.  
3. Commit and push. The site will be available at the URL shown in **Settings → Pages**.

---

## Step 3: Test the RSVP

1. Open your GitHub Pages URL.  
2. Fill in the form and submit.  
3. Check your Google Sheet linked to the form to confirm the response appears.  
4. If it doesn’t, verify all `entry.XXXXX` IDs match your form.

---

## Step 4: Custom domain (optional)

1. In your repo, add a file named `CNAME` with your domain (e.g. `rsvp.yourwedding.com`).  
2. In your domain DNS, add a CNAME record pointing to `username.github.io`.  
3. In **Settings → Pages**, set the custom domain.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Responses not in Google Sheet | Check that all `entry.XXXXX` IDs match your form. |
| “No” button not moving | Ensure JavaScript is enabled; test in a modern browser. On mobile, the button moves when your finger gets close. Double-click the “No” area to select it if you give up. |
| Form redirects away | Confirm `target="hidden-iframe"` is set on the form. |
| Page not loading on GitHub Pages | Wait a few minutes after enabling Pages; check the Pages tab for build status. |
