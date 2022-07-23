import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main.js'


function App() {
  return (
    <div style={{fontFamily: 'Love Ya Like A Sister'}}>
        <Main/> 
        {/* <Switch>
          <Route exact path="/">
            <Main user={user}/>
          </Route>
          <Route exact path="/battle">
            <BattleField user={user} setUser={setUser}/>
          </Route>
          <Route exact path="/users">
            <AllUsers />
          </Route>
          <Route exact path="/profile">
            <UserProfile user={user}/>
          </Route>
          <Route exact path="/login">
            <LoginForm user={user} onLogin={setUser} /> 
          </Route>
          <Route exact path="/signup">
            <SignUpForm onSignUp={setUser} />
          </Route>
        </Switch> */}
    </div>
  );
}

export default App;
