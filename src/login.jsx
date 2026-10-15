
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to log in. Please try again.");
        setMessageType("error");
        return;
      }

      navigate("/");
    } catch {
      setMessage("Cannot connect to the server. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <p className="login-form__eyebrow">AttireStore account</p>
        <h1>Welcome back</h1>
        <p className="login-form__intro">Sign in to continue to your account.</p>

        <label className="login-form__field" htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="login-form__field" htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button className="login-form__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p
          className={`login-form__message login-form__message--${messageType}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>

        <p className="login-form__signup">
          New to AttireStore? <Link to="/signup">Create an account</Link>
        </p>
        <p className="login-form__home">
          <Link to="/">Back to home</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
