import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import Reminder from '../../components/Reminder';

import { wDays, mDays, months } from '../../data/year';
import { useReminder } from '../../Hooks/Reminder';

import {
  Container,
  TextContainer,
  CalendarContainer,
  CalendarHeader,
  Month,
  Year,
  DaysContainer,
  DayButton,
  Day,
  DaysRow,
  RemindersContainer,
  NoRemindersText,
} from './styles';

interface IColor {
  id: string,
  value: string,
}

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

const Calendar: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getRemindersFromDay } = useReminder();
  const [reminders, setReminders] = useState<IReminder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [calendarData, setCalendarData] = useState<string[][]>();

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    if (selectedDate !== undefined) {
      generateCalendarData();
      setReminders(getRemindersFromDay(format(selectedDate, 'yyyy-MM-dd')));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (route.params) {
      const { updatedReminders }: any = route.params;
      setReminders(updatedReminders);
    }
  }, [route]);

  const generateCalendarData = useCallback(() => {
    let currentDate = new Date();

    if (selectedDate !== undefined) {
      currentDate = selectedDate;
    }
    const calendarMatrix = [];
    calendarMatrix[0] = wDays;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayOne = new Date(year, month, 1).getDay();
    const totalDays = mDays[month];

    // Tratamento de ano bissexto
    if (month === 1) {
      if (year % 4 === 0 && year % 100 !== 0) {
        totalDays + 1;
      }
    }

    let count = 1;
    // contador de dias a serem gravados na matriz
    for (let row = 1; row < 7; row++) {
      calendarMatrix[row] = [];
      // adição de linha
      for (let col = 0; col < 7; col++) {
        calendarMatrix[row][col] = '';
        // inicializa todos os elementos do array
        if (row === 1 && col >= dayOne) {
          // começa a gravar apenas após o primeiro dia do mês
          calendarMatrix[row][col] = String(count++);
        } else if (row > 1 && count <= totalDays) {
          // grava até o ultimo elemento do mês de acordo com o mês
          calendarMatrix[row][col] = String(count++);
        }
      }
    }

    setCalendarData(calendarMatrix);
  }, [selectedDate]);

  const handleNextMonth = useCallback(() => {
    if (selectedDate) {
      const nextMonth = selectedDate.getMonth() + 1;
      const day = selectedDate.getUTCDate();
      const year = selectedDate.getFullYear();

      const newDate = new Date(year, nextMonth, day);
      setSelectedDate(newDate);
    }
  }, [selectedDate]);

  const handlePreviousMonth = useCallback(() => {
    if (selectedDate !== undefined) {
      const nextMonth = selectedDate.getMonth() - 1;
      const day = selectedDate.getUTCDate();
      const year = selectedDate.getFullYear();

      const date = new Date(year, nextMonth, day);
      setSelectedDate(date);
    }
  }, [selectedDate]);

  const handleDayChange = useCallback((day) => {
    if (selectedDate !== undefined) {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();

      const date = new Date(year, month, Number(day));
      setSelectedDate(date);
    }
  }, [selectedDate]);

  const handleAddReminder = useCallback(() => {
    if (selectedDate !== undefined) {
      navigation.navigate('ReminderForm', { date: format(selectedDate, 'yyyy-MM-dd') });
    }
  }, [selectedDate, navigation]);

  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={handleAddReminder}
        >
          <Icon
            name="plus"
            size={24}
          />
        </TouchableOpacity>

      </Header>
      {selectedDate !== undefined && (
        <>
          <CalendarContainer>
            <CalendarHeader>
              <Icon name="arrow-left" size={18} onPress={handlePreviousMonth} />
              <TextContainer>
                <Month>
                  {months[selectedDate.getMonth()]}
                </Month>
                <Year>
                  {selectedDate.getFullYear()}
                </Year>
              </TextContainer>
              <Icon name="arrow-right" size={18} onPress={handleNextMonth} />
            </CalendarHeader>
            <DaysContainer>
              {calendarData?.map((row, rIndex) => {
                const rowItems = row.map((day, cIndex) => (
                  <DayButton
                    key={cIndex}
                    disabled={day === '' || rIndex === 0}
                    onPress={() => handleDayChange(day)}
                  >
                    <Day
                      weekDay={rIndex}
                      isSelected={Number(day) === selectedDate.getDate()}
                    >
                      {day}
                    </Day>
                  </DayButton>
                ));
                return (
                  <DaysRow key={rIndex}>{rowItems}</DaysRow>
                );
              })}
            </DaysContainer>
          </CalendarContainer>
          <RemindersContainer>
            {reminders && reminders.length > 0 ? (
              <FlatList
                data={reminders}
                renderItem={(item: any) => (<Reminder item={item} />)}
                keyExtractor={(item: any) => item.desc}
              />
            ) : (
                <NoRemindersText>you do not have any reminders on this day</NoRemindersText>
              )}
          </RemindersContainer>
        </>
      )}
    </Container>
  );
};

export default Calendar;
