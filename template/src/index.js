import { render } from 'react-dom';
import { Provider } from 'react-redux';
import CustomRouter from './router.js';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const RouterComponent = CustomRouter(history);
import store from './store';
import style from './index.scss';
render(
    <Provider store={ store(history) }>
      { RouterComponent }
    </Provider>,
    document.querySelector("#root")
);
