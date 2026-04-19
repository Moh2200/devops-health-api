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
    </div>
  );
}

export default App;