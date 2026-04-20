import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

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
            background: linear-gradient(180deg, #0f172a 0%, #111827 60%, #020617 100%);
            color: #e2e8f0;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 48px 20px;
          }
          .badge {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 999px;
            background: #1e293b;
            color: #60a5fa;
            font-size: 13px;
            margin-bottom: 18px;
            border: 1px solid #334155;
          }
          h1 {
            font-size: 42px;
            margin: 0 0 12px;
            background: linear-gradient(90deg, #60a5fa, #22c55e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          p {
            line-height: 1.7;
            color: #d1d5db;
            font-size: 15px;
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
            border-radius: 16px;
            padding: 22px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          }
          .card h2 {
            margin-top: 0;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }
          .grid .card:nth-child(1) h2 {
            color: #22c55e;
          }
          .grid .card:nth-child(2) h2 {
            color: #60a5fa;
          }
          .grid .card:nth-child(3) h2 {
            color: #f59e0b;
          }
          .grid .card:nth-child(4) h2 {
            color: #a78bfa;
          }
          code {
            display: block;
            margin-top: 10px;
            padding: 12px;
            border-radius: 10px;
            background: #020617;
            color: #60a5fa;
            border: 1px solid #1e293b;
            font-size: 14px;
            overflow-x: auto;
          }
          a {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
          ul {
            padding-left: 18px;
            color: #cbd5e1;
          }
          li {
            margin-bottom: 6px;
          }
          strong {
            color: #e2e8f0;
          }
          .card p {
            margin: 6px 0;
          }
          .card + .card {
            margin-top: 20px;
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

          <p>
            <a href="https://devops-health-api.vercel.app" target="_blank">
              Open Live Frontend Dashboard
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
            </div>

            <div class="card">
              <h2>Frontend Dashboard</h2>
              <p>
                A separate React frontend is deployed to demonstrate real-world system design.
                It consumes this API and shows live data updates.
              </p>
              <ul>
                <li>Runs independently from backend</li>
                <li>Deployed on a free hosting platform</li>
                <li>Demonstrates frontend-backend integration</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h2>Delivery flow</h2>
            <code>Code → GitHub → GitHub Actions → Docker Image → GHCR → Azure Container Apps → Live URL</code>
            ${appUrl ? `<p><a href="${appUrl}/health">Open /health</a> · <a href="${appUrl}/info">Open /info</a></p>` : ""}
          </div>

          <div class="card">
            <h2>Architecture Flow</h2>
            <code>
Browser → Frontend (Vercel) → API (Azure Container Apps)            </code>
            <p>
              This flow shows how the live system works at runtime: the user opens the frontend,
              the frontend calls the backend API, and the backend returns data to the UI.
            </p>
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
  console.log("INFO ENDPOINT HIT");
  res.json({
    app: "devops-health-api",
    environment: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || "local",
    time: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});