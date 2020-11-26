import styled from 'styled-components/native';

interface IProps {
  isHome: boolean;
}

export const Container = styled.SafeAreaView<IProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
`;

export const TitleContainer = styled.View`
  flex-direction: column;
  align-items: baseline;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  margin-top: 4px;
  font-size: 14px;
`;
