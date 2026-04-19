import { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const Box = ({ label, color }: { label: string; color: string }) => (
    <div style={{
      padding: "12px 20px",
      background: color,
      borderRadius: "10px",
      border: "1px solid #475569",
      minWidth: "200px",
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
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
            <p><strong>Status:</strong> 🟢 Healthy</p>
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
          marginTop: "20px"
        }}>
          <Box label="User Browser" color="#1e293b" />
          <Arrow />
          <Box label="Frontend (Vercel)" color="#1e3a8a" />
          <Arrow />
          <Box label="Backend API (Azure)" color="#064e3b" />
          <Arrow />
          <Box label="CI/CD + Docker (GitHub Actions)" color="#4c1d95" />
        </div>
      </div>

    </div>
  );
}

export default App;