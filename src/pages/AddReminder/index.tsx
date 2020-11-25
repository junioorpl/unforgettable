import React, { useCallback, useEffect, useState } from 'react';

import Header from '../../components/Header';
import { colors } from '../../data/colors';
import { months } from '../../data/year';
import { useDate } from '../../Hooks/Date';

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
} from './styles';

interface IProps {
  navigation: {
    navigate(): void;
  };
}

interface IColor {
  id: string,
  value: string,
}

const AddReminder: React.FC<IProps> = ({ navigation }) => {
  const { date } = useDate();
  const [weather, setWeather] = useState();
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [selectedColor, setSelectedColor] = useState({} as IColor);

  const handleDescChange = useCallback((text) => {
    setDescription(text);
  }, []);

  const handleCityChange = useCallback((text) => {
    setCity(text);
  }, []);

  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
  }, [])

  return (
    <Container>
      <Header navigation={navigation} />
      <Title>
        <TitleText>{`${months[date.month]} ${date.day}`}</TitleText>
        <Weather>
          <WeatherText>34ºC</WeatherText>
          <WeatherSmallText>95ºF</WeatherSmallText>
        </Weather>
      </Title>
      <Label>description</Label>
      <Input
        maxLength={30}
        onChangeText={text => handleDescChange(text)}
      />
      <Label>city</Label>
      <Input onChangeText={text => handleCityChange(text)} />
      <Label>color</Label>
      <Colors>
        {colors.map(color => (
          <ColorButton
            key={color.value}
            onPress={() => { handleColorChange(color) }}
            selected={color.id === selectedColor.id}
          >
            <ColorDot color={color.value} />
            <ColorName>
              {color.id}
            </ColorName>
          </ColorButton>
        ))}
      </Colors>
      <DoneButton>
        <DoneText>
          add reminder
        </DoneText>
      </DoneButton>
    </Container>
  )
};

export default AddReminder;
