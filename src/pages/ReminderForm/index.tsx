import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Feather';

import { cities } from '../../data/cities';
import Header from '../../components/Header';
import { colors } from '../../data/colors';
import { months } from '../../data/year';
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
import api from '../../services/api';

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
  reminder?: IReminder;
}

const AddReminder: React.FC<Props> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    addReminder, deleteReminder, updateReminder, getReminder,
  } = useReminder();
  const [weather, setWeather] = useState<IWeather>();
  const [selectedReminder, setSelectedReminder] = useState<IReminder | undefined>();
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [selectedColor, setSelectedColor] = useState(
    {
      id: 'white', value: '#ffffff',
    } as IColor,
  );

  // for render purposes
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const { params } = route;
    const { id, date }: any = params;
    setSelectedDate(date);

    const arr = date.split('-');
    setMonth(months[Number(arr[1] - 1)]);
    setDay(arr[2]);
    setYear(arr[0]);

    if (id !== undefined) {
      const foundReminder = getReminder(id);
      if (foundReminder) {
        setSelectedReminder(foundReminder);
        setDescription(foundReminder.desc);
        setCity(foundReminder.city);
        setSelectedColor(foundReminder.color);
        setWeather(foundReminder.weather);
      }
    }
  }, []);

  const handleDescChange = useCallback((text) => {
    setDescription(text);
  }, []);

  const handleCityChange = useCallback(async (c) => {
    if (c === '') {
      setWeather(undefined);
    }

    setCity(c);
    const fullCity = cities.find((item) => c === item.name);
    if (fullCity) {
      try {
        const monthNumber = months.findIndex((m) => month === m) + 1;
        const response = await api.get(`/location/${fullCity.woeid}/${year}/${monthNumber}/${day}`);
        const { data }: any = response;
        setWeather({
          description: data[0].weather_state_name,
          temperature: Math.round(data[0].the_temp),
        });
      } catch (err) {
        setWeather({
          description: 'forecast not yet available',
          temperature: 0,
        });
      }
    }
  }, [weather, year, month, day]);

  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedReminder && weather !== undefined) {
      const newList = updateReminder({
        id: selectedReminder.id,
        date: selectedReminder.date,
        desc: description,
        city,
        color: selectedColor,
        weather,
      });
      navigation.navigate('Calendar', { updatedReminders: newList });
    } else if (selectedDate !== undefined && weather !== undefined) {
      const newList = addReminder({
        id: Math.floor((Math.random() * 1000) + 1),
        date: selectedDate,
        desc: description,
        city,
        color: selectedColor,
        weather,
      });
      navigation.navigate('Calendar', { updatedReminders: newList });
    }
  }, [description, selectedColor, city, weather]);

  const handleReminderDelete = useCallback(() => {
    if (selectedReminder) {
      const newList = deleteReminder(selectedReminder);
      navigation.navigate('Calendar', { updatedReminders: newList });
    }
  }, [selectedReminder]);

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header>
        <Icon
          name="arrow-left"
          size={24}
          onPress={() => navigation.navigate('Calendar')}
        />
      </Header>
      <Title>
        <TitleText>
          {`${month} ${day}`}
        </TitleText>
        <Weather>
          {weather === undefined ? (
            <WeatherText>Choose city</WeatherText>
          ) : (
              <>
                <WeatherText>{`${weather.temperature}ºC`}</WeatherText>
                <WeatherSmallText>{weather.description}</WeatherSmallText>
              </>
            )}
        </Weather>
      </Title>
      <Label>description</Label>
      <Input
        maxLength={30}
        defaultValue={description}
        onChangeText={(text) => handleDescChange(text)}
      />
      <Label>city</Label>
      <Picker
        selectedValue={city}
        onValueChange={(c) => handleCityChange(c)}
        itemStyle={{ fontSize: 18, fontWeight: 'bold' }}
      >
        <Picker.Item key="none" label="Find your city" value="" />
        {cities.map((c, index) => (<Picker.Item key={index} label={c.name} value={c.name} />))}
      </Picker>
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
