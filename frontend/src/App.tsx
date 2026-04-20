import { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialMode, setTutorialMode] = useState(true);

  const fetchInfo = async () => {
    try {
      //const res = await fetch("http://localhost:3000/info");
      const res = await fetch("https://ca-devops-health-api.gentlecoast-45125362.norwayeast.azurecontainerapps.io/info");

      const data = await res.json();
      setInfo(data);
    } catch (err) {
      console.error("Error fetching info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    const interval = setInterval(fetchInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  const Box = ({ label, color, index }: { label: string; color: string; index: number }) => (
    <div
      onClick={() => {
        if (!tutorialMode || index <= currentStep) {
          setActiveStep(index);
        }
      }}
      style={{
        padding: "12px 20px",
        background: color,
        borderRadius: "10px",
        border: activeStep === index ? "2px solid #22c55e" : "1px solid #475569",
        minWidth: "200px",
        textAlign: "center",
        fontWeight: 600,
        boxShadow:
          activeStep === index
            ? "0 0 0 2px rgba(34,197,94,0.35), 0 0 24px rgba(34,197,94,0.45), 0 10px 30px rgba(0,0,0,0.35)"
            : "0 6px 20px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transform: activeStep === index ? "scale(1.06) translateY(-2px)" : "scale(1)",
        transition: "all 0.2s ease",
        opacity: tutorialMode && index > currentStep ? 0.4 : 1,
      }}>
      {label}
    </div>
  );

  const Arrow = () => (
    <div style={{ fontSize: "20px", color: "#94a3b8", margin: "0 8px" }}>
      →
    </div>
  );

  return (

    <div style={{
      minHeight: "100vh",
      fontFamily: "Arial",
      background: "#0f172a",
      color: "#e2e8f0",
      padding: "30px"
    }}>
      <style>
        {`
      @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
    .pulse-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #22c55e;
      animation: pulse 1.5s infinite;
      margin-right: 6px;
    }
    `}
      </style>
      <h1 style={{ fontSize: "32px" }}>DevOps Health Dashboard</h1>

      <p style={{ color: "#94a3b8" }}>
        Live view of backend API running on Azure
      </p>

      <div style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "12px",
        background: "#111827",
        border: "1px solid #334155"
      }}>
        {loading && <p>Loading API data...</p>}

        {!loading && info && (
          <>
            <p><strong>Status:</strong> <span className="pulse-dot"></span> Healthy</p>
            <p><strong>App:</strong> {info.app}</p>
            <p><strong>Environment:</strong> {info.environment}</p>
            <p><strong>Version:</strong> {info.version}</p>
            <p><strong>Time:</strong> {new Date(info.time).toLocaleString()}</p>
          </>
        )}
      </div>

      <button
        onClick={fetchInfo}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer"
        }}
      >
        Refresh
      </button>
      <div style={{
        marginTop: "30px",
        padding: "16px",
        background: "#111827",
        borderRadius: "12px",
        border: "1px solid #334155"
      }}>
        <h2 style={{ marginTop: 0 }}>Pipeline Status</h2>
        <p><span className="pulse-dot"></span> Build: Success</p>
        <p><span className="pulse-dot"></span> Docker Image: Built</p>
        <p><span className="pulse-dot"></span> Deployment: Active</p>
      </div>

      <div style={{
        marginTop: "40px",
        padding: "20px",
        background: "#111827",
        borderRadius: "12px",
        border: "1px solid #334155"
      }}>
        <h2 style={{ marginTop: 0 }}>System Architecture</h2>

        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}>
          <Box label="1. User Browser" color="#1e293b" index={0} />
          <Arrow />
          <Box label="2. Frontend (Vercel)" color="#1e3a8a" index={1} />
          <Arrow />
          <Box label="3. Backend API (Azure)" color="#064e3b" index={2} />
          <Arrow />
          <Box label="4. CI/CD + Docker (GitHub Actions)" color="#4c1d95" index={3} />
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div style={{
            height: "8px",
            background: "#1e293b",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "10px"
          }}>
            <div style={{
              width: `${(currentStep + 1) * 25}%`,
              height: "100%",
              background: "#22c55e",
              transition: "width 0.3s ease"
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                if (currentStep < 3) {
                  setCurrentStep(currentStep + 1);
                  setActiveStep(currentStep + 1);
                }
              }}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#22c55e",
                color: "#020617",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Next Step
            </button>

            <button
              onClick={() => {
                setCurrentStep(0);
                setActiveStep(0);
              }}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid #475569",
                background: "#1e293b",
                color: "#e2e8f0",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Reset Simulation
            </button>
          </div>
        </div>
        {activeStep !== null && (
          <div style={{
            marginTop: "20px",
            padding: "16px",
            background: "#020617",
            borderRadius: "10px",
            border: "1px solid #334155"
          }}>
            <strong>Step Explanation:</strong>
            <p style={{ marginTop: "8px" }}>
              {activeStep === 0 && "Step 1: User opens the frontend (hosted on Vercel)."}
              {activeStep === 1 && "Step 2: Frontend sends HTTP request to backend API."}
              {activeStep === 2 && "Step 3: Backend (Azure) processes request and returns data."}
              {activeStep === 3 && "Step 4: CI/CD builds Docker image and deploys automatically."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;