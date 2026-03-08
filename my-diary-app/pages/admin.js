import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>Admin Dashboard</h1>
      <p>Here admin can manage diary entries (future feature).</p>
    </div>
  );
}
