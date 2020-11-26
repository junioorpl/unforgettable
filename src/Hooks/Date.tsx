import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

interface DateContextData {
  date: Date;
  updateDate(day: number, selectedDate: Date): void;
}

interface DateState {
  date: Date;
}

const DateContext = createContext<DateContextData>({} as DateContextData);

const DateProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DateState>(() => {
    const date = new Date();

    return { date } as DateState;
  });

  const updateDate = useCallback((day, selectedDate) => {
    if (selectedDate) {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();

      const date = new Date(year, month, day);
      setData({ date });
    }
  }, []);

  return (
    <DateContext.Provider value={{ date: data.date, updateDate }}>
      {children}
    </DateContext.Provider>
  );
};

function useDate(): DateContextData {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error('useDate must be used within an DateProvider');
  }

  return context;
}

export { useDate, DateProvider };
