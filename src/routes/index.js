import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';

import Order from '~/pages/Order';
import Profile from '~/pages/Profile';
import Problem from '~/pages/Problem';
import Recipient from '~/pages/Recipient';
import Deliveryman from '~/pages/Deliveryman';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order" component={Order} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
    </Switch>
  );
}
