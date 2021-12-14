import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingOverlay from './components/LoadingOverlay';
import LoadingWrapper from './components/LoadingWrapper';
import RootNavigator from './navigators';
import {persistor, store} from './redux/store';

const App: React.FC = React.memo(() => {
  return (
    <Provider store={store}>
      <LoadingWrapper>
        <PersistGate loading={<LoadingOverlay />} {...{persistor}}>
          <RootNavigator />
        </PersistGate>
      </LoadingWrapper>
    </Provider>
  );
});

export default App;
