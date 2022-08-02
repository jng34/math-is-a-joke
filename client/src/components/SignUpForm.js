import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function SignUpForm({ onSignUp }) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();

    function handleSubmitSignUp(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                profile_img: profileImg,
                email,
                password,
                password_confirmation: passwordConfirmation
            })
        })
        .then((res) => {
            setIsLoading(false);
            if (res.ok) {
              res.json().then((user) => onSignUp(user));
                setIsLoading(!isLoading);
                history.push("/profile")
                setUserName("")
                setProfileImg("")
                setEmail("")
                setPassword("")
                setPasswordConfirmation("")
            } else {
                res.json().then((err) => setErrors(err.errors));
            }  
        });
    }

  return (
    <div style={{marginTop: '80px'}}>
        <div id="signup" className="card text-start border border-dark border-2 mt-4">
            <form className="px-4 py-3" onSubmit={handleSubmitSignUp}>
                <div className="mb-2">
                  <label htmlFor="username" className="form-label fw-bold">UserName</label>
                  <input 
                      type="text"
                      className="form-control" 
                      autoComplete="off"
                      value={username}
                      placeholder="Enter username..." 
                      onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label fw-bold">Email</label>
                  <input 
                      type="text"
                      className="form-control" 
                      autoComplete="off"
                      value={email}
                      placeholder="Enter email..." 
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="profile-img" className="form-label fw-bold">Profile Picture</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      autoComplete="off"
                      placeholder="Enter image url..." 
                      value={profileImg}
                      onChange={(e) => setProfileImg(e.target.value)}
                    />
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
                  <label htmlFor="password" className="form-label fw-bold">Password Confirmation</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      autoComplete="current-password"
                      placeholder="Confirm password..." 
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">SIGN UP</button>
                </div>
                {errors.map((err) => (
                  <p key={err} style={{color: "red"}}>{err}</p>
                 ))}
                <br />
                <p className="text-center">
                    Already have an account? &nbsp;
                    <Link to='/login'>Log In</Link>
                </p> 
            </form>
        </div>   
    </div>
  )
}

export default SignUpForm