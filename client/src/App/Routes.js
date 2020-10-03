import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../views/Landing/Landing'
import NotFound from '../views/NotFound/NotFound'
import BoardContainer from '../views/Board/Board.container'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app/:board" component={BoardContainer} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
