import React from 'react';

import { DateProvider } from './Date';

const AppProvider: React.FC = ({ children }) => (
  <DateProvider>
    {children}
  </DateProvider>
);

export default AppProvider;
