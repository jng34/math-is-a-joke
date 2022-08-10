import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
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
import Notifications from './components/Notifications.js';


function App() {
  const [user, setUser] = useState({});
  const [noticeReRender, setNoticeReRender] = useState(false);
  const [toggleHeader, setToggleHeader] = useState(false);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setUser(data);
        });
      }
    });
  }, [noticeReRender]);

  // if (!user.username) return <div id="loader"></div>;
  
  return user && user.username ? (
      <div style={{ fontFamily: "Love Ya Like A Sister" }}>
        {user.username ? <Header user={user} setUser={setUser} /> : null}
        <Switch>
          <Route exact path="/">
            <Main
              user={user}
              setUser={setUser}
              toggleHeader={toggleHeader}
              setToggleHeader={setToggleHeader}
            />
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
            <Joke
              user={user}
              se tUser={setUser}
              noticeReRender={noticeReRender}
              setNoticeReRender={setNoticeReRender}
            />
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
          <Route exact path="/notifications">
            <Notifications
              user={user}
              noticeReRender={noticeReRender}
              setNoticeReRender={setNoticeReRender}
            />
          </Route>
        </Switch>
      </div>
  ) : (
    <div style={{ fontFamily: "Love Ya Like A Sister" }}>
      <Switch>
        <Route exact path="/">
          <Main
            user={user}
            setUser={setUser}
            toggleHeader={toggleHeader}
            setToggleHeader={setToggleHeader}
          />
        </Route>
        <Route exact path="/login">
          <LoginForm user={user} onLogin={setUser} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm onSignUp={setUser} />
        </Route>x``x``x
      </Switch>
    </div>
  );
}

export default App;
