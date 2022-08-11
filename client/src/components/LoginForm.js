import { useState } from 'react';  
import { useHistory, Link } from 'react-router-dom';
import mathvid from "../media/mathvid.mp4";


function LoginForm({ onLogin }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();


    function handleLoginSubmit(e) {
        e.preventDefault();
        setError("")
        setIsLoading(true);
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password }),
        })
        .then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => {
              onLogin(user)
              history.push("/profile")
            });
            setUserName("")
            setPassword("")
          } else {
            r.json().then((err) => setError(err.error));
          }
        });
    }
  
    return (
      <div className='forms'>
        <video autoPlay muted loop id="myVideo">
          <source src={mathvid} type="video/mp4" />
        </video>
        <div
          id="login"
          className="card text-start border border-dark border-2"
        >
          <form className="px-4 py-3" onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                UserName
              </label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={username}
                placeholder="Enter username..."
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                autoComplete="current-password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                SIGN IN
              </button>
            </div>
            <p style={{ color: "red" }}>{error}</p>
            <p className="text-center">
              Don't have an account? &nbsp;
              <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
        <br />
      </div>
    );
}

export default LoginForm;