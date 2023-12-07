import { Box, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  league,
  renderLeagueButtons,
} from '../../components/RenderLeagueButton';
import ScheduleTabs from '../../components/ScheduleTabs';
import SeasonButton from '../../components/LeagueTable/SeasonButton';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '../../api/apiInstance';
import { MatchData, TeamListData } from '../../types/schedule';
import CustomScheduleTabPanel from '../../components/CustomScheduleTabPanel';

const month: Array<string> = [
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
];
const currentDate = new Date();
const year =
  currentDate.getMonth() < 7
    ? currentDate.getFullYear() - 1
    : currentDate.getFullYear();

const Schedule = () => {
  const [currentTableLeagueName, setCurrentTableLeagueName] =
    useState<string>('PL');
  const [season, setSeason] = useState<string>(year.toString());
  const [matchesData, setMatchesData] = useState<any>([]);
  const [teamData, setTeamData] = useState<any>([]);
  const [competitonId, setCompetitionId] = useState<number>(2021);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0);
  const preLoadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };
  const scheduleData = useQuery({
    queryKey: ['schedule', currentTableLeagueName, season],
    queryFn: () =>
      apiInstance.get(`/schedule/${currentTableLeagueName}/matches`, {
        params: {
          season: season,
          dateFrom: '2023-12-01',
          dateTo: '2023-12-31',
        },
      }),
    staleTime: Infinity,
    enabled: true,
  });

  const teamListData = useQuery({
    queryKey: ['teams', currentTableLeagueName, season],
    queryFn: () =>
      apiInstance.get(`/schedule/${currentTableLeagueName}/teams`, {
        params: {
          season: season,
        },
      }),
    staleTime: Infinity,
    enabled: true,
  });

  useEffect(() => {
    if (scheduleData.isSuccess) {
      setMatchesData(scheduleData.data.data);
    }
    if (teamListData.isSuccess) {
      teamListData.data.data.map((e: TeamListData) => preLoadImage(e.crest));
      setCompetitionId(teamListData.data.data[0].competitonId);
      setTeamData(teamListData.data.data);
    }
  }, [scheduleData, teamListData]);
  console.log(teamData);
  const handleTableHeaderLeaugeClick = (leagueName: string) => {
    const currentLeague = league[leagueName];
    setCurrentTableLeagueName(currentLeague);
  };

  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        {renderLeagueButtons({
          isHome: false,
          currentTableLeagueName,
          onClick: handleTableHeaderLeaugeClick,
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SeasonButton year={year} setSeason={setSeason} />
      </Box>

      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <ScheduleTabs elements={month} today={currentDate.getMonth() + 1} />
      </Box>
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <ScheduleTabs
          elements={teamData}
          setSelectedTeamId={setSelectedTeamId}
        />
      </Box>
      <CustomScheduleTabPanel value={currentDate.getMonth()}>
        hisdsd
      </CustomScheduleTabPanel>
      {/*Object.entries(matchesData).map(([date, teamArray], idx) => {
        return (
          <Box key={idx}>
            <Typography>{date}</Typography>
            {teamArray.map((e) => e.homeTeam.shortName)}
          </Box>
        );
      })*/}
    </Container>
  );
};

export default Schedule;
