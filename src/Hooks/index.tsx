import React from 'react';

import { ReminderProvider } from './Reminder';

const AppProvider: React.FC = ({ children }) => (
  <ReminderProvider>
    {children}
  </ReminderProvider>
);

export default AppProvider;
