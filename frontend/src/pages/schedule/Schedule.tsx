import {
  Box,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
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
  const theme = useTheme();

  const [currentTableLeagueName, setCurrentTableLeagueName] =
    useState<string>('PL');
  const [season, setSeason] = useState<string>(year.toString());
  const [matchesData, setMatchesData] = useState<Record<string, MatchData[]>>(
    {},
  );
  const [teamData, setTeamData] = useState<TeamListData[]>([]);
  const [competitonId, setCompetitionId] = useState<number>(2021);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentDate.getMonth() + 1,
  );
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0);
  const currentYear =
    selectedMonth >= 8 && selectedMonth <= 12
      ? Number(season)
      : Number(season) + 1;
  const monthLengthConverter = (month: number) => {
    return month.toString().length === 1 ? '0' + month.toString() : month;
  };
  const lastDateOfMonth = new Date(currentYear, selectedMonth, 0)
    .toLocaleString()
    .split('.')[2]
    .trim();

  const preLoadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };

  const scheduleData = useQuery({
    queryKey: ['schedule', currentTableLeagueName, season, selectedMonth],
    queryFn: () =>
      apiInstance.get(`/schedule/${currentTableLeagueName}/matches`, {
        params: {
          season: season,
          dateFrom: `${currentYear}-${monthLengthConverter(selectedMonth)}-01`,
          dateTo: `${currentYear}-${monthLengthConverter(
            selectedMonth,
          )}-${lastDateOfMonth}`,
        },
      }),
    staleTime: Infinity,
    enabled: selectedTeamId === 0,
  });

  const teamScheduleData = useQuery({
    queryKey: [
      'schedule',
      currentTableLeagueName,
      season,
      selectedTeamId,
      selectedMonth,
      competitonId,
    ],
    queryFn: () =>
      apiInstance.get(`/schedule/${selectedTeamId}/teams/matches`, {
        params: {
          season: season,
          dateFrom: `${currentYear}-${monthLengthConverter(selectedMonth)}-01`,
          dateTo: `${currentYear}-${monthLengthConverter(
            selectedMonth,
          )}-${lastDateOfMonth}`,
          competitions: competitonId,
        },
      }),
    staleTime: Infinity,
    enabled: selectedTeamId !== 0,
    retryDelay: 1000,
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
      Object.values(scheduleData.data.data as MatchData[][]).map(
        (e: MatchData[]) =>
          e.map((ele: MatchData) => {
            preLoadImage(ele.homeTeam.crest);
            preLoadImage(ele.awayTeam.crest);
          }),
      ),
        setMatchesData(scheduleData.data.data);
    }
    if (teamListData.isSuccess) {
      teamListData.data.data.map((e: TeamListData) => preLoadImage(e.crest));
      setCompetitionId(teamListData.data.data[0].competitionId);
      setTeamData(teamListData.data.data);
    }
    if (teamScheduleData.isSuccess) {
      Object.values(teamScheduleData.data.data as MatchData[][]).map(
        (e: MatchData[]) =>
          e.map((ele: MatchData) => {
            preLoadImage(ele.homeTeam.crest);
            preLoadImage(ele.awayTeam.crest);
          }),
      ),
        setMatchesData(teamScheduleData.data.data);
    }
  }, [
    selectedMonth,
    scheduleData,
    teamListData,
    teamScheduleData,
    selectedTeamId,
    matchesData,
  ]);

  const handleTableHeaderLeaugeClick = useCallback(
    (leagueName: string) => {
      const currentLeague = league[leagueName];
      setCurrentTableLeagueName(currentLeague);
    },
    [setCurrentTableLeagueName],
  );

  const statusConverter = (status: string) => {
    switch (status) {
      case 'FINISHED':
        return '종료';
      case 'TIMED' || 'SCHEDULED':
        return '예정';
      case 'LIVE':
        return '진행중';
      case 'PAUSED':
        return '일시 중지';
      case 'POSTPONED':
        return '연기';
      case 'SUSPENDED':
        return '중단';
      case 'CANCELLED':
        return '취소됨';
      default:
        break;
    }
  };

  const dateConverter = (date: string) => {
    const [month, day] = date.split('.');
    return [month, day];
  };

  return (
    <Container sx={{ marginTop: '32px' }}>
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
        <ScheduleTabs
          elements={month}
          today={currentDate.getMonth() + 1}
          setSelectedId={setSelectedMonth}
        />
      </Box>
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <ScheduleTabs elements={teamData} setSelectedId={setSelectedTeamId} />
      </Box>
      <CustomScheduleTabPanel value={currentDate.getMonth()}>
        <>
          {Object.keys(matchesData).map((date: string, idx: number) => {
            const teamArray: MatchData[] = matchesData[date] as MatchData[];
            const today: number = new Date(date).getDay();
            const weekend: { [key: string]: string } = {
              0: '일',
              1: '월',
              2: '화',
              3: '수',
              4: '목',
              5: '금',
              6: '토',
            };

            return (
              <Box key={idx} sx={{ marginY: '30px' }}>
                <Paper elevation={3}>
                  <Box
                    sx={{
                      backgroundColor: '#f7f9fa',
                      height: '54px',
                      alignItems: 'center',
                      display: 'flex',
                      padding: '0 20px',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{`${
                      dateConverter(date)[0]
                    }월 ${dateConverter(date)[1]}일 (${
                      weekend[today]
                    })`}</Typography>
                  </Box>

                  {teamScheduleData.isLoading || scheduleData.isLoading ? (
                    <Skeleton animation="wave" sx={{ minHeight: '62px' }} />
                  ) : (
                    teamArray.map((e: MatchData, idx: number) => {
                      return (
                        <Grid
                          container
                          spacing={2}
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '62px',
                            padding: '0 20px',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Grid item>
                            <Typography
                              sx={{ fontWeight: 'bold', minWidth: '110px' }}
                            >
                              {new Date(e.utcDate).toLocaleString().slice(13)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  backgroundColor: '#ACACAF',
                                  color: theme.palette.secondary.main,
                                  display: 'inline-block',
                                  alignItems: 'center',
                                  margin: 'auto',
                                  borderRadius: '10%',
                                  marginRight: '12px',
                                }}
                              >
                                홈
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 'bold',
                                    marginX: '24px',
                                    minWidth: '150px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {e.homeTeam.shortName}{' '}
                                </Typography>
                                {
                                  <img
                                    loading="lazy"
                                    src={e.homeTeam.crest}
                                    width={30}
                                    height={30}
                                  />
                                }{' '}
                                <Typography
                                  sx={{ fontWeight: 'bold', marginX: '24px' }}
                                >
                                  {e.score.fullTime.home}
                                </Typography>
                                <Typography
                                  sx={{ fontWeight: 'bold', marginX: '24px' }}
                                >
                                  {statusConverter(e.status)}{' '}
                                </Typography>
                                <Typography
                                  sx={{ fontWeight: 'bold', marginX: '24px' }}
                                >
                                  {e.score.fullTime.away}{' '}
                                </Typography>
                                {
                                  <img
                                    loading="lazy"
                                    src={e.awayTeam.crest}
                                    width={30}
                                    height={30}
                                  />
                                }{' '}
                                <Typography
                                  sx={{
                                    fontWeight: 'bold',
                                    marginX: '24px',
                                    minWidth: '150px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {e.awayTeam.shortName}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item>
                            <Typography>{`${e.matchday}R`}</Typography>
                          </Grid>
                        </Grid>
                      );
                    })
                  )}
                </Paper>
              </Box>
            );
          })}
        </>
      </CustomScheduleTabPanel>
    </Container>
  );
};

export default Schedule;
