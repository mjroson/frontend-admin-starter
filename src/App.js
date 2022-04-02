import React from 'react';
import { BrowserRouter, Route, Routes,  useNavigate,
  useLocation } from 'react-router-dom';

import { QueryParamProvider } from 'use-query-params';
import { Provider } from 'react-redux';
import indexRoutes from './routes/index.jsx';
import store from './store';

import './config/axios_conf';

import './App.less';

/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
 const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};


const App = props => (
  <Provider store={store}>
    <BrowserRouter >
      {/* adapt for react-router v6 */}
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <Routes>
          {indexRoutes.map((prop, key) => (
            <Route path={prop.path} element={<prop.component />} key={key} />
          ))}
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
