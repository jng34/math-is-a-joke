import { useState } from 'react';  
import { useHistory, Link } from 'react-router-dom';


function LoginForm({ onLogin }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    //routing
    const history = useHistory();


    function handleLoginSubmit(e) {
        e.preventDefault();
        setErrors([])
        setIsLoading(true);
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, password }),
        })
        .then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => {
              onLogin(user)
              history.push("/battle")
            });
            setName("")
            setPassword("")
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
    }
  
    return (
      <div>
        <h1 className="text-center mt-3" style={{fontSize: '44px', cursor: 'pointer'}} onClick={() => history.push("/")}>MATH is a Joke!</h1>
        <div className="card text-start border border-dark border-2 mt-4" style={{width: "25rem", margin: "auto"}}>
            <form className="px-5 py-3" onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">UserName</label>
                  <input 
                      type="text"
                      className="form-control" 
                      autoComplete="off"
                      value={name}
                      placeholder="Enter username..." 
                      onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">Password</label>
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
                  <button type="submit" className="btn btn-primary">SIGN IN</button>
                </div>
                {errors.map((err) => (
                  <p key={err} style={{color: "red"}}>{err}</p>
                 ))}
                <br /> 
                <p className='text-center'>
                    Don't have an account? &nbsp;
                    <Link to='/signup'>Sign Up</Link>
                </p>
            </form>
        </div>
        <br />
      </div>
    )
}

export default LoginForm;