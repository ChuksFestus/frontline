import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TopNav from './TopNav/TopNav';
import SideBar from './SideBar/SideBar';
import Advert from './Advert/Advert';

import Home from '../Pages/Home/Home';
// import Profile from "../Pages/Profile";
import Profile2 from '../Pages/Profile2';
import Project from '../Pages/Project';
import Library from '../Pages/Library';
import Discussions from '../Pages/Discussion';
import Payment from '../Pages/Payment';

const Main = ({ component }) => {
  // console.log(match);
  return (
    <React.Fragment>
      <TopNav />
      <SideBar />
      <Advert />
      <main className="main">
        {component}
        {/* You can proceed and delete the switch block since it's not needed again */}
        <Switch>
          {/* <Route path={`${match.path}`} exact component={Home} /> */}
          {/* <Route exact path={`${match.path}/profile`} component={Profile} /> */}
          {/* <Route
            path={`${match.path}/profile/:friend`}
            exact
            component={Profile2}
          /> */}
          {/* <Route
            exact
            path={`${match.path}/project`}
            exact
            component={Project}
          /> */}
          {/* <Route exact path={`${match.path}/library`} component={Library} /> */}
          {/* <Route exact path={`${match.path}/discuss`} component={Discussions} /> */}
          {/* <Route exact path={`${match.path}/payment`} component={Payment} /> */}
          {/* <Redirect to={`${match.url}`} /> */}
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default Main;
