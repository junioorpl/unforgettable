import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

interface IDate {
  day: number;
  month: number;
  year: number;
}

interface DateContextData {
  date: IDate;
  updateDate(date: IDate): void;
}

interface DateState {
  date: IDate;
}

const DateContext = createContext<DateContextData>({} as DateContextData);

const DateProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DateState>(() => {
    const currentDate = new Date();
    const day = currentDate.getUTCDay();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return {
      date: {
        day, month, year,
      },
    } as DateState;
  });

  const updateDate = useCallback((date) => {
    setData({ date });
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
