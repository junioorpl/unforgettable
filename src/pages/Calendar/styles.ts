import styled, { css } from 'styled-components/native';

interface Props {
  weekDay: number;
  // isSelected?: boolean;
}

export const Container = styled.View`
  flex-direction: column;
  padding: 8px 12px;
  background: #fff;
  height: 100%;
`;

export const CalendarContainer = styled.View`
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const CalendarHeader = styled.View`
  width: 100%;
  margin: 8px auto;
  padding: 8px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Month = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Year = styled.Text`
  margin-left: 8px;
  font-size: 20px;
`;

export const DaysContainer = styled.View`
  border: 1px solid #ddd;
`;

export const DaysRow = styled.View`
  flex-direction: row;
  margin-top: 12px;
  height: 32px;
`;

export const DayButton = styled.TouchableOpacity`
  margin: 0 auto;
  width: 42px;
  height: 42px;
  justify-content: center;
`;

export const Day = styled.Text<Props>`
  flex: 1;
  font-size: 18px;
  text-align: center;

  ${(props) => props.weekDay === 0 && css`
    font-weight: bold;
  `}
  /* ${(props) => props.isSelected && css`
    background-color: #ddd;
  `} */
`;

export const RemindersContainer = styled.View`
  margin-top: 8px;
  width: 100%;
  max-height: 365px;
  border-radius: 4px;
`;

export const NoRemindersText = styled.Text`
  margin: 64px auto;
  font-weight: bold;
  color: #bbb;
  width: 250px;
  line-height: 24px;
  text-align:center;
  font-size: 20px;
`;
