import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    name: "devops-health-api",
    version: process.env.APP_VERSION || "local",
    message: "API is running v3"
  });
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
    commitSha: process.env.GITHUB_SHA || "local",
    time: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});