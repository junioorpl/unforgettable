import 'react-native-gesture-handler';

import React from 'react';
import Routes from './routes';
import AppProvider from './Hooks';

const App: React.FC = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
