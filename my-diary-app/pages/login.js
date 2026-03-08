import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      window.location.href = "/admin";
    } else if (email === "user@example.com" && password === "user123") {
      localStorage.setItem("role", "user");
      window.location.href = "/diary";
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} 
          onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" value={password} 
          onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
