import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  league,
  renderLeagueButtons,
} from '../../components/RenderLeagueButton';
const Schedule = () => {
  const [currentTableLeagueName, setCurrentTableLeagueName] =
    useState<string>('PL');

  const handleTableHeaderLeaugeClick = (leagueName: string) => {
    const currentLeague = league[leagueName];
    setCurrentTableLeagueName(currentLeague);
  };
  useEffect(() => {
    console.log(currentTableLeagueName);
  });
  const utcDateStr = '2023-12-02T15:00:00Z';
  const utcDate = new Date(utcDateStr);

  // 로컬 시간으로 변환
  const localDateStr = utcDate.toLocaleString();

  console.log(localDateStr);

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        {renderLeagueButtons({
          isHome: false,
          currentTableLeagueName,
          onClick: handleTableHeaderLeaugeClick,
        })}
      </Box>
    </Container>
  );
};

export default Schedule;
