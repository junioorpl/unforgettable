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
  height: 64px;
  background-color: #eee;
  border-radius: 12px;
`;

export const ReminderData = styled.View`

`;

export const ReminderDesc = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const ReminderCity = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const ReminderColor = styled.View<Props>`
  height: 24px;
  width: 24px;
  border-radius: 12px;

  ${(props) => css`
    background-color: ${props.color};
  `}
`;
