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

    
    let history = useHistory();

    function handleSubmitSignUp(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
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
                setUserName("")
                setProfileImg("")
                setEmail("")
                setPassword("")
                setPasswordConfirmation("")
                history.push("/")
            } else {
                res.json().then((err) => setErrors(err.errors));
            }
            
        });
    }

  return (
    <div>
        <h1 className="text-center mt-3" style={{fontSize: '44px', cursor: 'pointer'}} onClick={() => history.push("/")}>Math is a Joke!</h1>
        <div className="card text-start border border-dark mt-5" style={{width: "25rem", margin: "auto"}}>
            <form className="px-4 py-3" onSubmit={handleSubmitSignUp}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                      type="text"
                      className="form-control" 
                      autoComplete="off"
                      value={username}
                      placeholder="name" 
                      onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Profile Img</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      autoComplete="off"
                      placeholder="image url" 
                      value={profileImg}
                      onChange={(e) => setProfileImg(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      autoComplete="current-password"
                      placeholder="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password Confirmation</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      autoComplete="current-password"
                      placeholder="confirm password" 
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                {/* <button type="submit" className="btn btn-primary">Sign Up</button> */}
                <div class="d-grid gap-2">
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
        <br />
    </div>
  )
}

export default SignUpForm