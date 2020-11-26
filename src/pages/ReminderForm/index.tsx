import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import Header from '../../components/Header';
import { colors } from '../../data/colors';
import { months } from '../../data/year';
import { useDate } from '../../Hooks/Date';
import { useReminder } from '../../Hooks/Reminder';

import {
  Container,
  Title,
  TitleText,
  Weather,
  WeatherText,
  WeatherSmallText,
  Label,
  Input,
  ColorButton,
  ColorName,
  Colors,
  ColorDot,
  DoneButton,
  DoneText,
  DeleteButton,
  DeleteButtonText,
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
  reminder?: IReminder;
}

const AddReminder: React.FC<Props> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date } = useDate();
  const { addReminder, deleteReminder, updateReminder } = useReminder();
  // const [weather, setWeather] = useState();
  const [selectedReminder, setSelectedReminder] = useState<IReminder | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [selectedColor, setSelectedColor] = useState(
    {
      id: 'white', value: '#ffffff',
    } as IColor,
  );

  useEffect(() => {
    setSelectedDate(date);
    const reminder: any = route.params;
    if (reminder) {
      setSelectedReminder(reminder);
      setSelectedDate(new Date(reminder.date));
      setDescription(reminder.desc);
      setCity(reminder.city);
      setSelectedColor(reminder.color);
    }
  }, []);

  const handleDescChange = useCallback((text) => {
    setDescription(text);
  }, []);

  const handleCityChange = useCallback((text) => {
    setCity(text);
  }, []);

  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedReminder) {
      updateReminder({
        id: selectedReminder.id,
        date,
        desc: description,
        city,
        color: selectedColor,
      });
    } else {
      addReminder({
        id: Math.floor((Math.random() * 1000) + 1),
        date,
        desc: description,
        city,
        color: selectedColor,
      });
    }

    navigation.navigate('Calendar');
  }, [description, selectedColor, date, city]);

  const handleReminderDelete = useCallback(() => {
    if (selectedReminder) {
      deleteReminder(selectedReminder.id);
    }

    navigation.navigate('Calendar');
  }, [selectedReminder?.id]);

  return (
    <Container>
      <Header />
      <Title>
        {selectedDate && (<TitleText>{`${months[selectedDate.getMonth()]} ${selectedDate.getUTCDate()}`}</TitleText>)}
        <Weather>
          <WeatherText>34ºC</WeatherText>
          <WeatherSmallText>95ºF</WeatherSmallText>
        </Weather>
      </Title>
      <Label>description</Label>
      <Input
        maxLength={30}
        defaultValue={description}
        onChangeText={(text) => handleDescChange(text)}
      />
      <Label>city</Label>
      <Input defaultValue={city} onChangeText={(text) => handleCityChange(text)} />
      <Label>color</Label>
      <Colors>
        {colors.map((color) => (
          <ColorButton
            key={color.value}
            onPress={() => { handleColorChange(color); }}
            selected={color.id === selectedColor.id}
          >
            <ColorDot color={color.value} />
            <ColorName>
              {color.id}
            </ColorName>
          </ColorButton>
        ))}
      </Colors>
      <DoneButton
        disabled={description === '' && city === ''}
        onPress={handleSubmit}
      >
        <DoneText>
          save reminder
        </DoneText>
      </DoneButton>
      {selectedReminder && (
        <DeleteButton onPress={handleReminderDelete}>
          <DeleteButtonText>
            delete reminder
          </DeleteButtonText>
        </DeleteButton>
      )}
    </Container>
  );
};

export default AddReminder;
