import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Journals from '../views/Journals';
import JournalEntries from '../views/JournalEntries';
import NotFound from '../views/NotFound';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (check) => (user
    ? (<Component {...check} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: check.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default function Routes({ user }) {
  return (
    <Switch>
      <Route
      exact
      path='/'
      component={() => <Home user={user}/>}
      />
      <PrivateRoute
      exact path='/journals'
      component={Journals}
      user={user}
      />
      <PrivateRoute
      exact path='/journal-entries'
      component={JournalEntries}
      user={user}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
