import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';

import OrderList from '~/pages/OrderList';
import Order from '~/pages/OrderList/Order';

import DeliverymanList from '~/pages/DeliverymanList';
import Deliveryman from '~/pages/DeliverymanList/Deliveryman';

import RecipientList from '~/pages/RecipientList';
import Recipient from '~/pages/RecipientList/Recipient';

import Profile from '~/pages/Profile';
import ProblemList from '~/pages/ProblemList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route exact path="/order" component={OrderList} isPrivate />
      <Route path="/order/register" component={Order} isPrivate />
      <Route path="/order/edit/:order_id" component={Order} isPrivate />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/problem" component={ProblemList} isPrivate />

      <Route path="/recipient" exact component={RecipientList} isPrivate />
      <Route path="/recipient/register" exact component={Recipient} isPrivate />
      <Route
        path="/recipient/edit/:recipient_id"
        exact
        component={Recipient}
        isPrivate
      />

      <Route path="/deliveryman" exact component={DeliverymanList} isPrivate />
      <Route path="/deliveryman/register" component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/edit/:deliveryman_id"
        component={Deliveryman}
        isPrivate
      />
    </Switch>
  );
}
