import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container, ReminderDesc, ReminderColor, ReminderCity, ReminderData,
} from './styles';

interface IColor {
  id: string,
  value: string,
}

interface IReminder {
  id: number;
  date: Date;
  desc: string;
  city: string;
  color: IColor;
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
    navigator.navigate('ReminderForm', { ...reminder, date: format(reminder.date, 'yyyy-MM-dd') });
  }, []);

  return (
    <Container>
      <ReminderColor color={reminder.color.value} />
      <ReminderData>
        <ReminderDesc>{reminder.desc}</ReminderDesc>
        <ReminderCity>{reminder.city}</ReminderCity>
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
