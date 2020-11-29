import React from 'react';

import {
  Container, TitleContainer, Title, Subtitle,
} from './styles';

const Header: React.FC = ({ children }) => (
  <Container>
    <TitleContainer>
      <Title>unforgettable</Title>
      <Subtitle>life made simple</Subtitle>
    </TitleContainer>
    {children}
  </Container>
);

export default Header;
