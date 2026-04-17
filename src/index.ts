import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Root endpoint
app.get("/", (_req, res) => {
  const appUrl = process.env.APP_URL || "";

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DevOps Health API</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #e2e8f0;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 48px 20px;
          }
          .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 999px;
            background: #1e293b;
            color: #93c5fd;
            font-size: 14px;
            margin-bottom: 16px;
          }
          h1 {
            font-size: 40px;
            margin: 0 0 12px;
          }
          p {
            line-height: 1.6;
            color: #cbd5e1;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
            margin: 32px 0;
          }
          .card {
            background: #111827;
            border: 1px solid #334155;
            border-radius: 14px;
            padding: 20px;
          }
          .card h2 {
            margin-top: 0;
            font-size: 18px;
          }
          code {
            display: block;
            margin-top: 8px;
            padding: 10px;
            border-radius: 8px;
            background: #020617;
            color: #93c5fd;
            overflow-x: auto;
          }
          a {
            color: #93c5fd;
            text-decoration: none;
          }
          ul {
            padding-left: 18px;
          }
          .footer {
            margin-top: 32px;
            font-size: 14px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">Live DevOps Portfolio Project</div>
          <h1>DevOps Health API</h1>
          <p>
            This project demonstrates a complete DevOps flow for a Node.js + TypeScript API:
            Docker containerization, GitHub Actions CI/CD, GitHub Container Registry, and Azure Container Apps deployment.
          </p>

          <p>
        <a href="https://github.com/Moh2200/devops-health-api" target="_blank">
            View source code on GitHub
        </a>
          </p>

          <div class="grid">
            <div class="card">
              <h2>What this proves</h2>
              <ul>
                <li>Backend service built with Node.js and TypeScript</li>
                <li>Docker image build and packaging</li>
                <li>CI pipeline with GitHub Actions</li>
                <li>CD pipeline to Azure Container Apps</li>
                <li>Live cloud deployment with public URL</li>
              </ul>
            </div>

            <div class="card">
              <h2>Useful endpoints</h2>
              <p>Use these endpoints to verify the system:</p>
              <code>GET /health</code>
              <code>GET /info</code>
            </div>

            <div class="card">
              <h2>Deployment info</h2>
              <p><strong>Version:</strong> ${process.env.APP_VERSION || "local"}</p>
              <p><strong>Environment:</strong> ${process.env.NODE_ENV || "development"}</p>
              <p><strong>Commit:</strong> ${process.env.GITHUB_SHA?.slice(0,7) || "unknown"}</p>
            </div>
          </div>

          <div class="card">
            <h2>Delivery flow</h2>
            <code>Code → GitHub → GitHub Actions → Docker Image → GHCR → Azure Container Apps → Live URL</code>
            ${appUrl ? `<p><a href="${appUrl}/health">Open /health</a> · <a href="${appUrl}/info">Open /info</a></p>` : ""}
          </div>

          <p class="footer">
            Built as a portfolio project to demonstrate practical DevOps and platform engineering fundamentals.
          </p>
        </div>
      </body>
    </html>
  `);
});

// Health endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// Info endpoint (verify deployments)
app.get("/info", (_req, res) => {
  res.json({
    app: "devops-health-api",
    environment: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || "local",
    commitSha: process.env.GITHUB_SHA?.slice(0, 7),
    time: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});