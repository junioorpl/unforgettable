import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';

interface IReminder {
  id: number;
  date: string;
  desc: string;
  city: string;
  color: IColor;
  weather: IWeather;
}

interface IWeather {
  description: string;
  temperature: number;
}

interface IColor {
  id: string,
  value: string,
}

interface ReminderContextData {
  reminders: IReminder[];
  getReminder(id: number): IReminder | undefined;
  getRemindersFromDay(date: string): IReminder[];
  addReminder(reminder: IReminder): IReminder[];
  updateReminder(reminder: IReminder): IReminder[];
  deleteReminder(reminder: IReminder): IReminder[];
}

interface ReminderState {
  allReminders: IReminder[];
}

const ReminderContext = createContext<ReminderContextData>({} as ReminderContextData);

const ReminderProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ReminderState>(
    () => ({ allReminders: [] } as ReminderState),
  );

  const getReminder = useCallback((id) => {
    const foundReminder = data.allReminders.find((item) => item.id === id);
    return foundReminder;
  }, [data.allReminders]);

  const getRemindersFromDay = useCallback((date) => {
    const dayReminders = data.allReminders.filter(
      (item) => date === item.date,
    );
    // console.log(dayReminders);
    return dayReminders;
  }, [data.allReminders]);

  const addReminder = useCallback((reminder) => {
    const arr = data.allReminders;
    arr.push(reminder);
    setData({ allReminders: arr });
    return getRemindersFromDay(reminder.date);
  }, []);

  const updateReminder = useCallback((reminder) => {
    let arr = data.allReminders;
    arr = arr.map((item) => (item.id === reminder.id ? reminder : item));
    setData({ allReminders: arr });

    // returns instantly the reminders of the day
    arr = arr.filter(
      (item) => reminder.date === item.date,
    );
    return arr;
  }, []);

  const deleteReminder = useCallback((reminder) => {
    let arr = data.allReminders;
    const foundIndex = arr.findIndex((item) => item.id === reminder.id);
    if (foundIndex > -1) { arr.splice(foundIndex, 1); }
    setData({ allReminders: arr });
    arr = arr.filter(
      (item) => reminder.date === item.date,
    );
    return arr;
  }, []);

  return (
    <ReminderContext.Provider value={{
      reminders: data.allReminders,
      getReminder,
      getRemindersFromDay,
      addReminder,
      updateReminder,
      deleteReminder,
    }}
    >
      {children}
    </ReminderContext.Provider>
  );
};

function useReminder(): ReminderContextData {
  const context = useContext(ReminderContext);

  if (!context) {
    throw new Error('useReminder must be used within an ReminderProvider');
  }

  return context;
}

export { useReminder, ReminderProvider };
