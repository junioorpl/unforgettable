import styled, { css } from 'styled-components/native';

interface ButtonProps {
  selected: boolean;
}

interface DotProps {
  color: string;
}

export const Container = styled.View`
  flex-direction: column;
  padding: 8px 12px;
  background: #fff;
  height: 100%;
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items:center;
`;

export const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: auto;
`;

export const Weather = styled.View`
  width: 50%;
`;

export const WeatherText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 4px auto;
`;

export const WeatherSmallText = styled.Text`
  font-size: 16px;
  margin: 4px auto;
`;

export const Label = styled.Text`
  font-size: 20px;
  margin-bottom: 4px;
  margin-top: 16px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  border: 1px solid #ddd;
  font-size: 20px;
  border-radius: 4px;
`;

export const Colors = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 12px;
`;

export const ColorButton = styled.TouchableOpacity<ButtonProps>`
  width: 58px;
  padding: 2px;
  border-radius: 4px;


  ${(props) => props.selected && css`
    background-color: #ddd;
  `}
`;

export const ColorDot = styled.View<DotProps>`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  margin: 4px auto;
  background-color: ${(props) => props.color};
`;

export const ColorName = styled.Text`
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
`;

export const DoneButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #ddd;
  padding: 8px;
  margin-top: 32px;
`;

export const DoneText = styled.Text`
  margin: 0 auto;
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #f66;
  padding: 8px;
  margin-top: 32px;
`;

export const DeleteButtonText = styled.Text`
  margin: 0 auto;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
