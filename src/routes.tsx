import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddReminder from './pages/AddReminder';
import Calendar from './pages/Calendar';
import Header from './components/Header';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          navigation={({ navigation }) => navigation}
          name="Calendar"
          component={Calendar}
        />
        <Stack.Screen
          name="AddReminder"
          component={AddReminder}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default Routes;
