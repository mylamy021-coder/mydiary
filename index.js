import { useState, useEffect } from "react";

export default function Home() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Load diary entries from localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(savedEntries);
  }, []);

  // Save diary entries to localStorage
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      setRole("admin");
      setPage("admin");
    } else if (email === "user@example.com" && password === "user123") {
      setRole("user");
      setPage("diary");
    } else {
      alert("Invalid credentials!");
    }
  };

  const addEntry = () => {
    if (text.trim() !== "") {
      if (editIndex !== null) {
        const updated = [...entries];
        updated[editIndex] = text;
        setEntries(updated);
        setEditIndex(null);
      } else {
        setEntries([...entries, text]);
      }
      setText("");
    }
  };

  const deleteEntry = (i) => {
    const updated = entries.filter((_, idx) => idx !== i);
    setEntries(updated);
  };

  const editEntry = (i) => {
    setText(entries[i]);
    setEditIndex(i);
  };

  const logout = () => {
    setRole(null);
    setPage("home");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{textAlign:"center", marginTop:"30px", fontFamily:"Arial"}}>
      {page === "home" && (
        <>
          <h1>📖 Welcome to My Diary App</h1>
          <button onClick={() => setPage("login")}>Go to Login</button>
        </>
      )}

      {page === "login" && (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email}
              onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
            <input type="password" placeholder="Password" value={password}
              onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
            <button type="submit">Login</button>
          </form>
        </>
      )}

      {page === "diary" && role === "user" && (
        <>
          <h1>My Diary</h1>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} />
          <br/><br/>
          <button onClick={addEntry}>{editIndex !== null ? "Update Entry" : "Add Entry"}</button>
          <button onClick={logout} style={{marginLeft:"10px"}}>Logout</button>
          <ul style={{listStyle:"none", padding:0}}>
            {entries.map((entry, i) => (
              <li key={i} style={{margin:"10px", border:"1px solid #ccc", padding:"10px"}}>
                {entry}
                <br/>
                <button onClick={() => editEntry(i)}>Edit</button>
                <button onClick={() => deleteEntry(i)} style={{marginLeft:"10px"}}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {page === "admin" && role === "admin" && (
        <>
          <h1>Admin Dashboard</h1>
          <p>Admin can view all diary entries:</p>
          <button onClick={logout}>Logout</button>
          <ul style={{listStyle:"none", padding:0}}>
            {entries.map((entry, i) => (
              <li key={i} style={{margin:"10px", border:"1px solid #ccc", padding:"10px"}}>
                {entry}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
