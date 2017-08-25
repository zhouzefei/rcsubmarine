import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Test from './views/Test';
const CustomRouter = history => (
  <ConnectedRouter history={ history }>
    <div>
      <Switch>
        <Route exact path="/" component={ Test } />
      </Switch>
    </div>
  </ConnectedRouter>
)

export default CustomRouter;
