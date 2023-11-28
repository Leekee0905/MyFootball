import { useState, useEffect } from 'react';
import apiInstance from '../../api/apiInstance';
import { useQuery } from '@tanstack/react-query';
import { SeasonTable } from '../../types/table';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from '../../hooks/useRouter';
import LoadingCircular from '../LoadingCircular';
import LeagueButton from './LeagueButton';

interface StandingDataType {
  crest: string;
  draw: number;
  form: string;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  id: number;
  lost: number;
  name: string;
  playedGames: number;
  points: number;
  position: number;
  shortName: string;
  tla: string;
  won: number;
}

interface TableProps {
  tableHeader: Array<string>;
  isHome: boolean;
}

const initialStandingTableData: StandingDataType[] = [
  {
    crest: '',
    draw: 0,
    form: '',
    goalDifference: 0,
    goalsAgainst: 0,
    goalsFor: 0,
    id: 0,
    lost: 0,
    name: '',
    playedGames: 0,
    points: 0,
    position: 0,
    shortName: '',
    tla: '',
    won: 0,
  },
];

const league: { [league: string]: string } = {
  프리미어리그: 'PL',
  분데스리가: 'BL1',
  라리가: 'PD',
  세리에: 'SA',
  리그앙: 'FL1',
};

const resultColor: { [result: string]: string } = {
  W: '#00db74',
  L: '#e0005e',
  D: '#c3b3c5',
};

const FootballTable = ({ tableHeader, isHome }: TableProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isXlScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const { routeTo } = useRouter();
  const [standingsData, setStandingsData] = useState<StandingDataType[]>(
    initialStandingTableData,
  );
  const [emblem, setEmblem] = useState<string>('');
  const [season, setSeason] = useState<string>('2023');
  const [currentTableLeagueName, setCurrentTableLeagueName] =
    useState<string>('PL');
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['table', currentTableLeagueName],
    queryFn: () =>
      apiInstance.get(`/football/${currentTableLeagueName}/standings`, {
        params: {
          season: season,
        },
      }),
    staleTime: Infinity,
    enabled: true,
  });

  const preLoadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };

  const winDrawLoseColorConverter = (result: string, key: number) => {
    return (
      <Box
        key={key}
        sx={{
          borderRadius: '100%',
          backgroundColor: resultColor[result],
        }}
      >
        <Typography sx={{ color: theme.palette.secondary.main }}>
          {result}
        </Typography>
      </Box>
    );
  };

  const extractingTeamNames = (data: SeasonTable[]): StandingDataType[] => {
    const teamData = data.map((e: SeasonTable): StandingDataType => {
      const { team, ...other } = e;
      const { crest, id, name, shortName, tla } = team;
      preLoadImage(crest);
      return { ...other, crest, id, name, shortName, tla };
    });
    return teamData;
  };

  const handleTableHeaderLeaugeClick = (leagueName: string) => {
    const currentLeague = league[leagueName];
    setCurrentTableLeagueName(currentLeague);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
      preLoadImage(data.data.emblem);
      setEmblem(data.data.emblem);
      isHome
        ? setStandingsData(
            extractingTeamNames(data.data.standings.slice(0, 10)),
          )
        : setStandingsData(extractingTeamNames(data.data.standings));
    }
  }, [data]);

  const renderLeagueButtons = () => {
    return Object.keys(league).map((leagueName, idx) => {
      const isLeagueActive = league[leagueName] === currentTableLeagueName;

      return (
        <LeagueButton
          key={idx}
          onClick={handleTableHeaderLeaugeClick}
          isActive={isLeagueActive}
          label={leagueName}
          isHome={isHome}
        />
      );
    });
  };

  return (
    <Container
      sx={{
        marginY: '32px',
        maxWidth: '2560px',
        width: isXlScreen && !isHome ? '1440px' : null,
        minWidth: isXlScreen && !isHome ? '1440px' : null,
      }}
    >
      <Paper
        sx={{
          border: isHome ? `1px solid ${theme.palette.primary.main}` : '0',
          boxShadow: 0,
        }}
      >
        <Box
          className="table_header"
          sx={{
            minHeight: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isSmallScreen ? '16px' : '24px',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              paddingLeft: '12px',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            해외축구 순위표
          </Typography>
          {isHome ? (
            <Button onClick={() => routeTo('/table')}>
              <Typography sx={{ fontWeight: 'bold' }}>더보기 {'>'}</Typography>
            </Button>
          ) : null}
        </Box>

        <Divider />
        <Box
          className="table_header_league"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: isHome ? '32px' : '128px',
          }}
        >
          {isSmallScreen
            ? renderLeagueButtons().slice(0, 2)
            : renderLeagueButtons()}
        </Box>
        {isHome ? null : (
          <>
            <Divider />
            <Box sx={{ textAlign: 'center' }}>
              <img src={emblem} />
            </Box>
          </>
        )}
        <Divider />
        <TableContainer className="home_table_container">
          <Table
            aria-label="home-table"
            size={isHome ? 'small' : 'medium'}
            style={{ tableLayout: 'fixed' }}
          >
            <TableHead>
              <TableRow>
                {tableHeader.map((e, idx) => {
                  return (
                    <TableCell sx={{ textAlign: 'center' }} key={idx}>
                      {e}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                standingsData.map((e) => {
                  return (
                    <TableRow
                      key={e.shortName}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {e.position}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ textAlign: 'center' }}>
                          <img
                            src={e.crest}
                            style={{ maxWidth: '64px', maxHeight: '100%' }}
                            width={isHome ? '32px' : '64px'}
                            height={isHome ? '32px' : '64px'}
                            alt={e.shortName}
                            decoding="async"
                            loading="lazy"
                          ></img>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                          }}
                        >
                          {isHome ? e.tla : e.shortName}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.playedGames}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.won}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.draw}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {e.lost}
                      </TableCell>
                      {!isHome ? (
                        <>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {e.goalsFor}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {e.goalsAgainst}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {e.goalDifference}
                          </TableCell>
                        </>
                      ) : null}
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Typography
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                          }}
                        >
                          {e.points}
                        </Typography>
                      </TableCell>
                      {!isHome ? (
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Box sx={{ display: 'flex', textAlign: 'center' }}>
                            {e.form
                              .split(',')
                              .map((e, idx) =>
                                winDrawLoseColorConverter(e, idx),
                              )}
                          </Box>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableHeader.length}
                    sx={{ textAlign: 'center', height: '480px' }}
                  >
                    <LoadingCircular />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default FootballTable;
