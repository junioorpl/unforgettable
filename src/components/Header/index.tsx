import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container, TitleContainer, Title, Subtitle,
} from './styles';

interface Props {
  navigation: {
    navigate(route: string): void;
  };
}

const Header: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const [isHome, setIsHome] = useState(true);
  const [icon, setIcon] = useState('plus');

  useEffect(() => {
    if (route.name !== 'Calendar') {
      setIsHome(false);
      setIcon('arrow-left');
    } else {
      setIsHome(true);
    }
  }, []);

  return (
    <Container isHome={isHome}>
      <TitleContainer>
        <Title>unforgettable</Title>
        <Subtitle>life made simple</Subtitle>
      </TitleContainer>
      <Icon
        name={icon}
        size={24}
        onPress={() => navigation.navigate(isHome ? 'AddReminder' : 'Calendar')}
      />
    </Container>
  );
};

export default Header;
