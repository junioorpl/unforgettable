import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';

import { isSameDay } from 'date-fns';
import { useDate } from './Date';

interface IReminder {
  id: number;
  date: Date;
  desc: string;
  city: string;
  color: IColor;
}

interface IColor {
  id: string,
  value: string,
}

interface ReminderContextData {
  reminders: IReminder[];
  getRemindersFromDay(day: Date): void;
  addReminder(reminder: IReminder): void;
  updateReminder(reminder: IReminder): void;
  deleteReminder(id: number): void;
}

interface ReminderState {
  allReminders: IReminder[];
  reminders: IReminder[];
}

const ReminderContext = createContext<ReminderContextData>({} as ReminderContextData);

const ReminderProvider: React.FC = ({ children }) => {
  const { date } = useDate();
  const [data, setData] = useState<ReminderState>(
    () => ({ allReminders: [], reminders: [] } as ReminderState),
  );

  const getRemindersFromDay = useCallback((day) => {
    const dayReminders = data.allReminders.filter((item) => isSameDay(item.date, day));
    setData({ ...data, reminders: dayReminders });
  }, [data]);

  const addReminder = useCallback((reminder) => {
    const arr = data.allReminders;
    arr.push(reminder);
    setData({ ...data, allReminders: arr });
    getRemindersFromDay(date);
  }, []);

  const updateReminder = useCallback((reminder) => {
    let arr = data.allReminders;
    arr = arr.map((item) => (item.id === reminder.id ? reminder : item));
    setData({ ...data, allReminders: arr });
    getRemindersFromDay(date);
  }, []);

  const deleteReminder = useCallback((id) => {
    const arr = data.allReminders;
    const foundIndex = arr.findIndex((item) => item.id === id);
    if (foundIndex > -1) { arr.splice(foundIndex, 1); }
    setData({ ...data, allReminders: arr });
    getRemindersFromDay(date);
  }, []);

  useEffect(() => {
    getRemindersFromDay(date);
  }, [data.allReminders, date]);

  return (
    <ReminderContext.Provider value={{
      reminders: data.reminders,
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
