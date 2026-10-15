
import { useState } from "react";
import { Link } from "react-router-dom";
import "./server/signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage(
        "Cannot connect to the server. Please try again."
      );
    }
  }

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <p>Join AttireStore today!</p>

        <p>
          Name
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </p>

        <p>
          Email
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>

        <p>
          Password
          <input
            type="password"
            placeholder="Create a password (8+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </p>

        <button type="submit">Sign Up</button>

        <p>{message}</p>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
