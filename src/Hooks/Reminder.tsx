import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

interface IReminder {
  id: string;
  desc: string;
  city: string;
  color: {
    id: string;
    color: string;
  }
}

interface ReminderContextData {
  reminders: IReminder[];
  getReminder(id: string): IReminder | null;
  addReminder(reminder: IReminder): void;
  updateReminder(reminder: IReminder): void;
  deleteReminder(id: string): void;
}

interface ReminderState {
  reminders: IReminder[];
}

const ReminderContext = createContext<ReminderContextData>({} as ReminderContextData);

const DateProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ReminderState>({} as ReminderState);

  const getReminder = useCallback((id) => {
    const reminder = data.reminders.find((item) => item.id === id);
    if (reminder) return reminder;
    return null;
  }, []);

  const addReminder = useCallback((reminder) => {
    setData({ reminders: [...data.reminders, reminder] });
  }, []);

  const updateReminder = useCallback((reminder) => {
    console.log(reminder);
  }, []);

  const deleteReminder = useCallback((reminder) => {
    console.log(reminder);
  }, []);

  return (
    <ReminderContext.Provider value={{
      reminders: data.reminders, getReminder, addReminder, updateReminder, deleteReminder,
    }}
    >
      {children}
    </ReminderContext.Provider>
  );
};

function useReminder(): ReminderContextData {
  const context = useContext(ReminderContext);

  if (!context) {
    throw new Error('useReminder must be used within an DateProvider');
  }

  return context;
}

export { useReminder, DateProvider };
