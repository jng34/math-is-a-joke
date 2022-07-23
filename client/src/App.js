import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import UserProfile from './components/UserProfile.js';


function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(data => setUser(data))
      }
    });
  }, [])

  return (
    <div style={{fontFamily: 'Love Ya Like A Sister'}}>
      <Switch>
        <Route exact path="/">
          <Main user={user}/>
        </Route>
        <Route exact path="/login">
          <LoginForm user={user} onLogin={setUser} /> 
        </Route>
        <Route exact path="/signup">
          <SignUpForm onSignUp={setUser} />
        </Route>
        <Route exact path="/signup">
          <UserProfile user={user} onSignUp={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
