import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReminderForm from './pages/ReminderForm';
import Calendar from './pages/Calendar';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name="Calendar"
      component={Calendar}
    />
    <Stack.Screen
      name="ReminderForm"
      component={ReminderForm}
    />
  </Stack.Navigator>
);

export default Routes;
