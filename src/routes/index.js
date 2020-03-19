import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';

import OrderList from '~/pages/OrderList';
import Order from '~/pages/OrderList/Order';

import Profile from '~/pages/Profile';
import Problem from '~/pages/Problem';
import Recipient from '~/pages/Recipient';
import Deliveryman from '~/pages/Deliveryman';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route exact path="/order" component={OrderList} isPrivate />
      <Route path="/order/register" component={Order} isPrivate />
      <Route path="/order/edit/:order_id" component={Order} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
    </Switch>
  );
}
