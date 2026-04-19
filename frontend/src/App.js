"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function App() {
    const [info, setInfo] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const fetchInfo = async () => {
        try {
            const res = await fetch("http://localhost:3000/info");
            const data = await res.json();
            setInfo(data);
        }
        catch (err) {
            console.error("Error fetching info:", err);
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchInfo();
    }, []);
    return (<div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>DevOps Health Dashboard</h1>

      {loading && <p>Loading...</p>}

      {!loading && info && (<div>
          <p><strong>App:</strong> {info.app}</p>
          <p><strong>Environment:</strong> {info.environment}</p>
          <p><strong>Version:</strong> {info.version}</p>
          <p><strong>Time:</strong> {info.time}</p>
        </div>)}

      <button onClick={fetchInfo}>Refresh</button>
    </div>);
}
exports.default = App;
