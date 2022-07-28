import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import UserProfile from './components/UserProfile.js';
import Header from './components/Header.js';
import JokeList from './components/JokeList.js';
import Friends from './components/Friends.js';
import Joke from './components/Joke.js';
import CreateJoke from './components/CreateJoke.js';
import MyJokes from './components/MyJokes.js';
import LeaderBoard from './components/LeaderBoard.js';
// import mathvid from '../mathvid.mp4'


function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then(data => setUser(data))
      }
    });
  }, [])

  if (!user) return <div></div>;

  /* <video autoPlay muted loop id="myVideo">
      <source src={mathvid} type="video/mp4" />
  </video> */
  
  return (
    <div style={{fontFamily: 'Love Ya Like A Sister'}}>
      <Header user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/">
          <Main user={user} setUser={setUser}/>
        </Route>
        <Route exact path="/login">
          <LoginForm user={user} onLogin={setUser} /> 
        </Route>
        <Route exact path="/signup">
          <SignUpForm onSignUp={setUser} />
        </Route>
        <Route exact path="/profile">
          <UserProfile user={user} setUser={setUser} />
        </Route>
        <Route exact path="/jokelist">
          <JokeList user={user} />
        </Route>
        <Route exact path="/friends">
          <Friends user={user} />
        </Route>
        <Route exact path="/joke">
          <Joke user={user} setUser={setUser} />
        </Route>
        <Route exact path="/createjoke">
          <CreateJoke user={user} />
        </Route>
        <Route exact path="/myjokes">
          <MyJokes user={user} />
        </Route>
        <Route exact path="/leaderboard">
          <LeaderBoard user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
