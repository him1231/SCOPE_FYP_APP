import React from 'react';
import {Provider} from 'react-redux';
import LoadingWrapper from './components/LoadingWrapper';
import RootNavigator from './navigators';
import {store} from './redux/store';

const App: React.FC = React.memo(() => {
  return (
    <Provider store={store}>
      <LoadingWrapper>
        <RootNavigator />
      </LoadingWrapper>
    </Provider>
  );
});

export default App;
