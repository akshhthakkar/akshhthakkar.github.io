// netlify/functions/devto-webhook.js
const fetch = require('node-fetch'); // node-fetch for making HTTP requests

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // --- 1. Verify DEV.to Webhook Signature (Highly Recommended for Security) ---
  // Get the secret from Netlify environment variables
  const DEVTO_WEBHOOK_SECRET = process.env.DEVTO_WEBHOOK_SECRET;
  // You'll need to implement signature verification if DEV.to sends one.
  // DEV.to provides `X-Signature` header.
  // For simplicity in this example, we'll skip the actual signature verification,
  // but in a real-world scenario, you MUST verify it to prevent unauthorized triggers.
  // Example for verification (requires 'crypto' module):
  /*
  const crypto = require('crypto');
  const signature = event.headers['x-signature'];
  const hmac = crypto.createHmac('sha256', DEVTO_WEBHOOK_SECRET);
  const digest = hmac.update(event.body).digest('hex');
  if (signature !== digest) {
      console.error("Webhook signature mismatch!");
      return { statusCode: 401, body: "Unauthorized - Signature Mismatch" };
  }
  */
  // For this guide, we'll assume the DEVTO_WEBHOOK_SECRET is set and trust the source for now.
  // If you're building a public site, implement the signature verification!

  // --- 2. Trigger GitHub Action (Repository Dispatch) ---
  const GITHUB_PAT = process.env.GITHUB_PAT; // Your GitHub PAT from Netlify Environment Variable
  const GITHUB_REPO_OWNER = 'akshthakkar'; // Your GitHub username
  const GITHUB_REPO_NAME = 'akshhthakkar.github.io'; // Your repository name
  const GITHUB_DISPATCH_EVENT_TYPE = 'devto_update_trigger'; // Must match type in devto-rebuild.yml

  if (!GITHUB_PAT) {
    console.error("GITHUB_PAT environment variable is not set.");
    return { statusCode: 500, body: "Server configuration error: GitHub PAT missing." };
  }

  try {
    const githubResponse = await fetch(`https://api.github.com/repos/<span class="math-inline">\{akshhthakkar}/</span>{akshhthakkar.github.io}/dispatches`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${GITHUB_PAT}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Netlify-DEV.to-Webhook-Trigger' // Required by GitHub API
      },
      body: JSON.stringify({
        event_type: GITHUB_DISPATCH_EVENT_TYPE,
        client_payload: {
          message: "Triggered by DEV.to webhook"
        }
      })
    });

    if (!githubResponse.ok) {
      const errorBody = await githubResponse.text();
      console.error(`GitHub API error: ${githubResponse.status} - ${errorBody}`);
      return { statusCode: githubResponse.status, body: `Failed to trigger GitHub Action: ${errorBody}` };
    }

    console.log("Successfully triggered GitHub Action.");
    return { statusCode: 200, body: "GitHub Action triggered successfully!" };

  } catch (error) {
    console.error("Error triggering GitHub Action:", error);
    return { statusCode: 500, body: `Error triggering GitHub Action: ${error.message}` };
  }
};

a22v9f8oKGhuEk4Rv1J3sYgW