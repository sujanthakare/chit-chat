import React from 'react';
import AppContainer from './components/appContainer';
import ChatBox from './routes/chatBox';
import Entry from './routes/entry';
import { Route, Switch,  BrowserRouter as Router, } from 'react-router-dom';
import Users from './routes/users';

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/">
            <Entry />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/chat">
            <ChatBox />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
