import 'react-native-gesture-handler';

import React from 'react';
import Routes from './routes';
import AppProvider from './Hooks';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => (

  <NavigationContainer>
    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
