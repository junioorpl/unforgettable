import React from 'react';

import { DateProvider } from './Date';
import { ReminderProvider } from './Reminder';

const AppProvider: React.FC = ({ children }) => (
  <DateProvider>
    <ReminderProvider>
      {children}
    </ReminderProvider>
  </DateProvider>
);

export default AppProvider;
