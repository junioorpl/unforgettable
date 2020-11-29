import styled, { css } from 'styled-components/native';

interface Props {
  color: string
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  padding: 0 12px;
  margin: 4px 0;
  height: 96px;
  background-color: #eee;
  border-radius: 12px;
`;

export const ReminderData = styled.View`
  flex-direction: column;
  width: 150px;
  min-width: 150px;
`;

export const WeatherData = styled.View`
  flex-direction: column;
  width: 96px;
  min-width: 96px;
`;

export const ReminderDesc = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const ReminderCity = styled.Text`
  font-size: 14px;
  color: #000;
  text-align:center;
`;

export const ReminderColor = styled.View<Props>`
  height: 24px;
  width: 24px;
  border-radius: 12px;

  ${(props) => css`
    background-color: ${props.color};
  `}
`;

export const Temperature = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align:center;
`;

export const Label = styled.Text`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const WeatherDesc = styled.Text`
  font-size: 12px;
  text-align:center;
`;
