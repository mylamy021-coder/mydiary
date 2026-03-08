import { useState, useEffect } from "react";

export default function Diary() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      window.location.href = "/login";
    }
  }, []);

  const addEntry = () => {
    if (text.trim() !== "") {
      setEntries([...entries, text]);
      setText("");
    }
  };

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>My Diary</h1>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} />
      <br/><br/>
      <button onClick={addEntry}>Add Entry</button>
      <ul>
        {entries.map((entry, i) => <li key={i}>{entry}</li>)}
      </ul>
    </div>
  );
}
