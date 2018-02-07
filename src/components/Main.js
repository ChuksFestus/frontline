import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import TopNav from './TopNav/TopNav'
import SideBar from './SideBar/SideBar'
import Advert from './Advert/Advert'
import Home from '../Pages/Home/Home'
import ProfileCard from '../Pages/ProfileCard'
import Profile2 from '../Pages/Profile2'
import Project from '../Pages/Project'
import Library from '../Pages/Library'
import Discussions from '../Pages/Discussion'
import Payment from '../Pages/Payment'
import EventPage from '../Pages/EventPage'
import MainDis from '../Pages/MainDis'
import EventDetails from '../Pages/EventDetails'

import MainProd from '../Pages/MainProd'

const Main = ({ match }) => (
  <React.Fragment>
    <TopNav />
    <SideBar match={match} />
    <Advert />
    <main className="main">
      <Switch>
        <Route path={`${match.path}`} exact component={Home} />
        <Route exact path={`${match.path}/profile`} component={ProfileCard} />
        <Route path={`${match.path}/profile:friend`} component={Profile2} />
        <Route exact path={`${match.path}/project`} component={Project} />
        <Route exact path={`${match.path}/library`} component={Library} />
        <Route exact path={`${match.path}/events`} component={EventPage} />
        <Route exact path={`${match.path}/discuss`} component={Discussions} />
        <Route exact path={`${match.path}/discuss/:id`} component={MainDis} />
        <Route
          exact
          path={`${match.path}/events/:id`}
          component={EventDetails}
        />
        <Route exact path={`${match.path}/payment`} component={Payment} />
        <Route
          exact
          path={`${match.path}/project/:id`}
          component={MainProd}
        />
        <Redirect to={`${match.url}`} />
      </Switch>
    </main>
  </React.Fragment>
)

export default Main
