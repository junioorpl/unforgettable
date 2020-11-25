import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';

import { wDays, mDays, months } from '../../data/year';
import { useDate } from '../../Hooks/Date';

import {
  Container,
  TextContainer,
  CalendarContainer,
  CalendarHeader,
  Month,
  Year,
  DaysContainer,
  Day,
  DaysRow
} from './styles';

interface IProps {
  navigation: {
    navigate(): void;
  };
}

const Calendar: React.FC<IProps> = ({ navigation }) => {
  const { updateDate } = useDate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<string[][]>();

  useEffect(() => {
    updateDate({
      day: selectedDate.getUTCDate(),
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear()
    })
    generateCalendarData(selectedDate);
  }, [selectedDate]);

  const generateCalendarData = useCallback((date) => {
    var calendarMatrix = [];
    calendarMatrix[0] = wDays;

    var year = date.getFullYear();
    var month = date.getMonth();
    var dayOne = new Date(year, month, 1).getDay();
    var totalDays = mDays[month];

    //Tratamento de ano bissexto
    if (month === 1) (year % 4 === 0 && year % 100 !== 0) && totalDays + 1;

    var count = 1; // contador de dias a serem gravados na matriz
    for (var row = 1; row < 7; row++) {
      calendarMatrix[row] = []; // adição de linha
      for (var col = 0; col < 7; col++) {
        calendarMatrix[row][col] = ''; // inicializa todos os elementos do array
        if (row === 1 && col >= dayOne) { // começa a gravar apenas após o primeiro dia do mês
          calendarMatrix[row][col] = String(count++);
        } else if (row > 1 && count <= totalDays) { // grava até o ultimo elemento do mês de acordo com o mês
          calendarMatrix[row][col] = String(count++);
        }
      }
    }

    setCalendarData(calendarMatrix);
  }, []);

  const handleNextMonth = useCallback(() => {
    const nextMonth = selectedDate.getMonth() + 1;
    const day = selectedDate.getUTCDate();
    const year = selectedDate.getFullYear();

    const newDate = new Date(year, nextMonth, day);
    setSelectedDate(newDate);
  }, [selectedDate]);

  const handlePreviousMonth = useCallback(() => {
    const nextMonth = selectedDate.getMonth() - 1;
    const day = selectedDate.getUTCDate();
    const year = selectedDate.getFullYear();

    const date = new Date(year, nextMonth, day);
    setSelectedDate(date);
  }, [selectedDate]);

  const handleSelectDate = useCallback((day) => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    const date = new Date(year, month, parseInt(day));
    setSelectedDate(date);
  }, [selectedDate])

  return (
    <Container>
      <Header navigation={navigation} />
      <CalendarContainer>
        <CalendarHeader>
          <Icon name='arrow-left' size={18} onPress={handlePreviousMonth} />
          <TextContainer>
            <Month>
              {months[selectedDate.getMonth()]}
            </Month>
            <Year>
              {selectedDate.getFullYear()}
            </Year>
          </TextContainer>
          <Icon name='arrow-right' size={18} onPress={handleNextMonth} />
        </CalendarHeader>
        <DaysContainer>
          {calendarData?.map((row, rIndex) => {
            const rowItems = row.map((day, cIndex) => {
              return (
                <Day
                  key={cIndex}
                  weekDay={rIndex}
                  isSelected={day === String(selectedDate.getDate())}
                  onPress={() => handleSelectDate(day)}
                >
                  {day !== '-1' ? day : ''}
                </Day>
              )
            })
            return (
              <DaysRow key={rIndex}>{rowItems}</DaysRow>
            )
          })}
        </DaysContainer>
      </CalendarContainer>
    </Container >
  );
};

export default Calendar;
