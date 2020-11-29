import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  ReminderDesc,
  Temperature,
  WeatherDesc,
  Label,
  ReminderColor,
  ReminderCity,
  ReminderData,
  WeatherData,
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

interface Props {
  item: {
    item: IReminder;
  };
}

const Reminder: React.FC<Props> = ({ item }) => {
  const reminder = item.item;
  const navigator = useNavigation();

  const handleReminderEdit = useCallback(() => {
    navigator.navigate('ReminderForm', { id: reminder.id, date: reminder.date });
  }, []);

  return (
    <Container key={reminder.id}>
      <ReminderColor key={reminder.color.id} color={reminder.color.value} />
      <WeatherData>
        <ReminderCity>{reminder.city}</ReminderCity>
        <Temperature>{`${reminder.weather.temperature}ºC`}</Temperature>
        <WeatherDesc>{reminder.weather.description}</WeatherDesc>
      </WeatherData>
      <ReminderData>
        <Label>do not forget to</Label>
        <ReminderDesc>{reminder.desc}</ReminderDesc>
      </ReminderData>
      <Icon
        name="edit"
        size={24}
        onPress={handleReminderEdit}
      />
    </Container>
  );
};

export default Reminder;
