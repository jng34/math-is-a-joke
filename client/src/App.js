import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main.js';
import LoginForm from './components/LoginForm.js';
import SignUpForm from './components/SignUpForm.js';
import UserProfile from './components/UserProfile.js';
import Header from './components/Header.js';
import Friends from './components/Friends.js';
import Joke from './components/Joke.js';
import CreateJoke from './components/CreateJoke.js';
import MyJokes from './components/MyJokes.js';
import LeaderBoard from './components/LeaderBoard.js';
import HowToPlay from './components/HowToPlay.js';
import mathvid from './media/mathvid.mp4'


function App() {
  // const [userLoading, setUserLoading] = useState(true)
  const [user, setUser]  = useState({})

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then(data =>{
          // setUserLoading(true)
          setUser(data)})
          // setUserLoading(false)
      }
    });
  }, [])

  // if (!user.username) return <div id="loader"></div>;
  
  return (
    <>
      <video autoPlay muted loop id="myVideo">
          <source src={mathvid} type="video/mp4" />
      </video> 
      <div className="App-logo" style={{fontFamily: 'Love Ya Like A Sister' }}>
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
          <Route exact path="/friends">
            <Friends user={user} />
          </Route>
          <Route exact path="/joke">
            <Joke user={user} setUser={setUser} />
          </Route>
          <Route exact path="/createjoke">
            <CreateJoke user={user} setUser={setUser} />
          </Route>
          <Route exact path="/myjokes">
            <MyJokes user={user} />
          </Route>
          <Route exact path="/leaderboard">
            <LeaderBoard user={user} />
          </Route>
          <Route exact path="/howtoplay">
            <HowToPlay user={user} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
